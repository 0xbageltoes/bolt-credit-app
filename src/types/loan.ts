export type LoanType = 'consumer' | 'commercial' | 'credit-facility' | 'abs';
export type LoanStatus = 'current' | 'late' | 'default';
export type RateType = 'fixed' | 'floating';
export type AmortizationType = 'level' | 'balloon' | 'interest-only' | 'custom';
export type ModificationType = 'term-extension' | 'rate-reduction' | 'deferral';

export interface Loan {
  id: string;
  type: LoanType;
  borrower: string;
  amount: number;
  interestRate: number;
  term: number;
  startDate: string;
  status: LoanStatus;
  riskScore: number;
  collateral?: string;
  terms: LoanTerms;
  legal: LegalInfo;
  origination: OriginationInfo;
  servicing: ServicingInfo;
}

export interface LoanTerms {
  maturityDate: string;
  remainingTerm: number;
  paymentDate: number; // day of month
  nextPaymentDate: string;
  statedRate: number;
  penaltyRate: number;
  rateType: RateType;
  rateFloor?: number;
  amortizationType: AmortizationType;
}

export interface LegalInfo {
  agreementType: string;
  agreementUrl?: string;
  collateralType: string;
  lienStatus: string;
  lienJurisdiction: string;
  governingLaw: string;
}

export interface OriginationInfo {
  originator: string;
  originatorParent?: string;
  channel: string;
  originationDate: string;
  purchaseDate?: string;
  documentationUrls?: string[];
}

export interface ServicingInfo {
  servicer: string;
  subservicer?: string;
  modificationOptions: string[];
  modifications: {
    totalAmount: number;
    percentOfPool: number;
    byType: {
      [key in ModificationType]: number;
    };
  };
}

export interface PortfolioMetrics {
  totalValue: number;
  averageInterestRate: number;
  defaultRate: number;
  riskScore: number;
}

export interface CashFlow {
  date: string;
  principal: number;
  interest: number;
  total: number;
}

export interface PerformanceMetrics {
  defaultAmount: number;
  defaultRate: number;
  prepayAmount: number;
  prepayRate: number;
  delinquentAmount: number;
  delinquentRate: number;
}

export interface ForecastAssumptions {
  defaultRate: number;
  prepaymentRate: number;
  delinquencyRate: number;
  recoveryRate: number;
  interestRateAdjustment: number;
}