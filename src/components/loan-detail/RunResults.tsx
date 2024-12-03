import React from 'react';
import { CashFlow } from '../../types/loan';
import { formatCurrency } from '../../utils/formatting';

interface RunResultsProps {
  cashFlows: CashFlow[];
}

export function RunResults({ cashFlows }: RunResultsProps) {
  const totalPrincipal = cashFlows.reduce((sum, cf) => sum + cf.principal, 0);
  const totalInterest = cashFlows.reduce((sum, cf) => sum + cf.interest, 0);
  const totalCashFlow = totalPrincipal + totalInterest;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Total Principal</span>
        <span className="text-xs font-medium">{formatCurrency(totalPrincipal)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Total Interest</span>
        <span className="text-xs font-medium">{formatCurrency(totalInterest)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Total Cash Flow</span>
        <span className="text-xs font-medium">{formatCurrency(totalCashFlow)}</span>
      </div>
    </div>
  );
}