import React from 'react';
import AccountSettings from '@/components/Settings/AccountSettings';
import NotificationSettings from '@/components/Settings/NotificationSettings';
import ThemeSettings from '@/components/Settings/ThemeSettings';

const SettingsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <AccountSettings />
      <NotificationSettings />
      <ThemeSettings />
    </div>
  );
};

export default SettingsPage;