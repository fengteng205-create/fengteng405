const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const API_KEY = process.env.ZHIPU_API_KEY || '90f74f60613c413b9dd11a255ba0ac30.SvqSaKM1CNCYWd38';
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon'
};

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      if (data.length > 1e6) {
        req.connection.destroy();
        reject(new Error('请求体过大'));
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function serveStatic(req, res) {
  const reqPath = decodeURIComponent(req.url.split('?')[0]);
  const safePath = reqPath === '/' ? '/index.html' : reqPath;
  const filePath = path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(content);
  });
}

async function handleGenerate(req, res) {
  if (!API_KEY) {
    sendJson(res, 500, { error: { message: '服务器未配置智谱 API Key。' } });
    return;
  }

  try {
    const rawBody = await collectBody(req);
    const body = rawBody ? JSON.parse(rawBody) : {};
    const prompt = body.prompt || '';

    if (!prompt) {
      sendJson(res, 400, { error: { message: '缺少 prompt 参数。' } });
      return;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
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
      sendJson(res, response.status, { error: { message: data.error?.message || '模型调用失败' } });
      return;
    }

    const content = data.choices?.[0]?.message?.content || '';
    sendJson(res, 200, { content });
  } catch (error) {
    sendJson(res, 500, { error: { message: error.message || '服务器错误' } });
  }
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/generate')) {
    if (req.method !== 'POST') {
      sendJson(res, 405, { error: { message: '仅支持 POST 请求。' } });
      return;
    }
    handleGenerate(req, res);
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
