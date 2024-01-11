import React from 'react'
import LoginForm from '../../components/LoginForm'

export default function login() {
  return (
    <div style={styles.container}>
      <LoginForm/>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}
