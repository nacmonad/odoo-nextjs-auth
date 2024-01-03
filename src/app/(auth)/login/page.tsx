'use client';
// pages/login.js
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import {Button} from '@nextui-org/button';
import {Input} from '@nextui-org/input';
import {Link} from '@nextui-org/link';
import { useRouter } from 'next/navigation';

interface LoginPageProps {
  searchParams: {
    error?: string;
    message?: string;
  };
}


const LoginPage : React.FC<LoginPageProps> = ( props ) => { 
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null|string>(null);
  const [username, setUsername] = useState<string>(``);
  const [password, setPassword] = useState<string>(``)

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    
      const { target } = e;
      const { name, value } = target;

      if(name==="username") setUsername(value);
      if(name==="password") setPassword(value);
      if(error) setError(null);
  }

  async function handleSubmit(e:FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })
      const u = await r.json();
      console.log("LoggedIn", u);

      if(u.error) setError(u.error);
      if(u.odoo) router.push('/dashboard')
    } catch(e)  {
      if(e instanceof Error && e.message) setError(e.message);
    }

    setLoading(false);
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-gray-800 p-8 rounded-md shadow-md text-white w-96">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">

              <Input
                type="text"
                id="username"
                name="username"
                label="Username"
                value={username}
                onChange={handleChange}

              />
            </div>
            <div className="mb-6">

              <Input
                type="password"
                id="password"
                name="password"
                label="Password"
                value={password}
                onChange={handleChange}

             
              />
            </div>
            <Button type="submit" color="primary" variant="shadow" radius="sm" size="lg" isLoading={loading} fullWidth>
              Login
            </Button>
          </form>
          {/* Sign-up notice and link */}
          <p className="mt-4">
            Don't have an account? 
            <Link className="ml-1 text-blue-500" href="/signup">
              Sign Up
            </Link>
          </p>
          {/* Error notice */}
          {error && (
              <p className="text-red-500 mt-4">
                  Error: {error}
              </p>
                )}
        </div>
        {/* Link to return to home page */}  
        <Link className="fixed bottom-0 left-0 mb-4 ml-4" color="foreground" href="/">Home</Link>
        
      </div>
  );
};

export default LoginPage;
