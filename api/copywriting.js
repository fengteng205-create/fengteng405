const axios = require('axios');

const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY || '90f74f60613c413b9dd11a255ba0ac30.SvqSaKM1CNCYWd38';

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { schoolName, topicType, schoolAdvantage } = req.body;

        if (!schoolName || !topicType || !schoolAdvantage) {
            return res.status(400).json({ error: '缺少必要参数' });
        }

        const topicTypes = {
            '招生引流': '招生引流类短视频文案',
            '家长必看': '家长必看类短视频文案',
            '干货分享': '干货分享类短视频文案',
            '学员案例': '学员案例类短视频文案',
            '热点结合': '热点结合类短视频文案'
        };

        const prompt = `你是一个专业的教育培训行业短视频文案专家。请根据以下信息生成一个爆款短视频文案：

学校名称：${schoolName}
学校优势：${schoolAdvantage}
选题类型：${topicTypes[topicType] || topicType}

请生成以下内容：
1. 标题（生成3个吸引眼球的标题）
2. 开场白钩子（3-5秒吸引观众继续看下去的话术）
3. 脚本结构文案（300-500字的口播文案，包含开场、主体内容、结尾）
4. 结尾钩子（引导关注、点赞、评论的话术）
5. 关键词标签（5-8个热门标签）

请用JSON格式返回，格式如下：
{
    "titles": ["标题1", "标题2", "标题3"],
    "openingHook": "开场白钩子内容",
    "scriptContent": "脚本结构文案内容",
    "endingHook": "结尾钩子内容",
    "tags": ["#标签1", "#标签2", "#标签3", "#标签4", "#标签5"]
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
                temperature: 0.8,
                top_p: 0.9
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
        } catch (parseError) {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                result = JSON.parse(jsonMatch[0]);
            } else {
                return res.status(500).json({ error: 'AI返回格式解析失败' });
            }
        }

        res.json(result);
    } catch (error) {
        console.error('智谱AI调用失败:', error.response?.data || error.message);
        res.status(500).json({ error: 'AI生成失败，请稍后重试', details: error.message });
    }
};
