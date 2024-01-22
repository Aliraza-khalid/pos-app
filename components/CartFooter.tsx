import { Button, Flex } from "antd";
import React from "react";

export default function CartFooter() {
  return (
    <>
      <Flex>Grand Total $ 100</Flex>

      <Flex justify="center">
        <Button type="primary">
          Checkout
        </Button>
      </Flex>
    </>
  );
}
