export type PhotoKind = 'face' | 'fullbody'

export type Platform = 'douyin' | 'xhs'

export interface Metric {
  label: string
  value: string
  score: number
}

export interface ContentItem {
  id: string
  platform: Platform
  title: string
  author: string
  duration: string
  likes: string
  emoji: string
  query: string
}

export interface PostureCheck {
  name: string
  desc: string
  score: number
}

export interface StyleOption {
  id: string
  title: string
  note: string
  tags: string[]
}

export interface FaceAnalysis {
  id: string
  name: string
  enName: string
  blurb: string
  summary: string
  metrics: Metric[]
  pros: string[]
  tweaks: string[]
  keywords: string[]
  advice: string[]
  contents: ContentItem[]
  hairstyles: StyleOption[]
}

export interface BodyAnalysis {
  id: string
  name: string
  enName: string
  blurb: string
  summary: string
  metrics: Metric[]
  traits: string[]
  postures: PostureCheck[]
  keywords: string[]
  advice: string[]
  contents: ContentItem[]
  outfits: StyleOption[]
}

export interface AnalysisReport {
  kind: PhotoKind
  seed: number
  face: FaceAnalysis
  body: BodyAnalysis | null
}

export interface PreviewFile {
  name: string
  type: string
  size: number
  width: number
  height: number
  previewUrl: string
}

export interface UploadSelection {
  file: PreviewFile
  kind: PhotoKind
}
