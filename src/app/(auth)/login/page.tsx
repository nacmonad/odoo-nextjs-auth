'use client';
// pages/login.js
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface LoginPageProps {
  searchParams: {
    error?: string;
    message?: string;
  };
}


const LoginPage : React.FC<LoginPageProps> = ( props ) => { 
  const { searchParams } = props;
  const { error } = searchParams;

  const [hideError, setHideError] = useState(false);
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``)

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    
      const { target } = e;
      const { name, value } = target;

      if(name==="username") setUsername(value);
      if(name==="password") setPassword(value);
      if(error) setHideError(true);
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-gray-800 p-8 rounded-md shadow-md text-white min-w-96">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <form action={`/api/auth/login`} method="POST">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md text-black"
                value={username}
                onChange={handleChange}

              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md text-black"
                value={password}
                onChange={handleChange}

             
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Login
            </button>
          </form>
          {/* Error notice */}
          {!hideError && error && (
              <p className="text-red-500 mt-4">
                  Error: {error}
              </p>
                )}
        </div>
        {/* Link to return to home page */}
        <div className="fixed bottom-0 left-0 mb-4 ml-4">
          <Link className="text-white underline" href="/">Home </Link>
        </div>
      </div>
  );
};

export default LoginPage;
