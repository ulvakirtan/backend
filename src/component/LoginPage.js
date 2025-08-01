import React, { useState } from 'react';
import { Shield } from 'lucide-react';

const LoginPage = ({ onLoginSuccess, role, onGoToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({ name: username || `${role.charAt(0).toUpperCase() + role.slice(1)} User` });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2 capitalize">
            {role} Login
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 block">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg"
              placeholder={`Enter ${role} username`}
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold"
          >
            Login
          </button>
        </form>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Don’t have an account?{' '}
            <button
              onClick={onGoToRegister}
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;