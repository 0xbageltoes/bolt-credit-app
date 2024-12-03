import React from 'react';
import { Loan, ModificationType } from '../../types/loan';
import { formatCurrency, formatDate, formatPercent } from '../../utils/formatting';
import { File } from 'lucide-react';

interface LoanDetailsProps {
  loan: Loan;
}

export function LoanDetails({ loan }: LoanDetailsProps) {
  const DocumentLink = ({ href, children }: { href?: string; children: React.ReactNode }) => {
    if (!href) return <>{children}</>;
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors gap-1 leading-none"
      >
        <File className="w-3 h-3" />
        <span>{children}</span>
      </a>
    );
  };

  const Tag = ({ text, tooltip }: { text: string; tooltip?: string }) => {
    const displayText = text.length > 8 ? `${text.slice(0, 7)}…` : text;
    return (
      <span 
        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] border border-gray-200 bg-gray-50 text-gray-600 leading-none"
        title={tooltip}
      >
        {displayText}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Column 1: Terms */}
      <div>
        <h3 className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Terms</h3>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Maturity Date</span>
            <span className="text-sm text-gray-900">{formatDate(loan.terms.maturityDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Remaining Term</span>
            <span className="text-sm text-gray-900">{loan.terms.remainingTerm} months</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Payment Date</span>
            <span className="text-sm text-gray-900">{loan.terms.paymentDate}th of month</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Next Payment</span>
            <span className="text-sm text-gray-900">{formatDate(loan.terms.nextPaymentDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Stated Rate</span>
            <span className="text-sm text-gray-900">{formatPercent(loan.terms.statedRate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Rate Type</span>
            <span className="text-sm text-gray-900 capitalize">{loan.terms.rateType}</span>
          </div>
          {loan.terms.rateFloor && (
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Rate Floor</span>
              <span className="text-sm text-gray-900">{formatPercent(loan.terms.rateFloor)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Amortization</span>
            <span className="text-sm text-gray-900 capitalize">{loan.terms.amortizationType}</span>
          </div>
        </div>
      </div>

      {/* Column 2: Origination and Servicing */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Origination</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Originator</span>
              <span className="text-sm text-gray-900">{loan.origination.originator}</span>
            </div>
            {loan.origination.originatorParent && (
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Parent</span>
                <span className="text-sm text-gray-900">{loan.origination.originatorParent}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Channel</span>
              <span className="text-sm text-gray-900">{loan.origination.channel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Origination Date</span>
              <span className="text-sm text-gray-900">{formatDate(loan.origination.originationDate)}</span>
            </div>
            {loan.origination.purchaseDate && (
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Purchase Date</span>
                <span className="text-sm text-gray-900">{formatDate(loan.origination.purchaseDate)}</span>
              </div>
            )}
            {loan.origination.documentationUrls && (
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Docs</span>
                <div className="flex gap-1">
                  {loan.origination.documentationUrls.map((url, index) => (
                    <DocumentLink key={index} href={url}>
                      Doc {index + 1}
                    </DocumentLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Servicing</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Servicer</span>
              <span className="text-sm text-gray-900">{loan.servicing.servicer}</span>
            </div>
            {loan.servicing.subservicer && (
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Subservicer</span>
                <span className="text-sm text-gray-900">{loan.servicing.subservicer}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Mod Options</span>
              <div className="flex gap-1 flex-wrap justify-end">
                {loan.servicing.modificationOptions.map((option, index) => (
                  <Tag key={index} text={option} />
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Total Mods</span>
              <span className="text-sm text-gray-900">
                {formatCurrency(loan.servicing.modifications.totalAmount)}
                <span className="text-xs text-gray-500 ml-1">
                  ({formatPercent(loan.servicing.modifications.percentOfPool)})
                </span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Mods by Type</span>
              <div className="flex gap-1 flex-wrap justify-end">
                {(Object.entries(loan.servicing.modifications.byType) as [ModificationType, number][])
                  .filter(([, percent]) => percent > 0)
                  .map(([type, percent]) => (
                    <Tag 
                      key={type} 
                      text={formatPercent(percent)} 
                      tooltip={type.split('-').join(' ')} 
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column 3: Legal */}
      <div>
        <h3 className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Legal</h3>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Agreement</span>
            <DocumentLink href={loan.legal.agreementUrl}>
              {loan.legal.agreementType}
            </DocumentLink>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Collateral</span>
            <span className="text-sm text-gray-900">{loan.legal.collateralType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Lien Status</span>
            <span className="text-sm text-gray-900">{loan.legal.lienStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Jurisdiction</span>
            <span className="text-sm text-gray-900">{loan.legal.lienJurisdiction}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Governing Law</span>
            <span className="text-sm text-gray-900">{loan.legal.governingLaw}</span>
          </div>
        </div>
      </div>
    </div>
  );
}