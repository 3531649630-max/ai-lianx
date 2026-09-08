import { useState } from 'react'
import { renderStylePreview } from '../lib/aiPreview'
import type { StyleOption } from '../types'

interface StyleStudioProps {
  category: string
  enCategory: string
  title: string
  intro: string
  options: StyleOption[]
  imageUrl?: string
}

interface PreviewResult {
  option: StyleOption
  url: string
}

export default function StyleStudio({
  category,
  enCategory,
  title,
  intro,
  options,
  imageUrl,
}: StyleStudioProps) {
  const [result, setResult] = useState<PreviewResult | null>(null)
  const [generatingId, setGeneratingId] = useState<string | null>(null)
  const [chosenId, setChosenId] = useState('')
  const [error, setError] = useState('')
  const [variant, setVariant] = useState(0)

  const generate = async (option: StyleOption, currentVariant = variant) => {
    if (!imageUrl) {
      setError('缺少原图，无法生成预览。')
      return
    }
    setError('')
    setGeneratingId(option.id)
    setVariant(currentVariant + 1)
    window.setTimeout(async () => {
      try {
        const url = await renderStylePreview(imageUrl, option, enCategory, currentVariant)
        setResult({ option, url })
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : '生成失败，请重试')
      } finally {
        setGeneratingId(null)
      }
    }, 1100)
  }

  const activeResult = result

  return (
    <section className="mt-24">
      <header className="border-t-2 border-ink pt-8">
        <p className="eyebrow">{category}</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h3 className="max-w-[640px] font-serif text-2xl font-semibold sm:text-3xl">{title}</h3>
          <p className="max-w-xs text-sm leading-6 text-soft">{intro}</p>
        </div>
      </header>

      <ol className="mt-6">
        {options.map((option, index) => {
          const busy = generatingId === option.id
          return (
            <li
              key={option.id}
              className="grid items-center gap-5 border-b border-line py-6 sm:grid-cols-[3.5rem_1fr_auto]"
            >
              <span className="hidden font-serif text-xl text-clay-600 sm:block">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h4 className="text-lg font-bold">{option.title}</h4>
                  {chosenId === option.id && (
                    <span className="text-xs font-bold text-clay-600">已采用</span>
                  )}
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-soft">{option.note}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-faint">
                  {option.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => void generate(option)}
                disabled={busy}
                className={`w-fit rounded-full border px-5 py-2.5 text-[13px] font-semibold transition ${
                  busy
                    ? 'cursor-wait border-line-strong text-faint'
                    : 'border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper'
                }`}
              >
                {busy ? '生成中…' : '生成 AI 预览'}
              </button>
            </li>
          )
        })}
      </ol>

      {activeResult && (
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-ink">
            <img
              src={activeResult.url}
              alt={`${activeResult.option.title} AI 形象预览`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center py-2">
            <p className="eyebrow">AI preview</p>
            <h4 className="mt-4 font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight">
              {activeResult.option.title}
            </h4>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-soft">
              {activeResult.option.note}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {activeResult.option.tags.map((tag) => (
                <span key={tag} className="border-b border-ink/30 pb-0.5 text-[13px] font-semibold">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setChosenId(activeResult.option.id)}
                className={`rounded-full px-6 py-3 text-sm font-bold transition ${
                  chosenId === activeResult.option.id
                    ? 'bg-clay-600 text-white'
                    : 'bg-ink text-paper hover:bg-clay-700'
                }`}
              >
                {chosenId === activeResult.option.id ? '✓ 已选择这张' : '选择这张'}
              </button>
              <a
                href={activeResult.url}
                download={`lookme-${activeResult.option.id}.jpg`}
                className="rounded-full border border-ink/25 px-6 py-3 text-sm font-semibold transition hover:border-ink"
              >
                下载预览
              </a>
              <button
                type="button"
                onClick={() => void generate(activeResult.option, variant)}
                disabled={generatingId === activeResult.option.id}
                className="text-sm font-semibold text-soft underline-offset-4 transition hover:text-clay-600 hover:underline"
              >
                换一版
              </button>
            </div>

            <p className="mt-8 max-w-xl border-t border-line pt-5 text-xs leading-6 text-faint">
              演示版预览在浏览器本地生成，照片不会上传。正式版将根据该建议的文案与关键词调用生成式模型，输出可直接使用的形象图。
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-6 border border-clay-300 bg-clay-50 px-5 py-3.5 text-sm text-clay-700">{error}</p>
      )}
    </section>
  )
}
