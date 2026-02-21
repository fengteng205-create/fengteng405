export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: '仅支持 POST 请求。' } });
    return;
  }

  const apiKey = process.env.ZHIPU_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: { message: '服务器未配置智谱 API Key。' } });
    return;
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    res.status(400).json({ error: { message: '缺少 prompt 参数。' } });
    return;
  }

  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'glm-4-plus',
        messages: [
          {
            role: 'system',
            content: '你是资深电商文案专家，擅长家居类产品的爆款文案生成。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        top_p: 0.9,
        max_tokens: 1200
      })
    });

    const data = await response.json();
    if (!response.ok) {
      res.status(response.status).json({ error: { message: data.error?.message || '模型调用失败' } });
      return;
    }

    const content = data.choices?.[0]?.message?.content || '';
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error: { message: error.message || '服务器错误' } });
  }
}
