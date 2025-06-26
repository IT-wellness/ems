import AssetStatusBadge from './AssetStatusBadge';

const AssetRow = ({ asset, onEdit, onDelete }) => {
    const { 
        type='Unknown', 
        model='-', 
        status='Inactive',
        assignedTo='-' 
    } = asset || {};
    
    const assetIcons = {
        Laptop: '💻',
        Desktop: '🖥️',
        Phone: '📱',
        Mobile: '📱',
        Monitor: '🖵',
        Printer: '🖨️'
    };

    return (
        <tr className='border-b hover:bg-gray-50 transition text-sm'>
            <td className='px-4 py-2 font-medium text-gray-800 flex items-center gap-2'>
                <span>{assetIcons[type] || '📦'}</span>
                {type}
            </td>
            <td className='px-4 py-2 text-gray-600'>{model}</td>
            <td className='px-4 py-2'>
                <AssetStatusBadge status={status} />
            </td>
            <td className="px-4 py-2 text-gray-600">{assignedTo}</td>
            <td className='px-4 py-2 flex gap-2'>
                <button
                    className='text-blue-600 hover:underline'
                    onClick={() => onEdit?.(asset)}>Edit</button>
                <button
                    className='text-red-600 hover:underline'
                    onClick={() => onDelete?.(asset)}>Delete</button>
            </td>
        </tr>
    )
};

export default AssetRow;