// components/Integrations/IntegrationList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IntegrationCard from './IntegrationCard';
import { toggleIntegrationStatus } from '../../store/slices/integrationSlice';

const IntegrationList = () => {
  const dispatch = useDispatch();
  const integrations = useSelector(state => state.integrations.integrations);

  return (
    <div className="space-y-4">
      {integrations.map(integration => (
        <IntegrationCard
          key={integration.id}
          {...integration}
          onToggle={() => dispatch(toggleIntegrationStatus(integration.id))}
        />
      ))}
    </div>
  );
};

export default IntegrationList;
