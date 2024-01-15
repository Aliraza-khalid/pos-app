'use client';

import { Content, Header } from "antd/es/layout/layout";
import styles from './page.module.css';
import '../globals.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={'main'}>
      <Header className={styles.header}>
      </Header>
      <Content className={'container'}>
        {children}
      </Content>
    </main>
  );
}
