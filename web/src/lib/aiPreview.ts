import type { StyleOption } from '../types'

/**
 * AI 形象预览生成入口。
 *
 * 1) 若配置了 VITE_AI_IMAGE_ENDPOINT，会优先调用真实图像生成服务；
 * 2) 接口未配置或调用失败时，自动回退到本地 Canvas 演示预览。
 *
 * 正式接口约定（multipart/form-data）：
 *   photo    – 原图文件
 *   title    – 建议标题，例如「法式慵懒卷」
 *   note     – 建议说明
 *   category – 类别，例如「发型预览」
 *   variant  – 生成变体序号（用于“换一版”）
 *   tags     – 风格标签数组（可重复字段）
 * 响应：返回 image/jpeg|png|webp 二进制，或 JSON { url | imageUrl | previewUrl }
 */

const API_ENDPOINT = import.meta.env.VITE_AI_IMAGE_ENDPOINT as string | undefined

const ACCENTS = [
  '#a94e37',
  '#8c5a3b',
  '#6b5f86',
  '#3f6b5e',
  '#9a6a45',
  '#7e4f62',
]

const hashOf = (input: string) => {
  let hash = 2166136261
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const hexToRgba = (hex: string, alpha: number) => {
  const value = hex.replace('#', '')
  const r = Number.parseInt(value.slice(0, 2), 16)
  const g = Number.parseInt(value.slice(2, 4), 16)
  const b = Number.parseInt(value.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const loadImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('原图无法载入'))
    image.src = url
  })

const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('图片响应解析失败'))
    reader.readAsDataURL(blob)
  })

const requestRemotePreview = async (
  imageUrl: string,
  option: StyleOption,
  category: string,
  variant: number,
) => {
  if (!API_ENDPOINT) throw new Error('no endpoint')

  const source = await fetch(imageUrl)
  if (!source.ok) throw new Error('原图读取失败')
  const form = new FormData()
  form.append('photo', await source.blob(), 'source.jpg')
  form.append('title', option.title)
  form.append('note', option.note)
  form.append('category', category)
  form.append('variant', String(variant))
  option.tags.forEach((tag) => form.append('tags', tag))

  const response = await fetch(API_ENDPOINT, { method: 'POST', body: form })
  if (!response.ok) throw new Error(`图像服务返回 ${response.status}`)

  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.startsWith('image/')) return blobToDataUrl(await response.blob())

  const payload = (await response.json()) as { url?: string; imageUrl?: string; previewUrl?: string }
  const remoteUrl = payload.url ?? payload.imageUrl ?? payload.previewUrl
  if (!remoteUrl) throw new Error('图像服务响应缺少图片地址')
  return remoteUrl
}

const renderDemoPreview = async (
  imageUrl: string,
  option: StyleOption,
  category: string,
  variant: number,
): Promise<string> => {
  const image = await loadImage(imageUrl)
  const width = 1080
  const height = 1350
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('当前浏览器不支持 Canvas 预览')

  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const drawW = image.naturalWidth * scale
  const drawH = image.naturalHeight * scale
  ctx.drawImage(image, (width - drawW) / 2, (height - drawH) * 0.34, drawW, drawH)

  const accent = ACCENTS[(hashOf(option.id) + variant * 3) % ACCENTS.length]

  const bottom = ctx.createLinearGradient(0, height * 0.42, 0, height)
  bottom.addColorStop(0, 'rgba(24, 18, 19, 0)')
  bottom.addColorStop(0.58, 'rgba(24, 18, 19, 0.28)')
  bottom.addColorStop(1, 'rgba(24, 18, 19, 0.84)')
  ctx.fillStyle = bottom
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fillRect(72, 64, 46, 3)
  ctx.font = '700 28px "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillText('LOOKME · AI 形象预览', 72, 120)

  ctx.font = '700 26px "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillStyle = hexToRgba(accent, 1)
  ctx.fillRect(72, height - 390, 8, 66)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.82)'
  ctx.fillText(category, 96, height - 345)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.98)'
  ctx.font = '700 82px "Noto Serif SC", "Songti SC", serif'
  const titleLines = option.title.length > 8 ? `${option.title.slice(0, 7)}…` : option.title
  ctx.fillText(titleLines, 96, height - 240)

  ctx.font = '400 30px "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.74)'
  ctx.fillText(`${option.note.slice(0, 26)}${option.note.length > 26 ? '…' : ''}`, 96, height - 172)

  let tagX = 96
  ctx.font = '500 24px "PingFang SC", "Microsoft YaHei", sans-serif'
  for (const tag of option.tags) {
    const label = `# ${tag}`
    const tagWidth = ctx.measureText(label).width + 40
    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)'
    ctx.beginPath()
    ctx.roundRect(tagX, height - 128, tagWidth, 46, 23)
    ctx.fill()
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)'
    ctx.fillText(label, tagX + 20, height - 98)
    tagX += tagWidth + 16
  }

  ctx.font = '500 22px "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.fillText('演示预览 · 正式版由生成式模型输出', 96, height - 54)

  return canvas.toDataURL('image/jpeg', 0.88)
}

export const renderStylePreview = async (
  imageUrl: string,
  option: StyleOption,
  category: string,
  variant = 0,
): Promise<string> => {
  if (API_ENDPOINT) {
    try {
      return await requestRemotePreview(imageUrl, option, category, variant)
    } catch (error) {
      console.warn('[LookMe] 真实图像服务不可用，已回退到演示预览', error)
    }
  }
  return renderDemoPreview(imageUrl, option, category, variant)
}
