// Vercel Serverless Function to provide chatbot configuration
// This function safely exposes the OpenAI API key from environment variables

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  try {
    // Get OpenAI API key from environment variables
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    // Check if API key is configured
    const isConfigured = openaiApiKey && openaiApiKey !== 'your-openai-api-key-here';
    
    // Return configuration (without exposing the actual API key)
    res.status(200).json({
      isConfigured: isConfigured,
      apiKey: isConfigured ? openaiApiKey : null,
      model: 'gpt-4o-mini',
      maxTokens: 500,
      temperature: 0.6,
      apiUrl: 'https://api.openai.com/v1/chat/completions'
    });
  } catch (error) {
    console.error('Config API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}