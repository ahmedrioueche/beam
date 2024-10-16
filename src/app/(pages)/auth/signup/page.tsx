"use client"
import Signup from '@/components/auth/Signup'
import { apiInsertUser } from '@/lib/apiHelper';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function page() {
  const [signupResult, setSignupResult] = useState<{status: string, message: string}>();
  const router = useRouter();
  const handleSignup = async (email: string, password: string) => {
    const response = await apiInsertUser(email, password);
    console.log("response", response)
    if(response && response.id){
      setSignupResult({status: "success", message: "Signup succeeded" });
      router.push("/auth/login");
    }
    else{
      setSignupResult({status: "fail", message: "Signup failed" });
    }
  } 

  const handleGoogleSignup = async () => {
    await signIn('google', { callbackUrl: '/main/home' });
  }

  return (
    <div>
        <Signup 
          onSignup={handleSignup}
          onGoogleSignup={handleGoogleSignup}
          signupResult={signupResult}
        />
    </div>
  )
}

export default page