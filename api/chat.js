// Vercel Serverless Function for Chat API
// 接入 ChatGPT 4o-mini API
// Vercel environment has built-in fetch, no import needed

export default async function handler(req, res) {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;

    // 调试信息：检查请求体
    console.log('Request method:', req.method);
    console.log('Request body:', req.body);
    console.log('Messages:', messages);

    // 直接使用前端传来的消息（包含系统提示词）
    const chatHistory = messages;

    // 调试信息：检查环境变量
    console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
    console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
    
    // 调用 ChatGPT 4o-mini API
    try {
        if (process.env.OPENAI_API_KEY) {
            const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: chatHistory,
                    max_tokens: 500,
                    temperature: 0.6
                })
            });

            if (gptResponse.ok) {
                const data = await gptResponse.json();
                return res.status(200).json(data);
            } else {
                console.error('GPT API error:', await gptResponse.text());
                return res.status(500).json({ error: 'GPT API call failed' });
            }
        } else {
            return res.status(500).json({ error: 'OpenAI API key not configured' });
        }
    } catch (e) {
        console.error('GPT API request failed:', e);
        return res.status(500).json({ error: 'GPT API request failed' });
    }
}