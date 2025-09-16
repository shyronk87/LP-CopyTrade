#!/bin/bash

# LP盈利排行榜前端部署脚本
set -e

echo "开始部署LP盈利排行榜前端..."

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "错误: Node.js未安装"
    exit 1
fi

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "错误: npm未安装"
    exit 1
fi

# 安装依赖
echo "安装依赖..."
npm install

# 构建生产版本
echo "构建生产版本..."
npm run build

# 检查构建结果
if [ -d "build" ]; then
    echo "构建成功！"
    echo "构建文件位于: build/ 目录"
    echo
    echo "部署步骤："
    echo "1. 将 build/ 目录内容复制到Web服务器根目录"
    echo "2. 配置Nginx或Apache指向 build/ 目录"
    echo "3. 确保后端服务在 localhost:3000 运行"
else
    echo "构建失败！"
    exit 1
fi