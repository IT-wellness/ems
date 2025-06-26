import React from 'react';
import { Trash2, Upload, Download } from 'lucide-react';
import BulkUploadButton from './BulkUploadButton';

const EmployeeActions = ({
  selectedEmployeeIds,
  onDeleteSelected,
  onBulkUpload,
  onExport,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
      {/* Bulk Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onDeleteSelected}
          disabled={selectedEmployeeIds.length === 0}
          className={`flex items-center gap-1 text-sm px-3 py-2 rounded-lg border ${
            selectedEmployeeIds.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-red-100 text-red-600 hover:bg-red-200'
          }`}
        >
          <Trash2 size={16} />
          Delete Selected
        </button>

        <BulkUploadButton onUpload={onBulkUpload} />

        <button
          onClick={onExport}
          className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg border bg-green-100 text-green-700 hover:bg-green-200"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Info about selected count */}
      <div className="text-sm text-gray-500 mt-2 sm:mt-0">
        {selectedEmployeeIds.length > 0 && (
          <span>{selectedEmployeeIds.length} selected</span>
        )}
      </div>
    </div>
  );
};

export default EmployeeActions;
