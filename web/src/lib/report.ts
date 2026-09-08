import type { AnalysisReport, PhotoKind } from '../types'
import { BODY_PROFILES, FACE_PROFILES, toBodyAnalysis, toFaceAnalysis } from '../data/profiles'

export const makeMockReport = (kind: PhotoKind, seed: number): AnalysisReport => {
  const face = toFaceAnalysis(FACE_PROFILES[seed % FACE_PROFILES.length], seed)
  const body = kind === 'fullbody' ? toBodyAnalysis(BODY_PROFILES[(seed >> 2) % BODY_PROFILES.length], seed) : null
  return { kind, seed, face, body }
}

export const hashSeed = (input: string) => {
  let hash = 2166136261
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}
