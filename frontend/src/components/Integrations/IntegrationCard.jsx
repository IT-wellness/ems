// components/Integrations/IntegrationCard.jsx
import React from 'react';
import Button from "../Button";

const IntegrationCard = ({ name, description, status, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Button
        className={status === 'connected' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}
        onClick={onToggle}
      >
        {status === 'connected' ? 'Disconnect' : 'Connect'}
      </Button>
    </div>
  );
};

export default IntegrationCard;
