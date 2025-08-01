import React from 'react';
import { LogOut, User } from 'lucide-react';

const SecurityDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, Security Officer</h1>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-lg">Monitor QR verifications, entries, and alert activities here.</p>
        <div className="mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded">
          <User className="inline-block mr-2" /> Logged in as: <strong>{user?.name || 'Security User'}</strong>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;