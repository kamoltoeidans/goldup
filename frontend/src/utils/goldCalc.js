// Utility ฟังก์ชันคำนวณกำไร/ขาดทุนการลงทุนทองคำ

export function calcGoldPnL({ investment, buyPrice, currentPrice }) {
  if (!investment || !buyPrice || !currentPrice) return null;
  const inv = Number(investment);
  const buy = Number(buyPrice);
  const curr = Number(currentPrice);
  if (inv <= 0 || buy <= 0 || curr <= 0) return null;

  const units = inv / buy;
  const currentValue = units * curr;
  const profit = currentValue - inv;
  const roi = (profit / inv) * 100;

  return { units, currentValue, profit, roi };
}

