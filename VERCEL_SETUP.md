# Vercel 部署配置指南

## OpenAI API Key 配置

为了在 Vercel 中正确配置 OpenAI API Key，请按照以下步骤操作：

### 1. 获取 OpenAI API Key
1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 登录您的 OpenAI 账户
3. 创建新的 API Key 或使用现有的 Key
4. 复制 API Key（格式类似：`sk-...`）

### 2. 在 Vercel 中配置环境变量

#### 方法一：通过 Vercel Dashboard
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 进入 **Settings** 标签页
4. 点击左侧菜单中的 **Environment Variables**
5. 添加新的环境变量：
   - **Name**: `OPENAI_API_KEY`
   - **Value**: 您的 OpenAI API Key（以 `sk-` 开头）
   - **Environments**: 选择 `Production`, `Preview`, 和 `Development`
6. 点击 **Save**

#### 方法二：通过 Vercel CLI
```bash
# 安装 Vercel CLI（如果还没有安装）
npm i -g vercel

# 登录 Vercel
vercel login

# 在项目目录中设置环境变量
vercel env add OPENAI_API_KEY
# 然后输入您的 OpenAI API Key
```

### 3. 重新部署
配置环境变量后，需要重新部署项目：

```bash
# 触发新的部署
vercel --prod
```

或者在 Vercel Dashboard 中点击 **Redeploy** 按钮。

### 4. 验证配置
部署完成后，访问您的网站并测试聊天机器人功能，确认 OpenAI API 正常工作。

## 本地开发配置

对于本地开发，您可以：

1. 在项目根目录创建 `.env` 文件
2. 添加以下内容：
   ```
   OPENAI_API_KEY=your-actual-openai-api-key-here
   ```
3. 将 `your-actual-openai-api-key-here` 替换为您的真实 API Key

**注意**: `.env` 文件已被添加到 `.gitignore` 中，不会被提交到代码仓库。

## 技术实现说明

### API 配置方式
本项目使用 Vercel Serverless Functions 来安全地处理 OpenAI API Key：

1. **配置API端点**: `/api/config.js` - 从环境变量中读取 API Key 并安全地提供给前端
2. **前端配置加载**: `chatbot-iframe.html` 在初始化时自动从 API 端点获取配置
3. **本地开发**: 可以直接在 `chatbot-config.js` 中设置 API Key 进行测试

### 安全性
- API Key 不会直接暴露在前端代码中
- 通过服务器端 API 安全地传递配置信息
- 支持 CORS 以允许跨域访问

## 故障排除

### 常见问题
1. **聊天机器人显示配置错误信息**
   - 检查环境变量名称是否正确：`OPENAI_API_KEY`
   - 确认 API Key 格式正确（以 `sk-` 开头）
   - 重新部署项目
   - 检查 `/api/config` 端点是否正常工作

2. **API 调用失败**
   - 检查 OpenAI 账户余额
   - 确认 API Key 有效且未过期
   - 检查 API Key 权限设置
   - 查看浏览器开发者工具的网络请求

3. **环境变量未生效**
   - 确保在所有环境（Production, Preview, Development）中都设置了变量
   - 重新部署项目
   - 清除浏览器缓存
   - 访问 `https://your-domain.com/api/config` 检查配置API

4. **配置API无法访问**
   - 确认 `api/config.js` 文件已正确部署
   - 检查 Vercel Functions 日志
   - 确认域名和路径正确

如果问题仍然存在，请检查 Vercel 的部署日志和 Functions 日志获取更多信息。