# API 密钥配置指南

本指南将帮助您在本地开发环境和 Vercel 生产环境中配置聊天机器人所需的 OpenAI API 密钥。

## 🔑 获取 OpenAI API 密钥

1. 访问 [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. 登录您的 OpenAI 账户
3. 点击 "Create new secret key"
4. 复制生成的 API 密钥（格式：sk-proj-...）
5. **重要**：确保您的账户有足够的使用额度

## 💻 本地开发环境配置

### 步骤 1：创建本地环境变量文件

```bash
# 复制示例文件
cp .env.local.example .env.local
```

### 步骤 2：配置 API 密钥

编辑 `.env.local` 文件：

```bash
# 将 your-api-key-here 替换为真实的 OpenAI API 密钥
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
```

### 步骤 3：重启本地服务器

```bash
# 停止当前服务器（Ctrl+C）
# 重新启动
vercel dev
```

## ☁️ Vercel 生产环境配置

### 🚨 重要提醒

生产环境采用**后台服务架构**，所有 API 密钥配置都通过 Vercel 环境变量管理。<mcreference link="https://vercel.com/docs/integrations/ai/openai" index="3">3</mcreference>

### 1. 在 Vercel Dashboard 中设置环境变量

<mcreference link="https://vercel.com/docs/integrations/ai/openai" index="3">3</mcreference> Vercel 默认使用 `OPENAI_API_KEY` 环境变量：

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目 `meichai-net`
3. 进入 **Settings** → **Environment Variables**
4. 添加新的环境变量：
   - **Name**: `OPENAI_API_KEY`
   - **Value**: 您的 OpenAI API 密钥（以 `sk-` 开头）
   - **Environment**: 选择 `Production`（和 `Preview`、`Development` 如果需要）
5. 点击 **Save**

⚠️ **重要**：<mcreference link="https://vercel.com/docs/integrations/ai/openai" index="3">3</mcreference> 始终保持 API 密钥机密，不要在客户端代码中暴露它们，使用 Vercel 环境变量进行安全存储。

### 2. 重新部署项目

### 3. 重新部署项目

设置环境变量后，需要重新部署项目：

```bash
vercel --prod
```

或者在 Vercel Dashboard 中点击 **Redeploy**。

### 4. 验证配置

部署完成后，访问你的网站：
- 生产环境：`https://your-domain.vercel.app/`
- 测试聊天机器人功能，确认 API 密钥配置正确

## 🏗️ 架构说明

### 配置流程
```
Vercel 环境变量 → /api/config 端点 → 前端聊天机器人
```

### 文件结构
- **`/api/config.js`**: 后台服务，安全地提供 API 配置
- **`chatbot-config.js`**: 前端配置管理，从后台服务获取配置
- **`chatbot-iframe.html`**: 聊天机器人界面

## 🔒 安全特性

- ✅ API 密钥完全存储在服务器端
- ✅ 前端代码不包含任何敏感信息
- ✅ 通过 HTTPS 安全传输
- ✅ 支持 CORS 跨域访问控制

## 🛠️ 故障排除

### 常见问题

1. **聊天机器人显示配置指导信息**
   - 检查 Vercel 环境变量是否正确设置
   - 确认项目已重新部署
   - 访问 `/api/config` 端点检查配置状态

2. **API 调用失败**
   - 确保 API 密钥格式正确（以 `sk-` 开头）
   - 检查 API 密钥是否有足够余额
   - 查看浏览器控制台错误信息

3. **本地开发环境**
   - 本地开发需要通过 Vercel 部署的 `/api/config` 端点获取配置
   - 或者临时在 `chatbot-config.js` 中硬编码 API 密钥进行测试

### 调试步骤

1. 打开浏览器开发者工具
2. 查看控制台日志
3. 检查网络请求到 `/api/config` 的响应
4. 确认配置验证信息

## 📞 技术支持

如果遇到配置问题：
1. 检查 Vercel 环境变量设置
2. 确认项目重新部署
3. 查看浏览器控制台错误
4. 联系技术支持：flyskytoo@outlook.com

---

**注意**: 这个项目已经移除了所有本地环境变量配置，完全采用后台服务架构以确保安全性。