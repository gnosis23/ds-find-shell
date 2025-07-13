# Git Summary

一个基于 DeepSeek AI 的 Git 提交记录总结工具。

## 功能

- 获取指定时间范围内的 Git 提交记录
- 使用 DeepSeek API 智能总结工作内容
- 支持中文输出和分析

## 安装

```bash
pnpm install
```

## 使用方法

### 1. 设置 DeepSeek API Key

```bash
export DEEPSEEK_API_KEY="your-api-key-here"
```

### 2. 运行工具

```bash
node index.js 2025-01-01 2025-01-31
```

或者使用 npm script：

```bash
pnpm start 2025-01-01 2025-01-31
```

## 参数说明

- `startDate`: 开始日期，格式为 YYYY-MM-DD
- `endDate`: 结束日期，格式为 YYYY-MM-DD

## 输出内容

1. **Commit 记录**: 显示指定时间范围内的所有提交记录
2. **工作总结**: 使用 DeepSeek AI 生成的智能总结，包括：
   - 主要完成的功能和改进
   - 涉及的技术栈和工具
   - 工作量和时间分布
   - 重要的里程碑或成果

## 示例

```bash
$ node index.js 2025-01-01 2025-01-15

找到 12 个提交记录

=== Commit 记录 ===
2025-01-01: feat: 添加用户认证功能
2025-01-02: fix: 修复登录页面样式问题
2025-01-03: feat: 实现密码重置功能
...

=== 工作总结 ===

根据提交记录，这段时间的主要工作内容如下：

1. **主要完成的功能和改进**
   - 完成了用户认证系统的核心功能
   - 优化了前端界面和用户体验
   - 修复了多个关键性 bug

2. **涉及的技术栈和工具**
   - 前端：React, CSS
   - 后端：Node.js, Express
   - 数据库：MongoDB

...
```

## 依赖

- Node.js 18+
- simple-git
- zod

## 许可证

MIT
