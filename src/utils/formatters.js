/**
 * 格式化工具函数
 */

// 格式化钱包地址
export const formatWalletAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// 格式化USD金额
export const formatUSD = (amount) => {
  if (amount === undefined || amount === null) return '$0.00';
  
  const absAmount = Math.abs(amount);
  if (absAmount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (absAmount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  } else {
    return `$${amount.toFixed(2)}`;
  }
};

// 格式化百分比
export const formatPercentage = (value, decimals = 1) => {
  if (value === undefined || value === null) return '0%';
  
  // 后端返回的胜率已经是百分比形式 (如 85 表示 85%)
  // 直接格式化并确保不超过100%
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace('%', '')) 
    : value;
    
  return `${Math.min(numericValue, 100).toFixed(decimals)}%`;
};

// 格式化交易次数
export const formatTransactionCount = (count) => {
  if (!count && count !== 0) return '0';
  return count.toString();
};

// 获取PnL的颜色类
export const getPnLColorClass = (value) => {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'neutral';
};
