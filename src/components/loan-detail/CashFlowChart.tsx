import React, { useState } from 'react';
import { CashFlow } from '../../types/loan';
import { formatCurrency, formatDate } from '../../utils/formatting';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CashFlowChartProps {
  cashFlows: CashFlow[];
  title: string;
}

export function CashFlowChart({ cashFlows, title }: CashFlowChartProps) {
  const data = {
    labels: cashFlows.map(cf => formatDate(cf.date)),
    datasets: [
      {
        label: 'Total Cash Flow',
        data: cashFlows.map(cf => cf.total),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 10
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${formatCurrency(context.raw)}`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 9
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 9
          },
          callback: (value: number) => formatCurrency(value)
        }
      }
    }
  };

  return (
    <div className="h-[400px] p-2">
      <Line data={data} options={options} />
    </div>
  );
}