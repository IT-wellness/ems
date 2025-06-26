import React from 'react';

const AccountSettings = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Account Settings</h2>
      <div className="space-y-2">
        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded-md" />
        <input type="email" placeholder="Email Address" className="w-full border p-2 rounded-md" />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded-md" />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Update Account</button>
    </div>
  );
};

export default AccountSettings;