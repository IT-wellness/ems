import { useState } from 'react';
import AssetRow from './AssetRow';
import Pagination from './Pagination';

const mockAssets = [
    {
    id: 1,
    type: "Laptop",
    model: "MacBook Pro 16\"",
    status: "Active",
    assignedTo: "Manisha Kukreja",
  },
  {
    id: 2,
    type: "Desktop",
    model: "Dell OptiPlex 7090",
    status: "Active",
    assignedTo: "Sonu Kumar",
  },
  {
    id: 3,
    type: "Phone",
    model: "iPhone 14 Pro",
    status: "Maintenance",
    assignedTo: "Unassigned",
  },
  {
    id: 4,
    type: "Monitor",
    model: "LG UltraWide 34\"",
    status: "Active",
    assignedTo: "Sukhleen Kaur",
  },
  {
    id: 5,
    type: "Printer",
    model: "HP LaserJet Pro",
    status: "Inactive",
    assignedTo: "Shared Resource",
  },
  {
    id: 6,
    type: "Phone",
    model: "Samsung Galaxy S23",
    status: "Active",
    assignedTo: "Ravi Gupta",
  }
];

const AssetTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(mockAssets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAssets = mockAssets.slice(startIndex, startIndex + itemsPerPage);
    
    return (
        <div className='bg-white shadow rounded-lg p-4'>
            <div className='overflow-x-auto'>
                <table className='min-w-full text-sm text-left'>
                    <thead className='bg-gray-100 text-gray-700 uppercase text-xs'>
                        <tr>
                            <th className='px-4 py-2'>Asset Type</th>
                            <th className='px-4 py-2'>Model</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Assigned To</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                      {currentAssets.length === 0 ? (
                        <tr>
                          <td colSpan="5" className='text-center py-4 text-gray-500'>
                            No assets found.
                          </td>
                        </tr>
                        ) : (
                          currentAssets.map((asset) => (
                            <AssetRow
                                key={asset.id}
                                asset={asset}
                            />
                      ))
                    )}
                    </tbody>
                </table>
            </div>

            <div className='mt-4'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage} />
            </div>
        </div>
    )
};

export default AssetTable;