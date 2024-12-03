import React from 'react';

interface DetailFieldProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function DetailField({ label, value, className = '' }: DetailFieldProps) {
  return (
    <div className={className}>
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}