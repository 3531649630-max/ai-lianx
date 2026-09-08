import { useEffect, useState } from 'react'

export default function Footer() {
  const [backend, setBackend] = useState<'checking' | 'online' | 'offline'>('checking')

  useEffect(() => {
    let cancelled = false
    fetch('/api/health', { headers: { Accept: 'application/json' } })
      .then((res) => (res.ok ? 'online' : 'offline'))
      .then((state) => {
        if (!cancelled) setBackend(state)
      })
      .catch(() => {
        if (!cancelled) setBackend('offline')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <footer className="bg-ink text-paper">
      <div className="shell py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-paper/50">Privacy · 隐私与声明</p>
            <p className="mt-4 max-w-[520px] text-[13px] leading-7 text-paper/65">
              当前演示版中照片不会离开你的浏览器。正式版建议采用「即用即焚」：分析完成后自动删除原图，只保留脱敏后的结果数据，并明确告知用户授权。
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-paper/50">Disclaimer · 免责声明</p>
            <p className="mt-4 max-w-[520px] text-[13px] leading-7 text-paper/65">
              所有妆容教程、健身博主与体态建议仅作美学与运动参考，不构成医疗或健康诊断。抖音、小红书为第三方平台，本站与其无隶属关系。
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 text-xs text-paper/45">
          <p>© 2026 LookMe · 前端演示版 v0.2</p>
          <p className="flex items-center gap-2">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                backend === 'online' ? 'bg-emerald-400' : backend === 'checking' ? 'bg-paper/40' : 'bg-paper/25'
              }`}
            />
            {backend === 'online'
              ? '后端服务已连接'
              : backend === 'checking'
                ? '正在检查后端…'
                : '纯前端模式（后端未连接）'}
          </p>
        </div>
      </div>
    </footer>
  )
}
