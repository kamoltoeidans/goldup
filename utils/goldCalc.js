

export function calculateRealtimePnL({
    investment,
    buyPrice,
    currentPrice
  }) {
    const goldAmount = investment / buyPrice;
    const currentValue = goldAmount * currentPrice;
    const profit = currentValue - investment;
    const roi = (profit / investment) * 100;
  
    return {
      goldAmount,
      currentValue,
      profit,
      roi
    };
  }
  
  export function calculateWhatIf({
    investment,
    pastPrice,
    currentPrice
  }) {
    const goldAmount = investment / pastPrice;
    const currentValue = goldAmount * currentPrice;
    const profit = currentValue - investment;
  
    return {
      goldAmount,
      currentValue,
      profit,
      roi: (profit / investment) * 100
    };
  }
  