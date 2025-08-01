import React, { useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import ManageComplaintsSection from './professor/ManageComplaintsSection';
import SOSAlertsSection from './professor/SOSAlertsSection';
import IssueAlertsSection from './professor/IssueAlertsSection';
import EntryAlertsSection from './professor/EntryAlertsSection';
import { MessageSquare, AlertTriangle, Bell, QrCode } from 'lucide-react';

const ProfessorDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('complaints');

  const renderContent = () => {
    switch (activeTab) {
      case 'complaints': return <ManageComplaintsSection />;
      case 'sos': return <SOSAlertsSection />;
      case 'issue-alerts': return <IssueAlertsSection />;
      case 'entry-alerts': return <EntryAlertsSection />;
      default: return <ManageComplaintsSection />;
    }
  };

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      navItems={[
        { id: 'complaints', label: 'Manage Complaints', icon: MessageSquare },
        { id: 'sos', label: 'SOS Alerts', icon: AlertTriangle },
        { id: 'issue-alerts', label: 'Issue Alerts', icon: Bell },
        { id: 'entry-alerts', label: 'Entry Alerts', icon: QrCode },
      ]}
      activeTab={activeTab}s
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default ProfessorDashboard;