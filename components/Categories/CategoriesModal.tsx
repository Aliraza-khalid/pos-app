"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import Modal from "../base/Modal";

type PropTypes = {
  children: React.ReactNode;
};

export default function CategoriesModal({ children }: PropTypes) {
  const [modalOpen, setModalOpen] = useState(false);
  const { styles } = useStyles();

  return (
    <>
      <Button
        icon={<MenuOutlined />}
        className={styles.button}
        onClick={() => setModalOpen(true)}
      />
      <Modal
        title="Categories"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        {children}
      </Modal>
    </>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  button: css`
    @media screen and (min-width: ${token.screenSM}px) {
      display: none;
    }
  `,
}));
