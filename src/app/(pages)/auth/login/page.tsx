"use client"
import Login from '@/components/auth/Login'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function page() {

  const [loginResult, setLoginResult] = useState<{status: string, message: string}>();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const signInResult = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    console.log("signInResult", signInResult)

    if(signInResult?.ok){
      setLoginResult({status: "success", message: "Login succeeded" });
      router.push("/main/home")
    }
    else{
      setLoginResult({status: "fail", message: "Login failed" });
    }
  } 

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/main/home' });
  }

  return (
    <div>
        <Login 
          onLogin={handleLogin}
          onGoogleLogin={handleGoogleLogin}
          loginResult={loginResult}
        />
    </div>
  )
}

export default page