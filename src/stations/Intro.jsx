import React from 'react'
import { Card, AnalogyBox, InfoBox } from '../ui.jsx'

export default function Intro() {
  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8">
        <p className="text-lg leading-relaxed text-slate-200">
          Someone shows you a laptop. The Wi-Fi is off. There is{' '}
          <span className="font-semibold text-white">no internet</span>. And yet sitting on
          its hard drive is an AI with <span className="font-semibold text-white">750 billion
          “parameters”</span> that can answer almost anything you ask — history, code,
          poetry, physics, cooking.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-slate-200">
          The whole thing is maybe <span className="font-semibold text-white">one terabyte</span> —
          a file smaller than your photo library. So the natural question is the one you
          asked:
        </p>
        <p className="mt-4 rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-xl font-medium italic text-sky-200">
          “How can one terabyte of storage possibly contain the knowledge of the universe —
          and answer me without ever going online?”
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoBox title="The one-sentence answer">
          It does <span className="font-semibold">not</span> store the knowledge. It stores
          the <span className="font-semibold">patterns</span> it noticed while reading a huge
          amount of text — and it uses those patterns to <span className="font-semibold">predict</span>,
          word by word, what a good answer looks like. That’s a much smaller thing to store.
        </InfoBox>
        <AnalogyBox title="Why that should feel familiar">
          You don’t remember every tick of every stock you’ve ever traded. But after 20 years
          you’ve <em>internalised the patterns</em> — you can react to a market you’ve never
          seen before. The model is that, taken to an extreme: it read the internet, kept the
          patterns, threw away the raw text.
        </AnalogyBox>
      </div>

      <Card className="p-6">
        <div className="text-sm font-semibold text-slate-400">
          HOW THIS GUIDE WORKS
        </div>
        <p className="mt-2 leading-relaxed text-slate-300">
          We’ll build the idea up one small step at a time. Each step has something you can{' '}
          <span className="font-semibold text-white">play with</span>. When a step clicks —
          when you think <em>“yes, this part I understand”</em> — press{' '}
          <span className="rounded bg-sky-500/20 px-2 py-0.5 font-semibold text-sky-300">
            Got it — next
          </span>{' '}
          and we’ll go one level deeper. By the end, the laptop won’t feel like magic. It’ll
          feel almost obvious.
        </p>
      </Card>
    </div>
  )
}
