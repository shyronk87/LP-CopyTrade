// 启动脚本 - 应用环境配置
const { env } = require('../src/config/env.config');

// 设置环境变量
process.env.PORT = env.port;
process.env.HOMEPAGE = env.basePath;
process.env.PUBLIC_URL = env.basePath;

// 启动React应用
require('react-scripts/scripts/start');
