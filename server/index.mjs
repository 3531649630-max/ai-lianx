import http from 'node:http'
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, dirname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))
const PROJECT_DIR = join(rootDir, '..')
const DIST_DIR = join(rootDir, '..', 'web', 'dist')
const PORT = Number(process.env.PORT ?? 4173)
const HOST = process.env.HOST ?? '127.0.0.1'

const envFile = join(PROJECT_DIR, '.env')
if (existsSync(envFile)) {
  for (const rawLine of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const separator = line.indexOf('=')
    if (separator <= 0) continue
    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim()
    if (key && process.env[key] === undefined) process.env[key] = value
  }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

const AI_ENDPOINT = process.env.AI_IMAGE_ENDPOINT?.trim() || ''

const sendJson = (res, status, payload) => {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  })
  res.end(body)
}

const sendFile = (res, path, fallback = false) => {
  let target = normalize(path)
  if (!target.startsWith(DIST_DIR)) {
    sendJson(res, 403, { error: 'forbidden' })
    return
  }

  if (!existsSync(target) || !statSync(target).isFile()) {
    if (fallback) {
      sendFile(res, join(DIST_DIR, 'index.html'), false)
      return
    }
    sendJson(res, 404, { error: 'not found' })
    return
  }

  res.writeHead(200, {
    'Content-Type': MIME[extname(target).toLowerCase()] ?? 'application/octet-stream',
    'Cache-Control': target.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable',
  })
  createReadStream(target).pipe(res)
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? HOST}`)
  const pathname = decodeURIComponent(url.pathname)

  if (pathname === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, {
      ok: true,
      service: 'lookme-backend',
      mode: AI_ENDPOINT ? 'ai-remote' : 'ai-demo',
      time: new Date().toISOString(),
    })
    return
  }

  if (pathname === '/api/ai-preview' && req.method === 'POST') {
    if (AI_ENDPOINT) {
      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        const body = Buffer.concat(chunks)
        const upstream = await fetch(AI_ENDPOINT, {
          method: 'POST',
          headers: {
            'content-type': req.headers['content-type'] ?? 'application/octet-stream',
          },
          body,
          duplex: 'half',
        })
        const upstreamBody = Buffer.from(await upstream.arrayBuffer())
        res.writeHead(upstream.status, {
          'Content-Type': upstream.headers.get('content-type') ?? 'application/octet-stream',
          'Content-Length': upstreamBody.length,
          'Cache-Control': 'no-store',
        })
        res.end(upstreamBody)
      } catch (error) {
        sendJson(res, 502, {
          error: 'AI 图像服务转发失败',
          detail: error instanceof Error ? error.message : 'unknown error',
        })
      }
      return
    }
    sendJson(res, 501, {
      error: 'AI 图像服务未配置',
      hint: '设置环境变量 AI_IMAGE_ENDPOINT 即可转发到真实图像服务；未配置时前端会自动使用演示预览。',
    })
    return
  }

  if (pathname.startsWith('/api/')) {
    sendJson(res, 404, { error: 'api not found' })
    return
  }

  const requested = pathname === '/' ? join(DIST_DIR, 'index.html') : join(DIST_DIR, pathname)
  sendFile(res, requested, !extname(pathname))
})

server.listen(PORT, HOST, () => {
  console.log(`LookMe 已启动：http://${HOST}:${PORT}/`)
})
