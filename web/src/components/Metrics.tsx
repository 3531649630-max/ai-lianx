import type { Metric } from '../types'

export default function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="border-t border-line">
      {metrics.map((metric) => (
        <div key={metric.label} className="border-b border-line py-4">
          <div className="flex items-baseline justify-between gap-5">
            <span className="text-[13px] text-soft">{metric.label}</span>
            <span className="whitespace-nowrap text-right">
              <b className="font-bold">{metric.value}</b>
              <span className="ml-2 text-xs font-semibold text-faint">{metric.score}%</span>
            </span>
          </div>
          <div className="mt-2.5 h-1 bg-line">
            <div
              className="meter-fill h-1 bg-clay-600"
              style={{ width: `${metric.score}%`, animationDelay: '0.15s' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
