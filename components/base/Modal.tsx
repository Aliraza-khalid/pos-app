import React from "react";
import { Modal as ModalAntd, Space } from "antd";
import { createStyles } from "antd-style";

type PropTypes = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ title, open, onClose, children }: PropTypes) {
  const { styles } = useStyles();

  return (
    <ModalAntd
      title={title}
      classNames={{content: styles.content, body: styles.body}}
      width={'80%'}
      centered
      open={open}
      onCancel={onClose}
      footer={[]}
    >
      {children}
    </ModalAntd>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  content: css`
    max-width: min(100%, ${token.screenSM}px);
    margin: auto;
  `,
  body: css`
    display: flex;
    flex-direction: column;
    gap: ${token.padding}px;
    margin-top: ${token.marginMD}px;
    margin-bottom: 0px;
    text-align: center;
  `,
}));
