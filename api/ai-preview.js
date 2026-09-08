const AI_ENDPOINT = process.env.AI_IMAGE_ENDPOINT?.trim() || ''

const readBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })

const sendJson = (res, status, payload) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.statusCode = status
  res.end(JSON.stringify(payload))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'method not allowed' })
    return
  }

  if (!AI_ENDPOINT) {
    sendJson(res, 501, {
      error: 'AI 图像服务未配置',
      hint: '在 Vercel 环境变量中添加 AI_IMAGE_ENDPOINT 后即可转发到真实图像服务。',
    })
    return
  }

  try {
    const body = await readBody(req)
    const upstream = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': req.headers['content-type'] ?? 'application/octet-stream',
      },
      body,
      duplex: 'half',
    })
    const upstreamBody = Buffer.from(await upstream.arrayBuffer())
    res.statusCode = upstream.status
    res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'application/octet-stream')
    res.setHeader('Cache-Control', 'no-store')
    res.end(upstreamBody)
  } catch (error) {
    sendJson(res, 502, {
      error: 'AI 图像服务转发失败',
      detail: error instanceof Error ? error.message : 'unknown error',
    })
  }
}
