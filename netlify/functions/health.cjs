const AI_ENDPOINT = process.env.AI_IMAGE_ENDPOINT?.trim() || ''

exports.handler = async () => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify({
    ok: true,
    service: 'lookme-backend',
    mode: AI_ENDPOINT ? 'ai-remote' : 'ai-demo',
    time: new Date().toISOString(),
  }),
})
