import React from "react";

type PropTypes = {
  Component: () => React.JSX.Element;
  number?: number;
};

export default function Iterate({ Component, number = 6 }: PropTypes) {
  const array = Array(number).fill(0).map((_, i) => i);

  return array.map((i) => <Component key={i} />);
}
