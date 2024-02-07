import "../matchMedia.mock";
import "@testing-library/jest-dom";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { mockProduct, mockLineItem } from "@/constants/mockData";
import formatPrice from "@/utils/formatPrice";
import CartCard from "@/components/cart/CartCard";
import useStore from "@/stores";
import { CartModalTypes } from "@/types/Cart";

const componentsProps = {
  item: mockLineItem,
  loading: false,
};

// quantity 3 in the cart to match with lineItem
const { result: store } = renderHook(() => useStore());
store.current.addItemToCart(mockProduct, mockProduct.variations[0]);
store.current.increaseItemInCart(mockProduct.variations[0].variationId);
store.current.increaseItemInCart(mockProduct.variations[0].variationId);

describe("Cart Card", () => {
  describe("with loading false", () => {
    beforeEach(() => render(<CartCard {...componentsProps} />));

    test("renders product name", () => {
      const title = screen.getByText(mockLineItem.name, { exact: false });
      expect(title).toBeInTheDocument();
    });

    test("renders variation name", () => {
      const title = screen.getByText(mockLineItem.variationName, {
        exact: false,
      });
      expect(title).toBeInTheDocument();
    });

    test("renders price", () => {
      const price = screen.getByText(
        ` ${formatPrice(mockLineItem.basePriceMoney.amount)}`,
        { exact: false }
      );
      expect(price).toBeInTheDocument();
    });

    test("render quantity", () => {
      const quantity = screen.getByText(mockLineItem.quantity);
      expect(quantity).toBeInTheDocument();
    });

    test("render quantity buttons", () => {
      expect(screen.getByText("-")).toBeInTheDocument();
      expect(screen.getByText("+")).toBeInTheDocument();
    });

    test("gross amount is shown", () => {
      expect(
        screen.getByText(
          ` ${formatPrice(mockLineItem.grossSalesMoney.amount)}`,
          {
            exact: false,
          }
        )
      ).toBeInTheDocument();
    });

    test("discount amount is shown", () => {
      expect(
        screen.getByText(
          ` ${formatPrice(mockLineItem.totalDiscountMoney.amount)}`,
          {
            exact: false,
          }
        )
      ).toBeInTheDocument();
    });

    test("tax amount is shown", () => {
      expect(
        screen.getByText(` ${formatPrice(mockLineItem.totalTaxMoney.amount)}`, {
          exact: false,
        })
      ).toBeInTheDocument();
    });

    test("total amount is shown", () => {
      expect(
        screen.getByText(` ${formatPrice(mockLineItem.totalMoney.amount)}`, {
          exact: false,
        })
      ).toBeInTheDocument();
    });
  });

  describe("onClick buttons", () => {
    beforeEach(() => {
      render(<CartCard {...componentsProps} />);
    });

    test("onClick Tax", () => {
      const elm = screen.getByText("Tax");
      fireEvent.click(elm);

      const { result } = renderHook(() => useStore());
      expect(result.current._activeVartiationId).toBe(mockLineItem.catalogObjectId);
      expect(result.current.cartModal).toBe(CartModalTypes.productTax);
    });
    
    test("onClick Discount", () => {
      const elm = screen.getByText("Discount");
      fireEvent.click(elm);

      const { result } = renderHook(() => useStore());
      expect(result.current._activeVartiationId).toBe(mockLineItem.catalogObjectId);
      expect(result.current.cartModal).toBe(CartModalTypes.productDiscount);
    });
  });

  describe("loading states", () => {
    beforeEach(() => {
      componentsProps.loading = true;
      render(<CartCard {...componentsProps} />);
    });
    afterAll(() => {
      componentsProps.loading = false;
    });

    test("gross amount not shown", async () => {
      expect(
        screen.queryByText(
          ` ${formatPrice(mockLineItem.grossSalesMoney.amount)}`,
          {
            exact: false,
          }
        )
      ).not.toBeInTheDocument();
    });

    test("discount amount not shown", async () => {
      expect(
        screen.queryByText(
          ` ${formatPrice(mockLineItem.totalDiscountMoney.amount)}`,
          {
            exact: false,
          }
        )
      ).not.toBeInTheDocument();
    });

    test("tax amount not shown", () => {
      expect(
        screen.queryByText(
          ` ${formatPrice(mockLineItem.totalTaxMoney.amount)}`,
          {
            exact: false,
          }
        )
      ).not.toBeInTheDocument();
    });

    test("total amount not shown", () => {
      expect(
        screen.queryByText(` ${formatPrice(mockLineItem.totalMoney.amount)}`, {
          exact: false,
        })
      ).not.toBeInTheDocument();
    });
  });
});
