# 环境变量配置指南

本项目支持通过 `.env` 文件配置 OpenAI API 密钥，提供更安全和便捷的配置方式。

## 📋 配置步骤

### 1. 本地开发环境配置

#### 方法一：使用 .env 文件（推荐）

1. 确保项目根目录下有 `.env` 文件
2. 在 `.env` 文件中设置您的 API 密钥：
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   ```
3. 保存文件并刷新浏览器

#### 方法二：直接修改配置文件

1. 打开 `chatbot-config.js` 文件
2. 找到 `OPENAI_API_KEY` 配置项
3. 将占位符替换为您的真实 API 密钥

### 2. 生产环境配置（Vercel）

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 进入 Settings → Environment Variables
4. 添加新的环境变量：
   - **Name**: `OPENAI_API_KEY`
   - **Value**: 您的 OpenAI API 密钥
   - **Environment**: Production (或 All)
5. 点击 "Save"
6. 重新部署项目

## 🔧 技术实现

### 配置优先级

1. **生产环境**: Vercel 环境变量 → API 端点
2. **本地开发**: .env 文件 → chatbot-config.js 默认值

### 工作原理

1. `env-loader.js` 负责加载 `.env` 文件并将环境变量注入到全局作用域
2. `chatbot-config.js` 中的 `getApiKeyFromEnv()` 函数按优先级获取 API 密钥
3. `initializeChatbotConfig()` 异步初始化配置，确保环境变量正确加载

## 🛠️ 故障排除

### 常见问题

1. **API 密钥未生效**
   - 检查 `.env` 文件格式是否正确
   - 确保没有多余的空格或引号
   - 刷新浏览器缓存

2. **控制台错误信息**
   - 打开浏览器开发者工具查看控制台日志
   - 查看配置加载状态和错误信息

3. **生产环境问题**
   - 确认 Vercel 环境变量已正确设置
   - 检查是否已重新部署
   - 使用 `/config-test.html` 诊断工具测试

### 诊断工具

访问 `http://localhost:8000/config-test.html` 或您的域名 + `/config-test.html` 来测试配置状态。

## 🔒 安全注意事项

1. **永远不要**将 API 密钥提交到 Git 仓库
2. `.env` 文件已添加到 `.gitignore` 中
3. 生产环境使用 Vercel 环境变量，不会暴露在客户端代码中
4. 定期轮换您的 API 密钥

## 📞 获取帮助

如果您在配置过程中遇到问题，请：

1. 查看浏览器控制台的错误信息
2. 使用配置诊断工具进行测试
3. 联系技术支持：flyskytoo@outlook.com

---

**获取 OpenAI API 密钥**: https://platform.openai.com/api-keys