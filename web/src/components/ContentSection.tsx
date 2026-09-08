import { useState } from 'react'
import type { ContentItem, Platform } from '../types'

interface ContentSectionProps {
  title: string
  items: ContentItem[]
  intro?: string
}

const searchUrl = (platform: Platform, query: string) =>
  platform === 'douyin'
    ? `https://www.douyin.com/search/${encodeURIComponent(query)}`
    : `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(query)}`

const platformName: Record<Platform, string> = {
  douyin: '抖音',
  xhs: '小红书',
}

const platformHint: Record<Platform, string> = {
  douyin: 'DOUYIN',
  xhs: 'XIAOHONGSHU',
}

function ContentRow({ item }: { item: ContentItem }) {
  const douyin = item.platform === 'douyin'
  return (
    <a
      href={searchUrl(item.platform, item.query)}
      target="_blank"
      rel="noreferrer"
      className="group grid grid-cols-[112px_1fr] items-center gap-5 border-b border-line py-4 transition-colors hover:bg-cream sm:grid-cols-[138px_1fr] sm:gap-7 sm:py-5"
    >
      <div
        className={`relative grid aspect-[16/11] place-items-center text-[26px] text-paper sm:text-[32px] ${
          douyin ? 'bg-ink' : 'bg-clay-700'
        }`}
      >
        <span aria-hidden>{item.emoji}</span>
        <span className="absolute bottom-2 right-2 text-[10px] font-semibold tracking-wide text-paper/70">
          {item.duration}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-[10.5px] font-bold tracking-[0.18em] text-faint">
          {platformHint[item.platform]} · {item.likes} 喜欢
        </p>
        <h4 className="mt-1.5 truncate text-[15px] font-bold sm:whitespace-normal">{item.title}</h4>
        <p className="mt-1.5 flex items-center justify-between gap-4 text-xs text-soft">
          <span className="truncate">{item.author}</span>
          <span className="hidden shrink-0 text-clay-600 transition-transform group-hover:translate-x-1 sm:inline">
            打开教学 ↗
          </span>
        </p>
      </div>
    </a>
  )
}

export default function ContentSection({ title, items, intro }: ContentSectionProps) {
  const [platform, setPlatform] = useState<Platform>('douyin')
  const visible = items.filter((item) => item.platform === platform)

  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-8 border-t-2 border-ink pt-8">
        <h3 className="font-serif text-2xl font-semibold sm:text-3xl">{title}</h3>
        <div className="inline-flex gap-6 text-sm">
          {(['douyin', 'xhs'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPlatform(key)}
              className={`border-b pb-1 font-semibold transition ${
                platform === key
                  ? 'border-ink text-ink'
                  : 'border-transparent text-faint hover:border-line-strong hover:text-soft'
              }`}
            >
              {platformName[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 border-t border-line">
        {visible.map((item) => (
          <ContentRow key={item.id} item={item} />
        ))}
      </div>

      {intro && <p className="mt-6 text-xs leading-6 text-faint">{intro}</p>}
    </section>
  )
}
