import React, { useState, useEffect, useRef } from 'react'
import Intro from './stations/Intro.jsx'
import Prediction from './stations/Prediction.jsx'
import Tokens from './stations/Tokens.jsx'
import Dials from './stations/Dials.jsx'
import Storage from './stations/Storage.jsx'
import Compression from './stations/Compression.jsx'
import Training from './stations/Training.jsx'
import Inference from './stations/Inference.jsx'
import Offline from './stations/Offline.jsx'
import Hallucination from './stations/Hallucination.jsx'
import Recap from './stations/Recap.jsx'
import { Eyebrow, Button } from './ui.jsx'

const STATIONS = [
  { id: 'intro', tab: 'Start', title: 'A whole AI, on a laptop, with no internet', sub: 'The puzzle we’re going to solve', C: Intro },
  { id: 'predict', tab: 'Predict', title: 'It just predicts the next word', sub: 'Step 1 · the one idea everything is built on', C: Prediction },
  { id: 'tokens', tab: 'Numbers', title: 'Turning words into numbers', sub: 'Step 2 · how a machine can “read”', C: Tokens },
  { id: 'dials', tab: 'Dials', title: 'What a “parameter” really is', sub: 'Step 3 · billions of tiny dials', C: Dials },
  { id: 'storage', tab: 'The 1 TB', title: 'How 750 billion parameters fit in ~1 TB', sub: 'Step 4 · the calculator that answers your question', C: Storage },
  { id: 'compress', tab: 'Compress', title: 'Patterns, not pages', sub: 'Step 5 · how “all knowledge” compresses so small', C: Compression },
  { id: 'train', tab: 'Training', title: 'How the dials get set', sub: 'Step 6 · watch a model actually learn', C: Training },
  { id: 'infer', tab: 'Answering', title: 'Writing an answer, one word at a time', sub: 'Step 7 · the loop in action', C: Inference },
  { id: 'offline', tab: 'Offline', title: 'Why it works with the internet off', sub: 'Step 8 · frozen numbers & the knowledge cut-off', C: Offline },
  { id: 'halluc', tab: 'Limits', title: 'Why it sometimes makes things up', sub: 'Step 9 · the one honest warning', C: Hallucination },
  { id: 'recap', tab: 'Recap', title: 'The whole picture', sub: 'You made it — here’s everything, together', C: Recap },
]

const KEY = 'ai-guide-progress-v1'

export default function App() {
  const [current, setCurrent] = useState(0)
  const [maxUnlocked, setMaxUnlocked] = useState(0)
  const topRef = useRef(null)

  // restore progress
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}')
      if (typeof saved.maxUnlocked === 'number') setMaxUnlocked(saved.maxUnlocked)
      if (typeof saved.current === 'number') setCurrent(saved.current)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ maxUnlocked, current }))
    } catch {}
  }, [maxUnlocked, current])

  function goto(i) {
    if (i < 0 || i >= STATIONS.length) return
    setCurrent(i)
    if (i > maxUnlocked) setMaxUnlocked(i)
    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function restart() {
    setMaxUnlocked(0)
    goto(0)
  }

  const S = STATIONS[current]
  const Station = S.C
  const isLast = current === STATIONS.length - 1
  const progress = (maxUnlocked / (STATIONS.length - 1)) * 100

  return (
    <div className="bg-grid min-h-screen">
      <div ref={topRef} />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-[#0a0e17]/85 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-200">
                🧠 How does an AI fit on a laptop?
              </div>
              <div className="truncate text-xs text-slate-500">
                An interactive, no-jargon guide to local AI models
              </div>
            </div>
            <Button variant="subtle" onClick={restart} className="shrink-0 !px-3 !py-1.5 text-xs">
              ↻ Restart
            </Button>
          </div>

          {/* progress bar */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-purple-400 transition-all duration-500"
              style={{ width: progress + '%' }} />
          </div>

          {/* tabs */}
          <div className="mt-2 flex gap-1 overflow-x-auto pb-1">
            {STATIONS.map((st, i) => {
              const locked = i > maxUnlocked
              return (
                <button
                  key={st.id}
                  disabled={locked}
                  onClick={() => goto(i)}
                  className={
                    'shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ' +
                    (i === current
                      ? 'bg-sky-500 text-white'
                      : locked
                      ? 'cursor-not-allowed text-slate-600'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200')
                  }
                >
                  {locked ? '🔒 ' : ''}{i === 0 ? '' : i + '. '}{st.tab}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div key={S.id} className="fade-up">
          <Eyebrow>{S.sub}</Eyebrow>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {S.title}
          </h1>
          <div className="mt-6">
            <Station />
          </div>
        </div>

        {/* Nav footer */}
        <div className="mt-10 flex items-center justify-between border-t border-slate-800 pt-6">
          <Button variant="ghost" onClick={() => goto(current - 1)} disabled={current === 0}>
            ← Back
          </Button>
          <div className="text-sm text-slate-500">
            {current + 1} / {STATIONS.length}
          </div>
          {isLast ? (
            <Button onClick={restart}>↻ Start again</Button>
          ) : (
            <Button onClick={() => goto(current + 1)}>
              {current === 0 ? 'Begin →' : 'Got it — next →'}
            </Button>
          )}
        </div>
      </main>

      <footer className="mx-auto max-w-4xl px-4 pb-10 text-center text-xs text-slate-600">
        Built as a friendly explainer. The interactive demos are simplified illustrations of
        real mechanisms — the concepts are accurate, the exact numbers are for intuition.
      </footer>
    </div>
  )
}
