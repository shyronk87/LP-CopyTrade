// 启动脚本 - 应用配置
const { appConfig } = require('../src/config/app.config');

// 设置环境变量
process.env.PORT = appConfig.port;
process.env.HOMEPAGE = appConfig.basePath;
process.env.PUBLIC_URL = appConfig.basePath;

// 启动React应用
require('react-scripts/scripts/start');
