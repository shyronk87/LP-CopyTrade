# 加密货币交易排行榜前端

这是一个基于React的加密货币交易排行榜应用程序，展示交易者的盈亏数据、胜率和交易次数。

## 功能特性

- 📊 **动态排行榜**: 显示交易者的钱包地址、盈亏数据、胜率和交易次数
- 🔄 **动态排序**: 支持按多种条件排序（总盈利、1天/7天/30天盈利、胜率、交易次数）
- 🎨 **现代化UI**: 暗色主题，渐变效果，响应式设计
- 📱 **移动端适配**: 完全响应式设计，支持移动设备
- ⚡ **实时数据**: 从后端API获取最新的交易数据

## 技术栈

- **React 19.1.1**: 前端框架
- **Axios**: HTTP客户端用于API请求
- **CSS3**: 样式设计（渐变、动画、响应式）
- **JavaScript (ES6+)**: 现代JavaScript语法

## 安装和运行

### 前置要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
cd Frontend/lp_copytrade
npm install
```

### 配置后端API

在 `src/services/api.js` 中修改后端API地址：

```javascript
const API_BASE_URL = 'http://localhost:3001/v3/leaderboards'; // 修改为你的后端地址
```

### 启动开发服务器

```bash
npm start
```

应用程序将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

构建文件将生成在 `build/` 目录中

## 项目结构

```
src/
├── components/           # React组件
│   ├── Leaderboard.js   # 主排行榜组件
│   ├── LeaderboardTable.js # 表格组件
│   ├── SortingHeader.js # 排序头部组件
│   └── *.css           # 对应的CSS样式文件
├── services/            # API服务
│   └── api.js          # 后端API接口封装
├── utils/              # 工具函数
│   └── formatters.js   # 数据格式化函数
├── App.js              # 应用主组件
├── App.css             # 应用样式
├── index.js            # 应用入口
└── index.css           # 全局样式
```

## API接口

应用程序使用以下后端API接口：

- `GET /v3/leaderboards/users` - 获取所有用户统计
- `GET /v3/leaderboards/daily/profit` - 获取1天盈利排行榜
- `GET /v3/leaderboards/weekly/profit` - 获取7天盈利排行榜
- `GET /v3/leaderboards/monthly/profit` - 获取30天盈利排行榜
- `GET /v3/leaderboards/weekly/winrate` - 获取7天胜率排行榜
- `GET /v3/leaderboards/total/profit` - 获取总盈利排行榜

## 排序功能

支持以下排序选项：

1. **Total PnL** - 总盈利排序
2. **1D PnL** - 1天盈利排序
3. **7D PnL** - 7天盈利排序
4. **30D PnL** - 30天盈利排序
5. **7D Win Rate** - 7天胜率排序
6. **7D TXs** - 7天交易次数排序

## 样式设计

- **配色方案**: 黑色背景 + 白色文字 + 绿色(盈利)/红色(亏损)强调
- **布局**: 响应式表格布局，移动端自适应
- **动画效果**: 悬停动画、按钮渐变、数据颜色变化
- **视觉反馈**: 当前排序选项高亮显示

## 数据格式化

- **钱包地址**: 显示前6位和后4位 (例: 99rf...dZsq)
- **金额**: 自动转换为K/M单位 (例: $1.2M, $850.9K)
- **百分比**: 显示带符号的百分比 (例: +46.3%, -15.2%)
- **交易次数**: 显示盈利/亏损交易分解 (例: 1563/1618)

## 部署说明

1. 确保后端API服务正在运行
2. 修改 `src/services/api.js` 中的API地址
3. 运行 `npm run build` 构建生产版本
4. 将 `build/` 目录部署到Web服务器

## 故障排除

### 常见问题

1. **API连接失败**: 检查后端服务是否启动，API地址是否正确
2. **CORS错误**: 确保后端配置了正确的CORS策略
3. **数据不显示**: 检查浏览器控制台是否有错误信息

### 开发调试

```bash
# 查看详细错误信息
npm start

# 检查依赖
npm list

# 清理缓存
npm cache clean --force
```

## 技术支持

如遇到问题，请检查：

1. Node.js和npm版本是否满足要求
2. 所有依赖是否正确安装
3. 后端API是否正常运行
4. 浏览器控制台是否有错误信息
