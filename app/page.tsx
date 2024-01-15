'use client';

import { isAuthenticated } from '@/utils/isAuthenticated';
import { Flex, Spin } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace(isAuthenticated() ? '/dashboard' : 'login');
  }, []);

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Spin size="large" />
    </Flex>
  )
}
