import React, { useState, useEffect } from 'react';
import { CashFlow } from '../../types/loan';
import { formatCurrency, formatPercent } from '../../utils/formatting';
import { calculateIRR } from '../../utils/calculations';

interface PriceYieldCalculatorProps {
  cashFlows: CashFlow[];
  currentBalance: number;
}

type PricingMode = 'price' | 'yield';

export function PriceYieldCalculator({ cashFlows, currentBalance }: PriceYieldCalculatorProps) {
  const [mode, setMode] = useState<PricingMode>('price');
  const [price, setPrice] = useState<number>(100);
  const [yieldToMaturity, setYieldToMaturity] = useState<number | null>(null);
  const [modifiedPrice, setModifiedPrice] = useState<boolean>(false);

  useEffect(() => {
    if (cashFlows.length > 0) {
      const purchasePrice = (price / 100) * currentBalance;
      const cashFlowArray = [-purchasePrice];
      
      cashFlows.forEach(cf => {
        cashFlowArray.push(cf.total);
      });
      
      try {
        const irr = calculateIRR(cashFlowArray);
        setYieldToMaturity(irr * 100);
      } catch (error) {
        setYieldToMaturity(null);
      }
    }
  }, [price, cashFlows, currentBalance]);

  const inputClassName = "w-24 px-2 py-1 text-right text-xs border shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-50 border-gray-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Pricing Mode</span>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as PricingMode)}
          className="w-24 px-2 py-1 text-xs border shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-50 border-gray-200"
        >
          <option value="price">Price</option>
          <option value="yield">Yield</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Dollar Price</span>
        <input
          type="number"
          step="0.01"
          min="0"
          value={price.toFixed(2)}
          onChange={(e) => {
            setPrice(parseFloat(e.target.value) || 0);
            setModifiedPrice(true);
          }}
          className={`${inputClassName} ${
            modifiedPrice ? 'text-blue-600' : 'text-green-600'
          }`}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Purchase Amount</span>
        <span className="text-xs font-medium">
          {formatCurrency((price / 100) * currentBalance)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Yield to Maturity</span>
        <span className="text-xs font-medium text-blue-600">
          {yieldToMaturity !== null ? formatPercent(yieldToMaturity) : 'N/A'}
        </span>
      </div>
    </div>
  );
}