import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { LoanTable } from './components/LoanTable';
import { LoanDetail } from './pages/LoanDetail';
import { calculatePortfolioMetrics } from './utils/analytics';
import { Loan } from './types/loan';

// Sample data - in a real app, this would come from an API
const sampleLoans: Loan[] = [
  {
    id: '1',
    type: 'consumer',
    borrower: 'John Doe',
    amount: 25000,
    interestRate: 5.5,
    term: 60,
    startDate: '2024-01-15',
    status: 'current',
    riskScore: 720,
    terms: {
      maturityDate: '2029-01-15',
      remainingTerm: 57,
      paymentDate: 15,
      nextPaymentDate: '2024-04-15',
      statedRate: 5.5,
      penaltyRate: 10.5,
      rateType: 'fixed',
      amortizationType: 'level'
    },
    legal: {
      agreementType: 'Consumer Loan Agreement',
      agreementUrl: 'https://example.com/docs/loan1.pdf',
      collateralType: 'Unsecured',
      lienStatus: 'N/A',
      lienJurisdiction: 'California',
      governingLaw: 'California'
    },
    origination: {
      originator: 'ABC Bank',
      originatorParent: 'ABC Financial Holdings',
      channel: 'Direct to Consumer',
      originationDate: '2024-01-15',
      documentationUrls: ['https://example.com/docs/loan1_orig.pdf']
    },
    servicing: {
      servicer: 'ABC Loan Servicing',
      modificationOptions: ['Term Extension', 'Rate Reduction'],
      modifications: {
        totalAmount: 0,
        percentOfPool: 0,
        byType: {
          'term-extension': 0,
          'rate-reduction': 0,
          'deferral': 0
        }
      }
    }
  },
  {
    id: '2',
    type: 'commercial',
    borrower: 'ABC Corp',
    amount: 500000,
    interestRate: 4.2,
    term: 120,
    startDate: '2023-11-01',
    status: 'current',
    riskScore: 800,
    collateral: 'Commercial Property',
    terms: {
      maturityDate: '2033-11-01',
      remainingTerm: 116,
      paymentDate: 1,
      nextPaymentDate: '2024-04-01',
      statedRate: 4.2,
      penaltyRate: 9.2,
      rateType: 'floating',
      rateFloor: 3.5,
      amortizationType: 'balloon'
    },
    legal: {
      agreementType: 'Commercial Mortgage',
      agreementUrl: 'https://example.com/docs/loan2.pdf',
      collateralType: 'Commercial Real Estate',
      lienStatus: 'First Lien',
      lienJurisdiction: 'New York',
      governingLaw: 'New York'
    },
    origination: {
      originator: 'XYZ Commercial Lending',
      originatorParent: 'XYZ Bank',
      channel: 'Broker',
      originationDate: '2023-11-01',
      purchaseDate: '2023-12-01',
      documentationUrls: [
        'https://example.com/docs/loan2_orig.pdf',
        'https://example.com/docs/loan2_purchase.pdf'
      ]
    },
    servicing: {
      servicer: 'XYZ Servicing',
      subservicer: 'Regional Servicing Co',
      modificationOptions: ['Term Extension', 'Rate Reduction', 'Payment Deferral'],
      modifications: {
        totalAmount: 50000,
        percentOfPool: 10,
        byType: {
          'term-extension': 60,
          'rate-reduction': 30,
          'deferral': 10
        }
      }
    }
  },
  {
    id: '3',
    type: 'credit-facility',
    borrower: 'XYZ Industries',
    amount: 1000000,
    interestRate: 6.0,
    term: 36,
    startDate: '2023-08-15',
    status: 'late',
    riskScore: 650,
    terms: {
      maturityDate: '2026-08-15',
      remainingTerm: 28,
      paymentDate: 15,
      nextPaymentDate: '2024-04-15',
      statedRate: 6.0,
      penaltyRate: 11.0,
      rateType: 'floating',
      rateFloor: 4.5,
      amortizationType: 'interest-only'
    },
    legal: {
      agreementType: 'Revolving Credit Agreement',
      agreementUrl: 'https://example.com/docs/loan3.pdf',
      collateralType: 'All Assets',
      lienStatus: 'First Lien',
      lienJurisdiction: 'Delaware',
      governingLaw: 'Delaware'
    },
    origination: {
      originator: 'DEF Capital',
      channel: 'Direct',
      originationDate: '2023-08-15',
      documentationUrls: ['https://example.com/docs/loan3_orig.pdf']
    },
    servicing: {
      servicer: 'DEF Loan Administration',
      modificationOptions: ['Payment Deferral'],
      modifications: {
        totalAmount: 100000,
        percentOfPool: 10,
        byType: {
          'term-extension': 0,
          'rate-reduction': 0,
          'deferral': 100
        }
      }
    }
  },
  {
    id: '4',
    type: 'abs',
    borrower: 'Auto Loan Trust 2024-1',
    amount: 2500000,
    interestRate: 3.8,
    term: 84,
    startDate: '2024-02-01',
    status: 'current',
    riskScore: 750,
    collateral: 'Auto Loan Pool',
    terms: {
      maturityDate: '2031-02-01',
      remainingTerm: 82,
      paymentDate: 20,
      nextPaymentDate: '2024-04-20',
      statedRate: 3.8,
      penaltyRate: 8.8,
      rateType: 'fixed',
      amortizationType: 'level'
    },
    legal: {
      agreementType: 'Securitization Trust Agreement',
      agreementUrl: 'https://example.com/docs/loan4.pdf',
      collateralType: 'Auto Loans',
      lienStatus: 'First Lien',
      lienJurisdiction: 'Multiple',
      governingLaw: 'New York'
    },
    origination: {
      originator: 'GHI Auto Finance',
      originatorParent: 'GHI Financial',
      channel: 'Securitization',
      originationDate: '2024-02-01',
      documentationUrls: [
        'https://example.com/docs/loan4_prospectus.pdf',
        'https://example.com/docs/loan4_indenture.pdf'
      ]
    },
    servicing: {
      servicer: 'GHI Servicing',
      subservicer: 'National Auto Servicing',
      modificationOptions: ['Term Extension', 'Payment Deferral'],
      modifications: {
        totalAmount: 25000,
        percentOfPool: 1,
        byType: {
          'term-extension': 80,
          'rate-reduction': 0,
          'deferral': 20
        }
      }
    }
  }
];

function App() {
  const metrics = calculatePortfolioMetrics(sampleLoans);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Loan Portfolio Analysis</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Monitor and analyze your loan portfolio performance
                </p>
              </div>
              <Dashboard metrics={metrics} loans={sampleLoans} />
              <LoanTable loans={sampleLoans} />
            </div>
          </div>
        } />
        <Route path="/loan/:id" element={<LoanDetail loans={sampleLoans} />} />
      </Routes>
    </Router>
  );
}

export default App;