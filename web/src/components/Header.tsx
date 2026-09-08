export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-line-strong bg-cream text-sm text-clay-600 transition-colors group-hover:border-clay-400">
            ◐
          </span>
          <span className="flex items-baseline gap-2.5">
            <span className="text-[17px] font-extrabold tracking-tight text-ink">LookMe</span>
            <span className="hidden border-l border-line-strong pl-2.5 text-[12px] text-soft sm:inline">
              AI 形象美学分析
            </span>
          </span>
        </a>

        <nav className="flex items-center gap-7 text-sm">
          <a href="#how" className="hidden text-soft transition-colors hover:text-clay-600 md:block">
            怎么分析
          </a>
          <a
            href="#analysis"
            className="rounded-full bg-ink px-4.5 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-clay-600"
          >
            上传照片
          </a>
        </nav>
      </div>
    </header>
  )
}
