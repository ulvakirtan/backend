import React, { useState } from 'react';
import './App.css';
import HomePage from './component/HomePage';
import LoginPage from './component/LoginPage';
import RegistrationPage from './component/RegistrationPage';
import StudentDashboard from './component/StudentDashboard';
import ProfessorDashboard from './component/ProfessorDashboard';
import SecurityDashboard from './component/SecurityDashboard';
export default function App() {
  const [page, setPage] = useState('home');
  const [role, setRole] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSelectRole = (userRole) => {
    setRole(userRole);
    setPage('login');
  };

  const handleGoToRegister = () => setPage('register');
  const handleGoToLogin = () => setPage('login');

  const onLoginSuccess = (user) => {
    setLoggedInUser(user);
    setPage(role);
  };

  const onRegisterSuccess = (user) => {
    setLoggedInUser(user);
    setPage(role);
  };

  const handleLogout = () => {
    setRole(null);
    setLoggedInUser(null);
    setPage('home');
  };

  const renderPage = () => {
    switch (page) {
      case 'login':
        return (
          <LoginPage
            onLoginSuccess={onLoginSuccess}
            role={role}
            onGoToRegister={handleGoToRegister}
          />
        );
      case 'register':
        return (
          <RegistrationPage
            onRegisterSuccess={onRegisterSuccess}
            role={role}
            onGoToLogin={handleGoToLogin}
          />
        );
      case 'student':
        return <StudentDashboard user={loggedInUser} onLogout={handleLogout} />;
      case 'professor':
        return <ProfessorDashboard user={loggedInUser} onLogout={handleLogout} />;
      case 'security':
        return <SecurityDashboard user={loggedInUser} onLogout={handleLogout} />;
      case 'home':
      default:
        return <HomePage onRoleSelect={handleSelectRole} />;
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      {renderPage()}
    </div>
  );
}