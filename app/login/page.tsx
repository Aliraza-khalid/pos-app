import React from 'react'
import LoginForm from '../components/LoginForm'
import styles from './page.module.css'

export default function login() {
  return (
    <div className={styles.container}>
      <LoginForm/>
    </div>
  )
}
