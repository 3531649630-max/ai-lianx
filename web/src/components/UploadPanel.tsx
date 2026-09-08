import { useRef, useState } from 'react'
import type { PhotoKind, PreviewFile } from '../types'

interface UploadPanelProps {
  busy?: boolean
  onAnalyze: (selection: { file: PreviewFile; kind: PhotoKind }) => void
}

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']

const guessKind = (fileName: string, width: number, height: number): PhotoKind => {
  const lower = fileName.toLowerCase()
  if (/(全身|fullbody|standing|站姿)/.test(lower)) return 'fullbody'
  return height / width >= 1.5 ? 'fullbody' : 'face'
}

const readImage = (file: File) =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve({ width: image.naturalWidth, height: image.naturalHeight })
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('图片无法读取'))
    }
    image.src = url
  })

export default function UploadPanel({ busy = false, onAnalyze }: UploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<PreviewFile | null>(null)
  const [mode, setMode] = useState<'auto' | 'face' | 'fullbody'>('auto')
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const acceptFile = async (raw: File | undefined) => {
    if (!raw) return
    setError('')
    if (!ALLOWED.includes(raw.type)) {
      setError('仅支持 JPG / PNG / WebP 图片')
      return
    }
    if (raw.size > 15 * 1024 * 1024) {
      setError('图片大小请控制在 15MB 以内')
      return
    }
    try {
      const { width, height } = await readImage(raw)
      setFile({
        name: raw.name,
        type: raw.type,
        size: raw.size,
        width,
        height,
        previewUrl: URL.createObjectURL(raw),
      })
    } catch {
      setError('这张图片无法读取，请换一张试试')
    }
  }

  const remove = () => {
    if (file) URL.revokeObjectURL(file.previewUrl)
    setFile(null)
    setMode('auto')
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const submit = () => {
    if (!file) return
    const kind = mode === 'auto' ? guessKind(file.name, file.width, file.height) : mode
    onAnalyze({ file, kind })
  }

  const formatSize = (bytes: number) =>
    bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`

  return (
    <section id="analysis" className="scroll-mt-16 py-20 sm:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Start analysis</p>
          <h2 className="mt-4 font-serif text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-tight">
            上传一张正面照，开始分析
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-soft">
            头像照可分析脸型；全身照会自动追加身形与体态分析。演示版全程在浏览器本地完成。
          </p>
        </div>

        <div className="mt-14 grid border-t border-line-strong lg:grid-cols-[0.82fr_1.18fr]">
          <dl className="border-b border-line lg:border-b-0 lg:border-r">
            {[
              ['照片类型', '头像照判定脸型；全身照继续判定身形体态'],
              ['照片要求', 'JPG / PNG / WebP · 15MB 以内 · 光线均匀、正对镜头'],
              ['隐私说明', '照片仅保存在当前浏览器内存中，分析完成后不会上传'],
            ].map(([title, desc]) => (
              <div key={title} className="border-b border-line py-6 pr-10 last:border-b-0">
                <dt className="text-[13px] font-bold tracking-wide text-ink">{title}</dt>
                <dd className="mt-2 text-sm leading-7 text-soft">{desc}</dd>
              </div>
            ))}
          </dl>

          <div className="flex items-stretch border-t border-line lg:border-t-0">
            {!file ? (
              <label
                className={`flex min-h-[400px] w-full cursor-pointer flex-col items-center justify-center gap-5 border border-dashed px-8 py-14 text-center transition lg:border-0 ${
                  dragOver
                    ? 'bg-clay-50 outline outline-2 outline-offset-[-2px] outline-clay-500'
                    : 'bg-cream hover:bg-clay-50/70'
                }`}
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(event) => {
                  event.preventDefault()
                  setDragOver(false)
                  void acceptFile(event.dataTransfer.files?.[0])
                }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(event) => void acceptFile(event.target.files?.[0])}
                />
                <span className="grid h-16 w-16 place-items-center rounded-full border border-ink/20 bg-paper text-2xl text-clay-600">
                  ＋
                </span>
                <span className="max-w-md">
                  <span className="block text-lg font-bold">点击选择照片，或拖拽到这里</span>
                  <span className="mt-2 block text-sm leading-6 text-soft">
                    建议使用光线均匀、五官清晰的正面照
                  </span>
                </span>
                <span className="rounded-full bg-paper px-4 py-2 text-xs font-semibold text-soft ring-1 ring-line-strong">
                  支持 JPG / PNG / WebP
                </span>
              </label>
            ) : (
              <div className="grid w-full sm:grid-cols-[230px_1fr]">
                <div className="relative m-0 aspect-[4/5] max-h-[480px] w-full overflow-hidden bg-ink sm:aspect-auto sm:min-h-full">
                  <img src={file.previewUrl} alt="待分析照片预览" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={remove}
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-paper/30 bg-ink/55 text-lg text-paper backdrop-blur transition hover:bg-ink/80"
                    title="移除照片"
                  >
                    ×
                  </button>
                </div>
                <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
                  <div>
                    <h3 className="break-all text-xl font-bold leading-snug">{file.name}</h3>
                    <p className="mt-2 text-sm text-soft">
                      {file.width} × {file.height}px · {formatSize(file.size)}
                    </p>
                    {mode === 'auto' && (
                      <p className="mt-4 inline-flex rounded-full bg-clay-100 px-3.5 py-1.5 text-xs font-semibold text-clay-700">
                        自动判定：{guessKind(file.name, file.width, file.height) === 'fullbody' ? '全身照' : '头像照'}
                      </p>
                    )}
                  </div>

                  <fieldset>
                    <legend className="mb-3 text-xs font-bold tracking-[0.12em] text-soft">
                      照片类型 · 正式版由 AI 自动判定
                    </legend>
                    <div className="inline-flex gap-1 border border-line-strong bg-paper p-1">
                      {(
                        [
                          ['auto', '自动'],
                          ['face', '头像照'],
                          ['fullbody', '全身照'],
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setMode(value)}
                          className={`rounded-sm px-4 py-2 text-[13px] font-semibold transition ${
                            mode === value ? 'bg-ink text-paper' : 'text-soft hover:text-ink'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <button
                      type="button"
                      onClick={submit}
                      disabled={busy}
                      className="w-full rounded-full bg-clay-600 px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-clay-700 disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
                    >
                      开始 AI 分析
                    </button>
                    <p className="mt-4 text-xs leading-6 text-faint">
                      当前为前端演示：结果为模拟数据，正式版将接入真实图像模型与内容检索。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="mt-6 border border-clay-300 bg-clay-50 px-5 py-3.5 text-sm text-clay-700">{error}</p>
        )}
      </div>
    </section>
  )
}
