const AI_ENDPOINT = process.env.AI_IMAGE_ENDPOINT?.trim() || ''

const sendJson = (statusCode, payload) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(payload),
})

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return sendJson(405, { error: 'method not allowed' })

  if (!AI_ENDPOINT) {
    return sendJson(501, {
      error: 'AI 图像服务未配置',
      hint: '在 Netlify 环境变量中添加 AI_IMAGE_ENDPOINT 后即可转发到真实图像服务。',
    })
  }

  try {
    const body = event.isBase64Encoded
      ? Buffer.from(event.body ?? '', 'base64')
      : Buffer.from(event.body ?? '', 'utf8')

    const upstream = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': event.headers['content-type'] ?? 'application/octet-stream',
      },
      body,
      duplex: 'half',
    })
    const upstreamBody = Buffer.from(await upstream.arrayBuffer())

    return {
      statusCode: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') ?? 'application/octet-stream',
        'Cache-Control': 'no-store',
      },
      body: upstreamBody.toString('base64'),
      isBase64Encoded: true,
    }
  } catch (error) {
    return sendJson(502, {
      error: 'AI 图像服务转发失败',
      detail: error instanceof Error ? error.message : 'unknown error',
    })
  }
}
