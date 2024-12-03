import React from 'react';
import { CashFlow } from '../../types/loan';
import { formatCurrency, formatDate } from '../../utils/formatting';

interface CashFlowTableProps {
  cashFlows: CashFlow[];
  title: string;
}

export function CashFlowTable({ cashFlows }: CashFlowTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="divide-x divide-gray-200">
              <th className="px-2 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider bg-gray-50 select-none">
                Date
              </th>
              <th className="px-2 py-1.5 text-right text-[10px] font-medium text-gray-500 uppercase tracking-wider bg-gray-50 select-none">
                Principal
              </th>
              <th className="px-2 py-1.5 text-right text-[10px] font-medium text-gray-500 uppercase tracking-wider bg-gray-50 select-none">
                Interest
              </th>
              <th className="px-2 py-1.5 text-right text-[10px] font-medium text-gray-500 uppercase tracking-wider bg-gray-50 select-none">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cashFlows.map((cf, index) => (
              <tr 
                key={index} 
                className="divide-x divide-gray-200 hover:bg-blue-50/50"
              >
                <td className="px-2 py-1 whitespace-nowrap text-[11px] text-gray-900 font-medium select-all">
                  {formatDate(cf.date)}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-[11px] text-gray-900 text-right font-mono select-all">
                  {formatCurrency(cf.principal)}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-[11px] text-gray-900 text-right font-mono select-all">
                  {formatCurrency(cf.interest)}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-[11px] text-gray-900 text-right font-mono select-all">
                  {formatCurrency(cf.total)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 sticky bottom-0 z-10">
            <tr className="divide-x divide-gray-200">
              <td className="px-2 py-1.5 text-[10px] font-medium text-gray-500">
                Total
              </td>
              <td className="px-2 py-1.5 text-[11px] font-medium text-gray-900 text-right font-mono">
                {formatCurrency(cashFlows.reduce((sum, cf) => sum + cf.principal, 0))}
              </td>
              <td className="px-2 py-1.5 text-[11px] font-medium text-gray-900 text-right font-mono">
                {formatCurrency(cashFlows.reduce((sum, cf) => sum + cf.interest, 0))}
              </td>
              <td className="px-2 py-1.5 text-[11px] font-medium text-gray-900 text-right font-mono">
                {formatCurrency(cashFlows.reduce((sum, cf) => sum + cf.total, 0))}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}