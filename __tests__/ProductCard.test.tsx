import "../matchMedia.mock";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductCard from "@/components/products/ProductCard";
import { mockProduct } from "@/constants/mockData";
import formatPrice from "@/utils/formatPrice";

const componentsProps = {
  item: mockProduct,
};

const variant1 = mockProduct.variations[0];
const variant2 = mockProduct.variations[1];

beforeEach(() => {
  render(<ProductCard {...componentsProps} />);
});

describe("Product Card", () => {
  test("renders title", () => {
    const title = screen.getByText(mockProduct.name);
    expect(title).toBeInTheDocument();
  });

  test("renders price", () => {
    const price = screen.getByText(formatPrice(variant1.price.amount), {
      exact: false,
    });
    expect(price).toBeInTheDocument();
  });

  test("renders variant", () => {
    const variant = screen.getByText(variant1.variant);
    expect(variant).toBeInTheDocument();
  });

  test("renders add to cart", () => {
    const button = screen.getByText("Add to cart");
    expect(button).toBeInTheDocument();
    expect(screen.queryByText("+")).not.toBeInTheDocument();
    expect(screen.queryByText("-")).not.toBeInTheDocument();
  });

  test("onClick add to cart", () => {
    const button = screen.getByText("Add to cart");
    fireEvent.click(button);

    expect(screen.getByText("+")).toBeVisible();
    expect(screen.getByText("-")).toBeVisible();
    expect(screen.getByText("1")).toBeVisible();
  });

  describe("Change quantity", () => {
    test("onClick +", () => {
      const button = screen.getByText("+");
      fireEvent.click(button);
      expect(screen.getByText("2")).toBeVisible();

      fireEvent.click(button);
      expect(screen.getByText("3")).toBeVisible();
    });

    test("onClick -", () => {
      const button = screen.getByText("-");
      fireEvent.click(button);
      expect(screen.getByText("2")).toBeVisible();

      fireEvent.click(button);
      expect(screen.getByText("1")).toBeVisible();

      fireEvent.click(button);
      expect(screen.queryByText("-")).not.toBeInTheDocument();
    });
  });

  describe("Switch variant", () => {
    test('variation 1', () => {
      const price = screen.getByText(formatPrice(variant1.price.amount), {
        exact: false,
      });
      expect(price).toBeInTheDocument();
      expect(screen.queryByText("+")).not.toBeInTheDocument();
      expect(screen.queryByText("-")).not.toBeInTheDocument();

      const button = screen.getByText("Add to cart");
      fireEvent.click(button);

      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("+")).toBeInTheDocument();
    });

    test("change to variant 2", async () => {
      const variant1Elm = screen.getByText(variant1.variant);
      fireEvent.mouseDown(variant1Elm);

      const variant2Elm = await screen.findByText(variant2.variant);
      expect(variant2Elm).toBeInTheDocument();
      fireEvent.click(variant2Elm);

      const price = screen.getByText(formatPrice(variant2.price.amount), {
        exact: false,
      });
      expect(price).toBeInTheDocument();

      expect(screen.queryByText("+")).not.toBeInTheDocument();
      expect(screen.queryByText("-")).not.toBeInTheDocument();
      expect(screen.getByText("Add to cart")).toBeInTheDocument();

      await waitFor(() =>
        expect(screen.queryByText(variant1.variant)).not.toBeVisible()
      );
    });
  });
});
