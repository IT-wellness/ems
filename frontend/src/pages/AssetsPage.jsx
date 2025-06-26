import { useState } from 'react';
import AssetTable from '../components/Assets/AssetTable';
import AssetFilters from '../components/Assets/AssetFilters';
import AddAssetButton from '../components/Assets/AddAssetButton';
import AssetForm from '../components/Assets/AssetForm';

const AssetPage = () => {
    const [filters, setFilters] = useState({
        type: '',
        status: ''
    });

    const [showAddForm, setShowAddForm] = useState(false);

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        console.log('Applied Filters:', newFilters);
    };

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleFormClose = () => {
        setShowAddForm(false);
    }

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-semibold'>Hardware Assets</h2>
                <AddAssetButton onClick={handleAddClick}/>
            </div>
            <AssetFilters onFilter={handleFilter}/>
            <AssetTable filters={filters}/>

            {showAddForm && (
                <AssetForm
                    onClose={handleFormClose}
                    onSuccess={handleFormClose}
                    />
            )}
        </div>
    )
};

export default AssetPage;