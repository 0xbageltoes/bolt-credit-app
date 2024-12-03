import React from 'react';
import { BarChart3, PieChart, AlertTriangle, TrendingUp } from 'lucide-react';
import { Loan, PortfolioMetrics } from '../types/loan';

interface DashboardProps {
  metrics: PortfolioMetrics;
  loans: Loan[];
}

export function Dashboard({ metrics, loans }: DashboardProps) {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const formatPercent = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-500 text-sm font-medium">Portfolio Value</h3>
          <BarChart3 className="w-5 h-5 text-blue-500" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalValue)}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-500 text-sm font-medium">Avg Interest Rate</h3>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{formatPercent(metrics.averageInterestRate)}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-500 text-sm font-medium">Default Rate</h3>
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{formatPercent(metrics.defaultRate)}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-500 text-sm font-medium">Risk Score</h3>
          <PieChart className="w-5 h-5 text-purple-500" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{metrics.riskScore.toFixed(1)}</p>
      </div>
    </div>
  );
}