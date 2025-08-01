import React from 'react';
import { LogOut } from 'lucide-react';

const DashboardLayout = ({ user, onLogout, navItems, activeTab, setActiveTab, children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome, {user.name}</h2>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg text-left font-semibold transition-colors ${
                activeTab === id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" /> {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-bold"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-grow p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;