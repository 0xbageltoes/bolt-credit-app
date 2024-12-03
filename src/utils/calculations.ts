export const calculateIRR = (cashFlows: number[], guess = 0.1): number => {
  const maxIterations = 100;
  const tolerance = 0.000001;
  let iteration = 0;
  let x0 = guess;
  let x1 = 0;

  while (iteration < maxIterations) {
    let f = 0;
    let df = 0;
    
    for (let i = 0; i < cashFlows.length; i++) {
      const factor = Math.pow(1 + x0, -(i + 1));
      f += cashFlows[i] * factor;
      df += -cashFlows[i] * (i + 1) * factor / (1 + x0);
    }
    
    x1 = x0 - f / df;
    
    if (Math.abs(x1 - x0) < tolerance) {
      return x1;
    }
    
    x0 = x1;
    iteration++;
  }
  
  return x1;
};

export const calculateMonthlyPayment = (principal: number, rate: number, term: number): number => {
  const monthlyRate = rate / 12;
  return (
    principal *
    (monthlyRate * Math.pow(1 + monthlyRate, term)) /
    (Math.pow(1 + monthlyRate, term) - 1)
  );
};