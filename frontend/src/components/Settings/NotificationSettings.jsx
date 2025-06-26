import React from 'react';

const NotificationSettings = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Notification Preferences</h2>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="accent-blue-600" />
          <span>Email Notifications</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="accent-blue-600" />
          <span>SMS Notifications</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="accent-blue-600" />
          <span>App Notifications</span>
        </label>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save Preferences</button>
    </div>
  );
};

export default NotificationSettings;