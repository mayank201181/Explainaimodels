import React from 'react'
import { Card, AnalogyBox, InfoBox } from '../ui.jsx'
import { useAudience, Aud } from '../audience.jsx'

function points(mode) {
  return [
    { n: 1, t: 'It only predicts the next word', d: 'Every answer is that one trick repeated hundreds of times.' },
    { n: 2, t: 'Words become numbers (tokens)', d: 'So the machine can do pure arithmetic on language.' },
    { n: 3, t: 'A “parameter” is just a dial', d: 'A 750B model is 750 billion tuned numbers — that’s all.' },
    { n: 4, t: 'That’s why it fits in ~1 TB', d: 'Parameters × a few bits each. Store them compactly (4-bit) and it fits.' },
    {
      n: 5,
      t: 'It kept patterns, not pages',
      d: mode === 'teen'
        ? 'It compressed a whole library into rules — like learning the rules of a game instead of memorising every level.'
        : 'It compressed a library into rules — the same way you compress decades of trading into judgement.',
    },
    { n: 6, t: 'The dials were trained, not typed', d: 'Guess → check the error → nudge → repeat, trillions of times.' },
    { n: 7, t: 'Using it is just arithmetic', d: 'Frozen numbers + your laptop = answers, no internet required.' },
    { n: 8, t: 'Frozen means a knowledge cut-off', d: 'The exact thing that lets it run offline also dates it.' },
    { n: 9, t: 'It sounds sure even when wrong', d: 'It predicts plausible text, not verified truth. Check the important stuff.' },
  ]
}

export default function Recap() {
  const [mode] = useAudience()
  const POINTS = points(mode)
  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8">
        <div className="text-2xl font-bold text-white">
          So — how <em>does</em> a whole AI fit on a laptop?
        </div>
        <p className="mt-3 text-lg leading-relaxed text-slate-200">
          It doesn’t hold the knowledge, really — and that’s the beautiful part. The laptop holds a
          few hundred billion <span className="font-semibold text-white">dials</span>, tuned so that
          predicting one word at a time <em>reconstructs</em> knowledge on demand. Not a library on
          a shelf — the distilled <span className="font-semibold text-white">skill of having read
          the library</span>, squeezed into numbers small enough to carry anywhere.
        </p>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {POINTS.map((p) => (
          <div key={p.n} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/20 text-sm font-bold text-sky-300">
              {p.n}
            </div>
            <div className="mt-2 font-semibold text-slate-100">{p.t}</div>
            <div className="mt-1 text-sm text-slate-400">{p.d}</div>
          </div>
        ))}
      </div>

      <Aud
        pro={
          <AnalogyBox title="The whole thing, in one trader’s sentence">
            A local AI model is decades of “reading the tape” — compressed into a frozen book of
            numbers small enough to fit in your pocket, that reconstructs an answer one word at a
            time, brilliantly and offline, but frozen at the date it was printed and never quite sure
            when it’s bluffing.
          </AnalogyBox>
        }
        teen={
          <AnalogyBox title="The whole thing, in one sentence" icon="🎮">
            A local AI is like a super-smart friend who read almost the whole internet, kept only the
            <em> patterns</em> (not the actual pages), and got squeezed into a file small enough to
            live on a laptop — writing answers one word at a time, offline, but stuck knowing only
            what it read before it was “saved,” and sometimes bluffing with total confidence.
          </AnalogyBox>
        }
      />

      <InfoBox title="Where to go from here" tone="green">
        You now understand the machine better than most people who use it every day. If you want to
        actually try a local model, look up <span className="font-semibold">“Ollama”</span> or{' '}
        <span className="font-semibold">LM Studio</span> — they let you download models like Gemma
        and run them offline on a capable laptop, exactly as we described.{' '}
        <Aud
          pro={<>Share this guide with the friends you were telling — the “Restart” button up top takes anyone through it from the beginning.</>}
          teen={<>Show your friends and family — and don’t forget you can flip the 💹 Pro / 🎮 Teen switch at the top to change how everything is explained.</>}
        />
      </InfoBox>
    </div>
  )
}
