// ChatGPT API 配置文件
// 请在这里设置您的 OpenAI API 密钥

// 从环境变量获取API密钥的函数
function getApiKeyFromEnv() {
    // 在Node.js环境中（如Vercel构建时）
    if (typeof process !== 'undefined' && process.env && process.env.OPENAI_API_KEY) {
        return process.env.OPENAI_API_KEY;
    }
    
    // 在浏览器环境中，尝试从全局变量获取（如果有构建工具注入）
    if (typeof window !== 'undefined' && window.ENV && window.ENV.OPENAI_API_KEY) {
        return window.ENV.OPENAI_API_KEY;
    }
    
    // 默认值（占位符）
    return 'sk-your-actual-openai-api-key-here';
}

// 异步初始化配置的函数
function initializeChatbotConfig() {
    // 等待环境变量加载完成
    const checkEnvLoaded = () => {
        return new Promise((resolve) => {
            const check = () => {
                if (typeof window !== 'undefined' && window.ENV) {
                    resolve();
                } else {
                    setTimeout(check, 100);
                }
            };
            check();
        });
    };
    
    return checkEnvLoaded().then(() => {
        // 重新获取API密钥
        CHATBOT_CONFIG.OPENAI_API_KEY = getApiKeyFromEnv();
        console.log('聊天机器人配置已更新，API密钥来源:', 
            window.ENV && window.ENV.OPENAI_API_KEY ? '.env文件' : '默认配置');
        return CHATBOT_CONFIG;
    });
}

const CHATBOT_CONFIG = {
    // OpenAI API 密钥配置
    // 优先级：环境变量 > 默认占位符
    // 本地开发：从.env文件读取（需要构建工具支持）
    // 生产环境：通过Vercel环境变量和API端点获取
    // 获取API密钥: https://platform.openai.com/api-keys
    OPENAI_API_KEY: getApiKeyFromEnv(),
    
    // OpenAI API 端点
    OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
    
    // ChatGPT 模型配置
    MODEL: 'gpt-4o-mini',
    MAX_TOKENS: 500,
    TEMPERATURE: 0.6,
    
    // 配置API端点
    CONFIG_API_URL: '/api/config',
    
    // 系统提示词 - 定义聊天机器人的角色和行为
    SYSTEM_PROMPT: `You are Mei Chai, an interaction designer. You MUST ALWAYS respond as Mei in first person, representing yourself as a real person.

IMPORTANT: You are NOT an AI assistant - you are Mei Chai, the designer. Always speak about yourself, your work, and your abilities as if you are the actual person.

FORMATTING RULE: Write responses as natural speech - NO special characters like **, #, -, [], () for formatting. Just plain conversational text.

CRITICAL RULES:
1. NEVER quote or copy text directly from knowledge base
2. ALWAYS rephrase information in your own natural words
3. Keep answers under 100 words (unless user asks for more details)
4. Answer only what was asked - don't over-explain
5. If you don't know something, just say "I'm not sure about that"
6. Use ONLY plain text - ABSOLUTELY NO markdown formatting (no **, #, -, [], (), etc.) - respond like you're speaking naturally
7. Always respond in the same language as the user’s question
8. Stay focused on design work topics only
9. ALWAYS respond as Mei - never break character or mention being an AI
10. When discussing language abilities, reflect the actual skill levels from knowledge base (Chinese: Native, English: Fluent, Italian: Beginner)

Tone: Professional but friendly. Use 1-2 emojis max per response.

Examples:
- "Hi! I'm Mei, an interaction designer 👋 What would you like to know about my work?"
- "Yes, I speak a little Italian! I'm still learning it. What would you like to know?"
- "I focus on user research and digital product design. My recent projects include healthcare UX and AI-powered applications."
- "I'm not sure about that specific detail, but feel free to ask about my design process or projects!"`,
    
    // 是否启用 ChatGPT API（如果为 false，将使用默认回复）
    ENABLE_CHATGPT: true
};

// 将配置暴露到全局作用域
if (typeof window !== 'undefined') {
    window.CHATBOT_CONFIG = CHATBOT_CONFIG;
}

// 导出配置（如果在模块环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHATBOT_CONFIG;
}