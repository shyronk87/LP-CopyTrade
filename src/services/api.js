import axios from 'axios';
import { appConfig } from '../config/app.config';

// 创建axios实例
const apiClient = axios.create({
  baseURL: appConfig.api.baseURL,
  timeout: appConfig.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * API响应处理器
 */
const handleApiResponse = (response) => {
  const data = response.data;
  if (!data.success) {
    throw new Error(data.error || '请求失败');
  }
  return data.data;
};

/**
 * 排行榜API服务
 */
export const leaderboardAPI = {
  // 获取所有用户统计（用于总盈利排序）
  getAllUsers: async (limit = 100) => {
    const response = await apiClient.get(`/users?limit=${limit}`);
    return handleApiResponse(response);
  },

  // 获取1天盈利排行榜
  getDailyProfitLeaderboard: async (limit = 100) => {
    const response = await apiClient.get(`/daily/profit?limit=${limit}`);
    return handleApiResponse(response);
  },

  // 获取7天盈利排行榜
  getWeeklyProfitLeaderboard: async (limit = 100) => {
    const response = await apiClient.get(`/weekly/profit?limit=${limit}`);
    return handleApiResponse(response);
  },

  // 获取30天盈利排行榜
  getMonthlyProfitLeaderboard: async (limit = 100) => {
    const response = await apiClient.get(`/monthly/profit?limit=${limit}`);
    return handleApiResponse(response);
  },

  // 获取7天胜率排行榜
  getWeeklyWinRateLeaderboard: async (limit = 100) => {
    const response = await apiClient.get(`/weekly/winrate?limit=${limit}`);
    return handleApiResponse(response);
  },

  // 获取7天交易量排行榜
  getWeeklyTransactionLeaderboard: async (limit = 100) => {
    const response = await apiClient.get(`/weekly/transactions?limit=${limit}`);
    return handleApiResponse(response);
  },

  // 获取30天胜率排行榜
  getMonthlyWinRateLeaderboard: async (limit = 100) => {
    const response = await apiClient.get(`/monthly/winrate?limit=${limit}`);
    return handleApiResponse(response);
  },

  // 获取总盈利排行榜
  getTotalProfitLeaderboard: async (limit = 100) => {
    const response = await apiClient.get(`/total/profit?limit=${limit}`);
    return handleApiResponse(response);
  }
};
