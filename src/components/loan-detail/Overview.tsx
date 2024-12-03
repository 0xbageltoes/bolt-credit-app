import React from 'react';
import { Loan, PerformanceMetrics } from '../../types/loan';
import { BarChart3, PieChart, AlertTriangle, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/formatting';

interface OverviewProps {
  loan: Loan;
  metrics: PerformanceMetrics;
}

export function Overview({ loan, metrics }: OverviewProps) {
  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon,
    iconColor 
  }: { 
    title: string; 
    value: string; 
    icon: React.ElementType;
    iconColor: string;
  }) => (
    <div className="bg-white rounded p-3">
      <div className="flex items-center space-x-2">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <div>
          <p className="text-xs text-gray-500">{title}</p>
          <p className="text-sm font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-3">
      <MetricCard
        title="Current Balance"
        value={formatCurrency(loan.amount)}
        icon={BarChart3}
        iconColor="text-blue-500"
      />
      <MetricCard
        title="Interest Rate"
        value={formatPercent(loan.interestRate)}
        icon={TrendingUp}
        iconColor="text-green-500"
      />
      <MetricCard
        title="Risk Score"
        value={loan.riskScore.toString()}
        icon={PieChart}
        iconColor="text-purple-500"
      />
      <MetricCard
        title="Default Rate"
        value={formatPercent(metrics.defaultRate)}
        icon={AlertTriangle}
        iconColor="text-red-500"
      />
    </div>
  );
}