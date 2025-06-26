import React from 'react';
import AssignedAssetRow from './AssignedAssetRow';
import AssignAssetButton from './AssignAssetButton';
import { useSelector } from 'react-redux';

const AssignedAssets = () => {
    const assets = useSelector((state) => state.assets.assets);

    return (
        <div className='bg-white p-6 rounded shadow'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className="text-lg font-semibold">Assigned Assets</h2>
            </div>

            {assets.length === 0 ? (
                <p className='text-sm text-gray-500'>No assets assigned yet.</p>
            ) : (
                <table className="min-w-full border-t">
                    <thead className="bg-gray-50 text-sm text-gray-600 uppercase">
                        <tr>
                            <th className="px-4 py-2 text-left">Asset</th>
                            <th className="px-4 py-2 text-left">Type</th>
                            <th className="px-4 py-2 text-left">Serial Number</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Assigned To</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset) => (
                            <AssignedAssetRow key={asset.id} asset={asset} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AssignedAssets;