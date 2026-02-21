const axios = require('axios');

const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY || '90f74f60613c413b9dd11a255ba0ac30.SvqSaKM1CNCYWd38';

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { schoolName, painPoint, template } = req.body;

        if (!schoolName || !painPoint) {
            return res.status(400).json({ error: '缺少必要参数' });
        }

        const prompt = `你是一个海报设计专家。请根据以下信息生成一个招生引流海报的文案：

学校名称：${schoolName}
痛点关键词：${painPoint}

请生成海报上下的文字内容：
1. 顶部文字（针对痛点的吸引人的 slogan，10-20字）
2. 底部学校名称

请用JSON格式返回：
{
    "topText": "顶部 slogan",
    "bottomText": "学校名称"
}`;

        const response = await axios.post(
            'https://open.bigmodel.cn/api/paas/v4/chat/completions',
            {
                model: 'glm-4',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.8
            },
            {
                headers: {
                    'Authorization': `Bearer ${ZHIPU_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 60000
            }
        );

        const content = response.data.choices[0].message.content;
        let result;
        try {
            result = JSON.parse(content);
        } catch {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            result = jsonMatch ? JSON.parse(jsonMatch[0]) : { topText: painPoint, bottomText: schoolName };
        }

        res.json(result);
    } catch (error) {
        console.error('智谱AI调用失败:', error.response?.data || error.message);
        res.status(500).json({ error: 'AI生成失败', details: error.message });
    }
};
