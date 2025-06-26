import React from 'react';

const ThemeSettings = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Appearance</h2>
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input type="radio" name="theme" value="light" defaultChecked className="accent-blue-600" />
          <span>Light Mode</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="theme" value="dark" className="accent-blue-600" />
          <span>Dark Mode</span>
        </label>
      </div>
    </div>
  );
};

export default ThemeSettings;