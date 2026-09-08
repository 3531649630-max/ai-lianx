import type { AnalysisReport, BodyAnalysis, FaceAnalysis } from '../types'
import ContentSection from './ContentSection'
import Metrics from './Metrics'
import StyleStudio from './StyleStudio'

interface ReportViewProps {
  report: AnalysisReport
  imageUrl?: string
  onRestart: () => void
}

function Verdict({
  eyebrow,
  name,
  enName,
  blurb,
  tags,
}: {
  eyebrow: string
  name: string
  enName: string
  blurb: string
  tags: string[]
}) {
  return (
    <article className="animate-rise py-7 sm:px-8">
      <p className="eyebrow">{eyebrow}</p>
      <h3 className="mt-5 font-serif text-[clamp(2rem,5vw,3.1rem)] font-semibold leading-tight">{name}</h3>
      <p className="mt-1.5 text-[13px] tracking-[0.08em] text-faint">{enName}</p>
      <p className="mt-5 max-w-[480px] text-sm leading-7 text-soft">{blurb}</p>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {tags.map((tag) => (
          <span key={tag} className="border-b border-ink/30 pb-0.5 text-[13px] font-semibold">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

function FeatureList({ title, items, positive = true }: { title: string; items: string[]; positive?: boolean }) {
  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-soft">{title}</h4>
      <ul className="mt-5 border-t border-line">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 border-b border-line py-3.5 text-sm leading-6">
            <span
              className={`mt-[3px] text-xs font-bold ${positive ? 'text-clay-600' : 'text-faint'}`}
              aria-hidden
            >
              {positive ? '＋' : '·'}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function KeywordLinks({ keywords }: { keywords: string[] }) {
  return (
    <div className="mt-12">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-soft">可参考的搜索方向</h4>
      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-5">
        {keywords.map((keyword) => (
          <a
            key={keyword}
            href={`https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(keyword)}`}
            target="_blank"
            rel="noreferrer"
            className="group border-b border-transparent pb-0.5 text-sm font-medium text-soft transition hover:border-clay-500 hover:text-clay-700"
          >
            #{keyword.replace('教程', '')}
            <span className="ml-1.5 text-faint transition group-hover:translate-x-0.5">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function FaceDetail({ face }: { face: FaceAnalysis }) {
  return (
    <article>
      <div className="flex items-baseline justify-between gap-6 border-b-2 border-ink pb-5">
        <div>
          <p className="eyebrow">Face analysis</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">脸型拆解</h3>
        </div>
        <span className="text-xs font-bold tracking-[0.14em] text-soft">面部美学</span>
      </div>

      <p className="mt-7 border-l-2 border-clay-500 pl-5 text-sm leading-7">{face.summary}</p>
      <div className="mt-10">
        <Metrics metrics={face.metrics} />
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <FeatureList title="你的面部优势" items={face.pros} />
        <FeatureList title="修饰重点" items={face.tweaks} positive={false} />
      </div>
      <KeywordLinks keywords={face.keywords} />
    </article>
  )
}

function BodyDetail({ body }: { body: BodyAnalysis }) {
  return (
    <article>
      <div className="flex items-baseline justify-between gap-6 border-b-2 border-ink pb-5">
        <div>
          <p className="eyebrow">Body analysis</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">身形与体态拆解</h3>
        </div>
        <span className="text-xs font-bold tracking-[0.14em] text-soft">体态健康</span>
      </div>

      <p className="mt-7 border-l-2 border-clay-500 pl-5 text-sm leading-7">{body.summary}</p>
      <div className="mt-10">
        <Metrics metrics={body.metrics} />
      </div>

      <div className="mt-12">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-soft">体型特征</h4>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
          {body.traits.map((trait) => (
            <li key={trait} className="text-sm font-medium">
              {trait}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-soft">体态倾向 · 演示估算</h4>
          <span className="text-[11px] leading-5 text-faint">仅作参考，不构成健康诊断</span>
        </div>
        <ul className="mt-5 border-t border-line">
          {body.postures.map((posture) => (
            <li key={posture.name} className="py-5">
              <div className="flex items-baseline justify-between gap-6">
                <div>
                  <p className="text-[15px] font-bold">{posture.name}</p>
                  <p className="mt-1 text-xs leading-5 text-soft">{posture.desc}</p>
                </div>
                <p className="whitespace-nowrap text-xs font-bold text-soft">
                  需关注 <span className="text-clay-600">{posture.score}%</span>
                </p>
              </div>
              <div className="mt-3 h-1 bg-line">
                <div
                  className="meter-fill h-1 bg-clay-600"
                  style={{ width: `${posture.score}%`, animationDelay: '0.3s' }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function Advice({ report }: { report: AnalysisReport }) {
  const advice = [...report.face.advice, ...(report.body?.advice ?? [])]
  return (
    <section className="mt-20">
      <div className="flex items-end justify-between gap-6 border-t-2 border-ink pt-8">
        <div>
          <p className="eyebrow">Action plan</p>
          <h3 className="mt-2 font-serif text-3xl font-semibold">给你的行动建议</h3>
        </div>
        <p className="hidden max-w-[260px] pb-1 text-right text-xs leading-5 text-soft sm:block">
          按优先级从易到难，建议收藏后逐条实践。
        </p>
      </div>
      <ol className="mt-4">
        {advice.map((item, index) => (
          <li key={item} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-5 border-b border-line py-5 sm:grid-cols-[4.5rem_1fr]">
            <span className="font-serif text-2xl text-clay-600">{String(index + 1).padStart(2, '0')}</span>
            <p className="text-[15px] leading-7">{item}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function ReportView({ report, imageUrl, onRestart }: ReportViewProps) {
  const { face, body } = report
  const faceTags = face.keywords.slice(0, 3)
  const bodyTags = body ? body.traits.slice(0, 3) : []

  return (
    <section id="analysis" className="scroll-mt-16 py-16 sm:py-24">
      <div className="shell">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-8">
          <div className="flex items-center gap-5">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="本次分析的照片"
                className="h-20 w-16 object-cover"
              />
            )}
            <div>
              <p className="eyebrow">Your report</p>
              <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-none">
                美学档案
              </h1>
              <p className="mt-3 text-sm text-soft">
                {report.kind === 'fullbody' ? '脸型 + 身形综合分析' : '脸型分析'} · 演示报告
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-full border border-ink/30 px-5 py-2.5 text-sm font-semibold transition hover:border-ink hover:bg-ink hover:text-paper"
          >
            ↺ 重新上传照片
          </button>
        </header>

        <div className="mt-8 grid sm:grid-cols-2 sm:divide-x sm:divide-line-strong">
          <Verdict
            eyebrow="Face shape · 脸型判定"
            name={face.name}
            enName={face.enName}
            blurb={face.blurb}
            tags={faceTags}
          />
          {body && (
            <Verdict
              eyebrow="Body shape · 身形判定"
              name={body.name}
              enName={body.enName}
              blurb={body.blurb}
              tags={bodyTags}
            />
          )}
        </div>

        <div className={`mt-16 grid gap-20 ${body ? 'lg:grid-cols-2 lg:gap-16' : ''}`}>
          <FaceDetail face={face} />
          {body && <BodyDetail body={body} />}
        </div>

        <StyleStudio
          category="Hair · 发型建议"
          enCategory="发型预览"
          title="根据你的脸型，先试这几个发型方向"
          intro="建议不只是“换发型”，而是围绕你的轮廓比例选择长度、卷度与刘海走向。选中任意一条即可生成 AI 预览。"
          options={face.hairstyles}
          imageUrl={imageUrl}
        />

        {body && (
          <StyleStudio
            category="Outfit · 穿搭建议"
            enCategory="穿搭预览"
            title="按你的身形比例，搭配这些方向"
            intro="每一组都按你的体型分类给出版型与搭配逻辑，选中任意一套即可生成 AI 预览。"
            options={body.outfits}
            imageUrl={imageUrl}
          />
        )}

        <div className="mt-24">
          <ContentSection
            title={body ? '同脸型化妆教学推荐' : '适合你的化妆教学内容推荐'}
            items={face.contents}
            intro="演示内容：正式版将按「脸型 + 搜索词」实时检索抖音 / 小红书相似教学。"
          />
          {body && (
            <ContentSection
              title="同身形健身与体态博主推荐"
              items={body.contents}
              intro="演示版仅展示结构。正式版会匹配同类型健身与体态矫正博主，并对博主内容做人工审核。"
            />
          )}
          <Advice report={report} />
        </div>
      </div>
    </section>
  )
}
