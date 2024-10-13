"use client"
import Login from '@/components/auth/Login'
import React from 'react'

function page() {
  return (
    <div>
        <Login onLoginSuccess={function (): void {
              throw new Error('Function not implemented.')
          } } onLoginFailure={function (error: string): void {
              throw new Error('Function not implemented.')
          } } onGoogleLogin={function (): void {
              throw new Error('Function not implemented.')
          } }/>
    </div>
  )
}

export default page