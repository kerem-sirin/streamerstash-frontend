import React from 'react';

const DropdownFilter = ({ label, name, options, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor={name}>
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-primary focus:border-primary"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default DropdownFilter;