import React from 'react';

const CheckboxFilter = ({ label, options, selectedOptions, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
            <div className="custom-scrollbar space-y-2 max-h-48 overflow-y-auto pr-2">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <input
                            id={`tag-${option.value}`}
                            name={option.value}
                            type="checkbox"
                            checked={selectedOptions.includes(option.value)}
                            onChange={onChange}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`tag-${option.value}`} className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxFilter;