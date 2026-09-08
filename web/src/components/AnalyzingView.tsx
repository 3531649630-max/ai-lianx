import { useEffect, useState } from 'react'
import type { PhotoKind } from '../types'

interface AnalyzingViewProps {
  kind: PhotoKind
  previewUrl: string
  onDone: () => void
}

const buildSteps = (kind: PhotoKind) => {
  const common = ['接收照片并确认可见度', '定位面部关键点', '测算三庭五眼与轮廓比例', '比对脸型特征库']
  const rest =
    kind === 'fullbody'
      ? ['定位全身骨骼点', '判断体型分类与体态倾向', '匹配妆发 / 训练内容', '生成美学档案']
      : ['匹配妆容与风格方向', '生成美学档案']
  return [...common, ...rest]
}

export default function AnalyzingView({ kind, previewUrl, onDone }: AnalyzingViewProps) {
  const steps = buildSteps(kind)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let current = 0
    const timer = window.setInterval(() => {
      current += 1
      if (current >= steps.length) {
        window.clearInterval(timer)
        setActive(steps.length)
        onDone()
        return
      }
      setActive(current)
    }, 640)
    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const progress = Math.round((Math.min(active, steps.length) / steps.length) * 100)

  return (
    <section id="analysis" className="scroll-mt-16 flex min-h-[calc(100svh-4rem)] items-center py-16 sm:py-24">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[430px] overflow-hidden bg-ink">
          <img src={previewUrl} alt="AI 正在分析的照片" className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/35" />
          <span className="animate-scan absolute inset-x-0 h-[2px] bg-white shadow-[0_0_22px_6px_rgba(255,255,255,0.35)]" />
          <p className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-ink/55 px-3.5 py-1.5 text-xs font-semibold text-paper backdrop-blur">
            <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-clay-300" />
            分析中
          </p>
          <p className="absolute bottom-4 right-4 text-xs font-semibold tracking-[0.16em] text-paper/70">
            {kind === 'fullbody' ? 'FACE + BODY' : 'FACE ANALYSIS'}
          </p>
        </div>

        <div>
          <p className="eyebrow">Analyzing</p>
          <h2 className="mt-4 font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight">
            正在生成你的美学档案
          </h2>
          <p className="mt-3 text-sm text-soft">
            {kind === 'fullbody' ? '脸型 + 身形体态综合分析' : '面部美学分析'} · 约 5 秒
          </p>

          <div className="mt-10">
            <div className="flex items-center justify-between text-xs font-bold tracking-[0.14em] text-soft">
              <span>分析进度</span>
              <span className="text-clay-600">{progress}%</span>
            </div>
            <div className="mt-3 h-px bg-line-strong">
              <div
                className="h-px origin-left bg-clay-600 transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ol className="mt-10 grid gap-0 sm:grid-cols-2 sm:gap-x-12">
            {steps.map((label, index) => {
              const done = index < active
              const isActive = index === active
              return (
                <li
                  key={label}
                  className={`flex items-center gap-3 border-b border-line py-3.5 transition-colors ${
                    done ? 'text-soft' : isActive ? 'text-ink' : 'text-faint/70'
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 flex-none place-items-center rounded-full text-[10px] font-bold ${
                      done
                        ? 'bg-clay-600 text-white'
                        : isActive
                          ? 'border border-clay-500 text-clay-600'
                          : 'border border-line-strong'
                    }`}
                  >
                    {done ? '✓' : String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm">
                    {label}
                    {isActive && <span className="animate-pulse-soft ml-2 inline-block h-1.5 w-1.5 rounded-full bg-clay-500 align-middle" />}
                  </span>
                </li>
              )
            })}
          </ol>

          <p className="mt-6 text-xs leading-6 text-faint">
            照片已载入浏览器内存，分析完成前不会上传 · 演示版结果由内置数据模拟生成
          </p>
        </div>
      </div>
    </section>
  )
}
