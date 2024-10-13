"use client"
import Signup from '@/components/auth/Signup'
import React from 'react'

function page() {
  return (
    <div>
        <Signup onSignupSuccess={function (): void {
              throw new Error('Function not implemented.')
          } } onSignupFailure={function (error: string): void {
              throw new Error('Function not implemented.')
          } } onGoogleSignup={function (): void {
              throw new Error('Function not implemented.')
          } }/>
    </div>
  )
}

export default page