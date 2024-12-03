import { 
  Loan, 
  CashFlow, 
  PerformanceMetrics, 
  ForecastAssumptions,
  PortfolioMetrics
} from '../types/loan';

export const calculatePortfolioMetrics = (loans: Loan[]): PortfolioMetrics => {
  if (!loans.length) {
    return {
      totalValue: 0,
      averageInterestRate: 0,
      defaultRate: 0,
      riskScore: 0,
    };
  }

  const totalValue = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const averageInterestRate = loans.reduce((sum, loan) => sum + loan.interestRate, 0) / loans.length;
  const defaultCount = loans.filter(loan => loan.status === 'default').length;
  const defaultRate = (defaultCount / loans.length) * 100;
  const averageRiskScore = loans.reduce((sum, loan) => sum + loan.riskScore, 0) / loans.length;

  return {
    totalValue,
    averageInterestRate,
    defaultRate,
    riskScore: averageRiskScore,
  };
};

export const calculateHistoricalPerformance = (loan: Loan): {
  cashFlows: CashFlow[];
  metrics: PerformanceMetrics;
} => {
  const cashFlows: CashFlow[] = [];
  let totalDefault = 0;
  let totalPrepay = 0;
  let totalDelinquent = 0;
  
  const monthlyPayment = calculateMonthlyPayment(loan.amount, loan.interestRate / 100, loan.term);
  let remainingBalance = loan.amount;
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(loan.startDate);
    date.setMonth(date.getMonth() + i);
    
    const interest = remainingBalance * (loan.interestRate / 100 / 12);
    const principal = monthlyPayment - interest;
    
    const defaultAmount = remainingBalance * (Math.random() * 0.01);
    const prepayAmount = remainingBalance * (Math.random() * 0.02);
    const delinquentAmount = remainingBalance * (Math.random() * 0.015);
    
    totalDefault += defaultAmount;
    totalPrepay += prepayAmount;
    totalDelinquent += delinquentAmount;
    
    remainingBalance -= (principal + prepayAmount + defaultAmount);
    
    cashFlows.push({
      date: date.toISOString(),
      principal,
      interest,
      total: principal + interest,
    });
  }
  
  const metrics: PerformanceMetrics = {
    defaultAmount: totalDefault,
    defaultRate: totalDefault / loan.amount,
    prepayAmount: totalPrepay,
    prepayRate: totalPrepay / loan.amount,
    delinquentAmount: totalDelinquent,
    delinquentRate: totalDelinquent / loan.amount,
  };
  
  return { cashFlows, metrics };
};

export const calculateForecastedCashFlows = (
  loan: Loan,
  assumptions: ForecastAssumptions
): CashFlow[] => {
  const cashFlows: CashFlow[] = [];
  let remainingBalance = loan.amount;
  const adjustedRate = loan.interestRate + (assumptions.interestRateAdjustment / 100);
  
  const monthlyPayment = calculateMonthlyPayment(
    remainingBalance,
    adjustedRate / 100,
    loan.term
  );
  
  for (let i = 0; i < loan.term; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    
    const defaultImpact = remainingBalance * (assumptions.defaultRate / 100 / 12);
    const prepayImpact = remainingBalance * (assumptions.prepaymentRate / 100 / 12);
    const recoveryAmount = defaultImpact * (assumptions.recoveryRate / 100);
    
    const interest = remainingBalance * (adjustedRate / 100 / 12);
    const scheduledPrincipal = monthlyPayment - interest;
    const totalPrincipal = scheduledPrincipal + prepayImpact + recoveryAmount;
    
    remainingBalance -= (totalPrincipal + defaultImpact);
    
    cashFlows.push({
      date: date.toISOString(),
      principal: totalPrincipal,
      interest,
      total: totalPrincipal + interest,
    });
    
    if (remainingBalance <= 0) break;
  }
  
  return cashFlows;
};

function calculateMonthlyPayment(principal: number, rate: number, term: number): number {
  const monthlyRate = rate / 12;
  return (
    principal *
    (monthlyRate * Math.pow(1 + monthlyRate, term)) /
    (Math.pow(1 + monthlyRate, term) - 1)
  );
}