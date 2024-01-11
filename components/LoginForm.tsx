import { Button, Card } from 'antd'
import React from 'react'

export default function LoginForm() {
  return (
    <Card title="Login" style={{ width: 300, margin: 12 }}>
        <Button value="large" block type='primary'>Log in using Square</Button>
    </Card>
  )
}
