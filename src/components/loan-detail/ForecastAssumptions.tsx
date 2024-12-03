import React from 'react';
import { ForecastAssumptions as Assumptions } from '../../types/loan';

interface ForecastAssumptionsProps {
  assumptions: Assumptions;
  defaultAssumptions: Assumptions;
  onChange: (assumptions: Assumptions) => void;
}

export function ForecastAssumptions({ 
  assumptions, 
  defaultAssumptions,
  onChange 
}: ForecastAssumptionsProps) {
  const handleInputChange = (field: keyof Assumptions, value: string) => {
    onChange({
      ...assumptions,
      [field]: parseFloat(value) || 0,
    });
  };

  const isModified = (field: keyof Assumptions) => {
    return assumptions[field] !== defaultAssumptions[field];
  };

  const getInputClassName = (field: keyof Assumptions) => {
    const baseClasses = "w-24 px-2 py-1 text-right text-xs border shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-50 border-gray-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
    return `${baseClasses} ${
      isModified(field)
        ? 'text-blue-600'
        : 'text-green-600'
    }`;
  };

  return (
    <div className="space-y-2">
      {Object.entries(assumptions).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center">
          <label className="text-xs text-gray-500">
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={value.toFixed(2)}
            onChange={(e) => handleInputChange(key as keyof Assumptions, e.target.value)}
            className={getInputClassName(key as keyof Assumptions)}
          />
        </div>
      ))}
    </div>
  );
}