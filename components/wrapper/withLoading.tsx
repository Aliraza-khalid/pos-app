import React from 'react'

type PropTypes = {
  loading: boolean;
  children: React.ReactNode;
}

export default function withLoading({loading, children}: PropTypes) {
  return (
    <div>withLoading</div>
  )
}
