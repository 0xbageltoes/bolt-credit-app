import React from 'react';
import { Loan } from '../../types/loan';
import { Clock, DollarSign, Percent, Shield } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/formatting';

interface LoanSummaryProps {
  loan: Loan;
}

export function LoanSummary({ loan }: LoanSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start space-x-3">
            <DollarSign className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-lg font-medium text-gray-900">{formatCurrency(loan.amount)}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Percent className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="text-lg font-medium text-gray-900">{formatPercent(loan.interestRate)}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Term</p>
              <p className="text-lg font-medium text-gray-900">{loan.term} months</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Risk Score</p>
              <p className="text-lg font-medium text-gray-900">{loan.riskScore}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}