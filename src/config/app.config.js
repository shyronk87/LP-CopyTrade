// 应用配置文件
import { env } from './env.config';

export const appConfig = {
  // 应用基础路径 - 从环境配置获取
  basePath: env.basePath,
  
  // 应用标题
  title: 'LP盈利排行榜',
  
  // API配置 - 从环境配置获取
  api: {
    baseURL: env.apiBaseURL,
    timeout: 10000,
  },
  
  // 分页配置
  pagination: {
    defaultLimit: 100,
    maxLimit: 500,
  },
  
  // 排序选项配置
  sortOptions: [
    { key: 'total_pnl', label: 'Total PnL', apiCall: 'getTotalProfitLeaderboard' },
    { key: 'daily_pnl', label: '1D PnL', apiCall: 'getDailyProfitLeaderboard' },
    { key: 'weekly_pnl', label: '7D PnL', apiCall: 'getWeeklyProfitLeaderboard' },
    { key: 'monthly_pnl', label: '30D PnL', apiCall: 'getMonthlyProfitLeaderboard' },
    { key: 'weekly_winrate', label: '7D Win Rate', apiCall: 'getWeeklyWinRateLeaderboard' },
    { key: 'weekly_txs', label: '7D TXs', apiCall: 'getWeeklyTransactionLeaderboard' }
  ],
  
  // 默认排序
  defaultSort: 'total_pnl',
  
  // 主题配置
  theme: {
    primaryColor: '#4CAF50',
    secondaryColor: '#f44336',
    backgroundColor: '#000000',
    textColor: '#ffffff',
  }
};

// 导出默认配置
export default appConfig;
