import React from 'react';
import { PerformanceMetrics as Metrics } from '../../types/loan';
import { TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';

interface PerformanceMetricsProps {
  metrics: Metrics;
  title: string;
}

export function PerformanceMetrics({ metrics, title }: PerformanceMetricsProps) {
  const formatPercent = (value: number) =>
    new Intl.NumberFormat('en-US', { 
      style: 'percent', 
      minimumFractionDigits: 2 
    }).format(value);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(value);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Defaults</p>
              <TrendingDown className={`w-4 h-4 ${
                metrics.defaultRate > 0.05 ? 'text-red-500' : 'text-green-500'
              }`} />
            </div>
            <p className="mt-2 text-xl font-semibold">
              {formatCurrency(metrics.defaultAmount)}
            </p>
            <p className="text-sm text-gray-500">
              {formatPercent(metrics.defaultRate)} Rate
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Prepayments</p>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </div>
            <p className="mt-2 text-xl font-semibold">
              {formatCurrency(metrics.prepayAmount)}
            </p>
            <p className="text-sm text-gray-500">
              {formatPercent(metrics.prepayRate)} Rate
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Delinquencies</p>
              <AlertCircle className={`w-4 h-4 ${
                metrics.delinquentRate > 0.03 ? 'text-yellow-500' : 'text-green-500'
              }`} />
            </div>
            <p className="mt-2 text-xl font-semibold">
              {formatCurrency(metrics.delinquentAmount)}
            </p>
            <p className="text-sm text-gray-500">
              {formatPercent(metrics.delinquentRate)} Rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}