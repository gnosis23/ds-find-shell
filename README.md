# DS Find Shell

一个基于 DeepSeek AI 的 Shell 翻译工具，将自然语言描述转换为可执行的 shell 命令。

## 安装

```bash
npm install -g ds-find-shell
```

## 配置

使用前需要设置 DeepSeek API Key：

```bash
export DEEPSEEK_API_KEY="your-deepseek-api-key"
```

## 使用方法

```bash
ds-find-shell "找到当前目录下最大的文件"
ds-find-shell "列出当前日期，如 2025-07-13 21:00:00"
ds-find-shell "查看系统内存使用情况"
```

## 功能特点

- 🤖 基于 DeepSeek AI 的智能翻译
- 💬 自然语言转 Shell 命令
- 🔒 执行前确认机制
- 📦 轻量级，无额外依赖

## 要求

- Node.js >= 16.0.0
- DeepSeek API Key

## 许可证

MIT
