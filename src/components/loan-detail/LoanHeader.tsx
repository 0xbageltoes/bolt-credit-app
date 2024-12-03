import React from 'react';
import { Loan } from '../../types/loan';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatting';

interface LoanHeaderProps {
  loan: Loan;
}

export function LoanHeader({ loan }: LoanHeaderProps) {
  return (
    <div className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              {loan.borrower} - {loan.type.toUpperCase()}
            </h1>
          </div>
          <div className="inline-flex items-center px-2.5 py-1.5 rounded text-xs bg-gray-100 text-gray-700">
            <span className="text-gray-500 mr-1">Date Updated:</span>
            {formatDate(new Date().toISOString())}
          </div>
        </div>
      </div>
    </div>
  );
}