'use client';

import React, { FormEvent, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { useRouter } from 'next/navigation';

interface SignUpPageProps {
  searchParams: {
    error?: string;
    message?: string;
  };
}

const SignUpPage: React.FC<SignUpPageProps> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { name, value } = target;

    if (name === 'firstName') setFirstName(value);
    if (name === 'lastName') setLastName(value);
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    if (error) setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Password verification
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log('SignUp response:', data);

      if (data.error) {
        setError(data.error);
      } else {
        // Redirect to the dashboard or another page after successful signup
        router.push('/login');
      }
    } catch (e) {
      if (e instanceof Error && e.message) {
        setError(e.message);
      } else {
        console.error('Unexpected error:', e);
      }
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-800 p-8 rounded-md shadow-md text-white w-96">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <Input
              type="text"
              id="firstName"
              name="firstName"
              label="First Name"
              value={firstName}
              onChange={handleChange}
              
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              id="lastName"
              name="lastName"
              label="Last Name"
              value={lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              id="username"
              name="username"
              label="Username"
              value={username}
              onChange={handleChange}
            />
          </div> */}
          <div className="mb-4">
            <Input
              type="email"
              id="email"
              name="email"
              label="Email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              id="password"
              name="password"
              label="Password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            color="primary"
            variant="shadow"
            radius="sm"
            size="lg"
            isLoading={loading}
            fullWidth
          >
            Sign Up
          </Button>
        </form>
        {/* Login notice and link */}
        <p className="mt-4">
          Already have an account?
          <Link className="ml-1 text-blue-500" href="/login">
            Login
          </Link>
        </p>
        {/* Error notice */}
        {error && (
          <p className="text-red-500 mt-4">Error: {error}</p>
        )}
      </div>
      {/* Link to return to home page */}
      <Link className="fixed bottom-0 left-0 mb-4 ml-4" color="foreground" href="/">
        Home
      </Link>
    </div>
  );
};

export default SignUpPage;
