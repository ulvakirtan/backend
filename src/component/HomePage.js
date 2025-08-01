import React from 'react';
import { Shield, User, BookOpen } from 'lucide-react';

const RoleCard = ({ icon, title, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out text-center text-gray-700 dark:text-gray-200"
  >
    {icon}
    <h2 className="text-2xl font-semibold">{title}</h2>
  </button>
);

const HomePage = ({ onRoleSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-12">
        <Shield className="mx-auto h-16 w-16 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mt-4">
          Campus Security System
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Please select your role to continue.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <RoleCard icon={<User className="h-12 w-12 mb-4" />} title="Student" onClick={() => onRoleSelect('student')} />
        <RoleCard icon={<BookOpen className="h-12 w-12 mb-4" />} title="Professor" onClick={() => onRoleSelect('professor')} />
        <RoleCard icon={<Shield className="h-12 w-12 mb-4" />} title="Security" onClick={() => onRoleSelect('security')} />
      </div>
    </div>
  );
};

export default HomePage;