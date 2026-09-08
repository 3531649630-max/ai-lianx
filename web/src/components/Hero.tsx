export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden border-b border-line bg-ink lg:items-center"
    >
      <img
        src="/images/hero-portrait.jpg"
        alt="用于美学分析演示的人像大片"
        className="absolute inset-0 h-full w-full object-cover object-[72%_28%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/20 lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/55 lg:to-ink/10" />

      <div className="shell relative z-10 py-16 sm:py-20 lg:py-0">
        <div className="max-w-[640px] text-paper">
          <p
            className="animate-rise text-[0.72rem] font-bold uppercase tracking-[0.24em] text-clay-200"
            style={{ animationDelay: '80ms' }}
          >
            LookMe · AI 美学分析
          </p>
          <h1
            className="animate-rise mt-5 font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.08] tracking-wide text-white"
            style={{ animationDelay: '180ms' }}
          >
            一张照片，
            <br />
            看懂你的脸型与身形
          </h1>
          <p
            className="animate-rise mt-6 max-w-[500px] text-[15px] leading-8 text-paper/75 sm:text-base"
            style={{ animationDelay: '300ms' }}
          >
            AI 拆解三庭五眼、轮廓与体态比例，把“不知道自己适合什么”变成具体可执行的妆发、穿搭与训练方向。
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '420ms' }}
          >
            <a
              href="#analysis"
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-ink shadow-[0_18px_45px_-18px_rgba(0,0,0,0.55)] transition hover:bg-clay-50 hover:text-clay-700"
            >
              上传照片开始分析
              <span aria-hidden>→</span>
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3.5 text-[15px] font-semibold text-paper transition hover:border-paper/70 hover:bg-white/10"
            >
              先看怎么分析
            </a>
          </div>

          <p
            className="animate-fade-in mt-10 border-t border-paper/20 pt-5 text-xs leading-6 text-paper/55"
            style={{ animationDelay: '620ms' }}
          >
            演示版：照片只在你的浏览器内处理，不会上传 · 结果仅作美学参考，不构成医疗建议
          </p>
        </div>
      </div>
    </section>
  )
}
