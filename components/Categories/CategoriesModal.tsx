import { MenuOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";

type PropTypes = {
  children: React.ReactNode;
}

export default function CategoriesModal({children}: PropTypes) {
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
        className={styles.modal}
        // style={{textAlign: "center"}}
        // centered
        width={300}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[]}
      >
        {children}
      </Modal>
    </>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  modal: css`
    // margin: auto ${token.margin}px;
  `,
  button: css`
    @media screen and (min-width: 600px) {
      display: none;
    }
  `,
}));
