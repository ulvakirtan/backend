import React, { useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import ComplaintSection from './student/ComplaintSection';
import CollegeEntranceSection from './student/EntranceSection';
import EmergencySOSSection from './student/EmergencySOSSection';
import ProfileSection from './student/ProfileSection';
import { MessageSquare, QrCode, AlertTriangle, UserCog } from 'lucide-react';

const StudentDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('complaint');

  const renderContent = () => {
    switch (activeTab) {
      case 'complaint': return <ComplaintSection />;
      case 'entrance': return <CollegeEntranceSection />;
      case 'sos': return <EmergencySOSSection />;
      case 'profile': return <ProfileSection user={user} />;
      default: return <ComplaintSection />;
    }
  };

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      navItems={[
        { id: 'complaint', label: 'Complaint', icon: MessageSquare },
        { id: 'entrance', label: 'College Entrance', icon: QrCode },
        { id: 'sos', label: 'Emergency SOS', icon: AlertTriangle },
        { id: 'profile', label: 'Profile', icon: UserCog },
      ]}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default StudentDashboard;