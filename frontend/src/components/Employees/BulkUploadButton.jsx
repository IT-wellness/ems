import React, { useState } from 'react';
import Papa from 'papaparse';

const BulkUploadButton = ({ onUpload }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const { data, errors } = results;

                if (errors.length) {
                    console.error("Parsing Errors:", errors);
                    alert("Error parsing the CSV file. Please check the format.");
                    return;
                }

                const parsedData = data
                    .filter(row => row.Name && row.Email) // basic required field check
                    .map((row, index) => ({
                        id: Date.now() + index,
                        name: row.Name,
                        email: row.Email,
                        department: row.Department || '',
                        role: row.Role || '',
                        status: row.Status || 'Active',
                    }));

                onUpload(parsedData);
            },
            error: function (err) {
                console.error("CSV Parse Error:", err);
                alert("Failed to parse the CSV file.");
            }
        });
    };

    return (
        <div className="flex items-center gap-3">
            <label htmlFor="csvUpload" className='cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
                Upload CSV
            </label>
            <input
                id="csvUpload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
            />
            {fileName && (
                <span className="text-sm text-gray-600">Selected: {fileName}</span>
            )}
        </div>
    );
};

export default BulkUploadButton;
