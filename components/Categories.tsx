'use client';

import { Card } from 'antd';
import React from 'react'

const data = [
  'item 1',
  'item 2',
  'item 3',
  'item 4',
  'item 5',
  'item 6',
  'item 7',
  'item 8',
  'item 9',
]

export default function Categories() {
  return (
    <Card title='Categories' size="small" style={{width: 230 }}>
      {data.map((v, i) => <p key={i}>{v}</p>)}
    </Card>
  )
}
