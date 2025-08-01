import React from 'react';

const DashboardLayout = ({ title, children, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{title}</h1>
        <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;