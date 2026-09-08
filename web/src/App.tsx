import { useCallback, useState } from 'react'
import AnalyzingView from './components/AnalyzingView'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import ReportView from './components/ReportView'
import UploadPanel from './components/UploadPanel'
import type { AnalysisReport, PhotoKind, PreviewFile } from './types'
import { hashSeed, makeMockReport } from './lib/report'

type Stage = 'upload' | 'analyzing' | 'report'

interface Session {
  previewUrl: string
  fileName: string
  kind: PhotoKind
}

export default function App() {
  const [stage, setStage] = useState<Stage>('upload')
  const [session, setSession] = useState<Session | null>(null)
  const [report, setReport] = useState<AnalysisReport | null>(null)

  const startAnalyze = useCallback((selection: { file: PreviewFile; kind: PhotoKind }) => {
    setReport(null)
    setSession({
      previewUrl: selection.file.previewUrl,
      fileName: selection.file.name,
      kind: selection.kind,
    })
    setStage('analyzing')
    window.setTimeout(() => {
      document.getElementById('analysis')?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }, [])

  const finishAnalyze = useCallback(() => {
    if (!session) return
    const next = makeMockReport(session.kind, hashSeed(session.fileName + Date.now()))
    setReport(next)
    setStage('report')
    window.setTimeout(() => {
      document.getElementById('analysis')?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }, [session])

  const restart = useCallback(() => {
    setStage('upload')
    setReport(null)
    setSession(null)
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {stage === 'upload' && (
          <>
            <Hero />
            <HowItWorks />
            <UploadPanel onAnalyze={startAnalyze} />
          </>
        )}
        {stage === 'analyzing' && session && (
          <AnalyzingView kind={session.kind} previewUrl={session.previewUrl} onDone={finishAnalyze} />
        )}
        {stage === 'report' && report && (
          <ReportView report={report} imageUrl={session?.previewUrl} onRestart={restart} />
        )}
      </main>
      <Footer />
    </div>
  )
}
