// ChatGPT API 配置文件
// 请在这里设置您的 OpenAI API 密钥

// 从环境变量获取API密钥的函数
function getApiKeyFromEnv() {
    // 在Node.js环境中（如Vercel构建时）
    if (typeof process !== 'undefined' && process.env && process.env.OPENAI_API_KEY) {
        console.log('✅ 从 Node.js 环境变量获取 API 密钥');
        return process.env.OPENAI_API_KEY;
    }
    
    // 在浏览器环境中，尝试从全局变量获取（通过 env-loader.js 加载）
    if (typeof window !== 'undefined' && window.ENV && window.ENV.OPENAI_API_KEY) {
        console.log('✅ 从浏览器环境变量获取 API 密钥');
        return window.ENV.OPENAI_API_KEY;
    }
    
    // 本地开发环境备用：直接返回 .env 文件中的值
    // 注意：在生产环境中，这个值会被Vercel环境变量覆盖
    const fallbackKey = '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';
    console.log('⚠️ 使用备用 API 密钥（请确保 .env 文件已正确加载）');
    return fallbackKey;
}

// 从API端点获取配置的函数（用于生产环境）
async function getConfigFromApi() {
    try {
        // 首先尝试从API端点获取配置
        let response = await fetch('/api/config');
        
        // 如果API端点返回404或其他错误，尝试从静态JSON文件获取
        if (!response.ok) {
            console.log('API端点不可用，尝试从静态配置文件获取');
            response = await fetch('/api/config.json');
        }
        
        if (response.ok) {
            const config = await response.json();
            console.log('✅ 成功从配置源获取配置');
            return config;
        } else {
            console.log('❌ 配置文件也无法访问');
        }
    } catch (error) {
        console.log('❌ 无法从API获取配置，使用本地配置:', error.message);
    }
    return null;
}

// 异步初始化配置的函数
async function initializeChatbotConfig() {
    // 首先尝试从API端点获取配置（生产环境）
    const apiConfig = await getConfigFromApi();
    
    if (apiConfig && apiConfig.isConfigured) {
        // 使用API返回的配置
        CHATBOT_CONFIG.OPENAI_API_KEY = apiConfig.apiKey;
        CHATBOT_CONFIG.MODEL = apiConfig.model;
        CHATBOT_CONFIG.MAX_TOKENS = apiConfig.maxTokens;
        CHATBOT_CONFIG.TEMPERATURE = apiConfig.temperature;
        CHATBOT_CONFIG.OPENAI_API_URL = apiConfig.apiUrl;
        console.log('✅ 聊天机器人配置已更新，API密钥来源: Vercel环境变量');
        return CHATBOT_CONFIG;
    }
    
    // 如果API不可用，使用本地配置
    CHATBOT_CONFIG.OPENAI_API_KEY = getApiKeyFromEnv();
    
    if (CHATBOT_CONFIG.OPENAI_API_KEY && CHATBOT_CONFIG.OPENAI_API_KEY.startsWith('sk-')) {
        console.log('✅ 聊天机器人配置已更新，API密钥来源: 本地配置');
    } else {
        console.log('❌ 警告：API密钥未正确配置，当前值:', CHATBOT_CONFIG.OPENAI_API_KEY);
    }
    
    return CHATBOT_CONFIG;
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
    
    // 自动初始化配置（在浏览器环境中）
    initializeChatbotConfig().then(() => {
        console.log('聊天机器人配置初始化完成');
    }).catch(error => {
        console.error('聊天机器人配置初始化失败:', error);
    });
}

// 导出配置（如果在模块环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHATBOT_CONFIG;
}