import { Button, Flex } from "antd";
import React from "react";
import Text from "@/components/base/Text";

interface PropTypes {
  show?: boolean;
  onClickIncrease: () => void;
  onClickDecrease: () => void;
  quantity: number;
  buttonClass?: string;
}

export default function QuantityControls({
  quantity = 0,
  onClickDecrease,
  onClickIncrease,
  buttonClass,
  show = true
}: PropTypes) {
  if(show === false) return undefined;
  return (
    <Flex justify="center" align="center" gap={10}>
      <Button
        shape="circle"
        onClick={onClickDecrease}
        size="small"
        className={buttonClass}
      >
        -
      </Button>
      <Text title={quantity.toString()} />
      <Button
        shape="circle"
        onClick={onClickIncrease}
        size="small"
        className={buttonClass}
      >
        +
      </Button>
    </Flex>
  );
}
