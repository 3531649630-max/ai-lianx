export default async function handler(req, res) {
  const AI_ENDPOINT = process.env.AI_IMAGE_ENDPOINT?.trim() || ''
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.statusCode = 200
  res.end(
    JSON.stringify({
      ok: true,
      service: 'lookme-backend',
      mode: AI_ENDPOINT ? 'ai-remote' : 'ai-demo',
      time: new Date().toISOString(),
    }),
  )
}
