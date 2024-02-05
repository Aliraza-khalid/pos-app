import generateOrder from "@/services/generateOrder";
import useStore from "@/stores";
import { GenerateOrderDTO } from "@/types/Order";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import useNotificationContext from "./useNotificationContext";

export default function useOrderMutation() {
  const getOrderDTO = useStore((state) => state.getOrderDTO);
  const setCart = useStore((state) => state.setCart);
  const toggleCart = useStore((state) => state.toggleCart);

  const { showSuccessNotification, showErrorNotification } =
    useNotificationContext();

  const mutation = useMutation({
    mutationFn: (dto: GenerateOrderDTO) => generateOrder(dto),
  });

  const onClickCheckout = () => {
    mutation.mutate(getOrderDTO(), { onSuccess, onError });
  };

  const onSuccess = () => {
    setCart({});
    toggleCart();
    showSuccessNotification({
      description: "Order Generated",
    });
  };

  const onError = (error: Error) => {
    showErrorNotification({
      description: error.message,
    });
  };

  return { ...mutation, onClick: onClickCheckout };
}
