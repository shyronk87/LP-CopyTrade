// 环境配置文件
const envConfig = {
  // 开发环境配置
  development: {
    basePath: '/leaderboard',
    apiBaseURL: 'http://localhost:3000/v3/leaderboards',
    port: 3001,
  },
  
  // 生产环境配置
  production: {
    basePath: '/leaderboard',
    apiBaseURL: 'http://localhost:3000/v3/leaderboards',
    port: 3001,
  }
};

// 获取当前环境
const currentEnv = process.env.NODE_ENV || 'development';

// 导出当前环境配置
export const env = envConfig[currentEnv];

// 导出所有配置
export default envConfig;
