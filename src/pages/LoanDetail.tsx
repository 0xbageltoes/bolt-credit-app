import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoanHeader } from '../components/loan-detail/LoanHeader';
import { Overview } from '../components/loan-detail/Overview';
import { LoanDetails } from '../components/loan-detail/LoanDetails';
import { CashFlowTable } from '../components/loan-detail/CashFlowTable';
import { CashFlowChart } from '../components/loan-detail/CashFlowChart';
import { ForecastAssumptions } from '../components/loan-detail/ForecastAssumptions';
import { PriceYieldCalculator } from '../components/loan-detail/PriceYieldCalculator';
import { RunResults } from '../components/loan-detail/RunResults';
import { 
  Loan, 
  ForecastAssumptions as Assumptions, 
  CashFlow, 
  PerformanceMetrics as Metrics 
} from '../types/loan';
import { calculateForecastedCashFlows, calculateHistoricalPerformance } from '../utils/analytics';
import { BarChart3, FileText, Calculator } from 'lucide-react';

interface LoanDetailProps {
  loans: Loan[];
}

const defaultAssumptions: Assumptions = {
  defaultRate: 2.0,
  prepaymentRate: 5.0,
  delinquencyRate: 1.5,
  recoveryRate: 60.0,
  interestRateAdjustment: 0,
};

export function LoanDetail({ loans }: LoanDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [loan, setLoan] = useState<Loan | null>(null);
  const [historicalCashFlows, setHistoricalCashFlows] = useState<CashFlow[]>([]);
  const [forecastedCashFlows, setForecastedCashFlows] = useState<CashFlow[]>([]);
  const [historicalMetrics, setHistoricalMetrics] = useState<Metrics | null>(null);
  const [assumptions, setAssumptions] = useState<Assumptions>(defaultAssumptions);
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);

  useEffect(() => {
    const currentLoan = loans.find(l => l.id === id);
    if (currentLoan) {
      setLoan(currentLoan);
    }
  }, [id, loans]);

  useEffect(() => {
    if (loan) {
      const { cashFlows, metrics } = calculateHistoricalPerformance(loan);
      setHistoricalCashFlows(cashFlows);
      setHistoricalMetrics(metrics);
      
      const forecasted = calculateForecastedCashFlows(loan, assumptions);
      setForecastedCashFlows(forecasted);
    }
  }, [loan, assumptions]);

  if (!loan || !historicalMetrics) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  const SectionHeading = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
    <div className="flex items-center space-x-2 px-4 py-2 border-b border-gray-200 mb-3">
      <Icon className="w-4 h-4 text-gray-400" />
      <h2 className="text-sm font-medium text-gray-900">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <LoanHeader loan={loan} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow">
          <button
            onClick={() => setIsOverviewOpen(!isOverviewOpen)}
            className="w-full flex items-center space-x-2 px-4 py-2 border-b border-gray-200"
          >
            <BarChart3 className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-medium text-gray-900">Overview</h2>
          </button>
          {isOverviewOpen && (
            <div className="p-4">
              <Overview loan={loan} metrics={historicalMetrics} />
            </div>
          )}
        </div>

        {/* Loan Details Section */}
        <div className="bg-white rounded-lg shadow">
          <SectionHeading title="Loan Details" icon={FileText} />
          <div className="p-4">
            <LoanDetails loan={loan} />
          </div>
        </div>

        {/* Analysis Section */}
        <div className="bg-white rounded-lg shadow">
          <SectionHeading title="Analysis" icon={Calculator} />
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Forecast Assumptions
                </h3>
                <ForecastAssumptions 
                  assumptions={assumptions}
                  defaultAssumptions={defaultAssumptions}
                  onChange={setAssumptions}
                />
              </div>

              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Price/Yield Calculator
                </h3>
                <PriceYieldCalculator
                  cashFlows={forecastedCashFlows}
                  currentBalance={loan.amount}
                />
              </div>

              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Run Results
                </h3>
                <RunResults cashFlows={forecastedCashFlows} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Forecasted Cash Flows
                </h3>
                <CashFlowTable 
                  cashFlows={forecastedCashFlows}
                  title=""
                />
              </div>
              <div>
                <CashFlowChart 
                  cashFlows={forecastedCashFlows}
                  title="Forecasted Cash Flows"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Historical Cash Flows
                </h3>
                <CashFlowTable 
                  cashFlows={historicalCashFlows}
                  title=""
                />
              </div>
              <div>
                <CashFlowChart 
                  cashFlows={historicalCashFlows}
                  title="Historical Cash Flows"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}