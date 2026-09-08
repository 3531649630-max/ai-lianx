const steps = [
  {
    num: '01',
    title: '上传一张照片',
    desc: '正面头像照分析脸型；全身照会继续分析身形与体态。照片仅在浏览器本地处理。',
  },
  {
    num: '02',
    title: 'AI 拆解轮廓与比例',
    desc: '测算三庭五眼、下颌与颧骨轮廓并判定脸型；全身照再给出体型分类与体态倾向。',
  },
  {
    num: '03',
    title: '匹配真正适合你的内容',
    desc: '按分析结果生成关键词，推荐抖音 / 小红书上同脸型、同体型的化妆教学与训练博主。',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-16 border-b border-line bg-cream">
      <div className="shell py-20 sm:py-28">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-[640px]">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 font-serif text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-tight">
              三步，得到你的美学档案
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-soft lg:pb-2">
            不做“千人一面”的模板判断。每一步都围绕你的真实轮廓与比例给出依据。
          </p>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-3">
          {steps.map((step) => (
            <article key={step.num} className="animate-rise border-t border-ink/25 pt-6">
              <p className="font-serif text-sm tracking-[0.18em] text-clay-600">{step.num}</p>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 max-w-[330px] text-sm leading-7 text-soft">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
