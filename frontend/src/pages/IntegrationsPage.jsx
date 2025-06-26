// pages/IntegrationsPage.jsx
import React from 'react';
import IntegrationList from '@/components/Integrations/IntegrationList';

const IntegrationsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Integrations</h1>
      <IntegrationList />
    </div>
  );
};

export default IntegrationsPage;
