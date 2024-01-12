'use client';

import { Header } from "antd/es/layout/layout";
import styles from './page.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header className={styles.header}>
      </Header>
      {children}
    </div>
  );
}
