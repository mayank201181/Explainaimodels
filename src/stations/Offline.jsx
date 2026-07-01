import React, { useState } from 'react'
import { Card, AnalogyBox, InfoBox, Toggle } from '../ui.jsx'

export default function Offline() {
  const [online, setOnline] = useState(true)

  return (
    <div className="space-y-6">
      <InfoBox title="Now the offline part makes sense" tone="green">
        Training needed the internet and a data centre. But the <em>result</em> is a frozen file
        of numbers. Using it — “inference” — is just arithmetic with those fixed numbers. Your
        laptop can do arithmetic. So it needs no internet at all.
      </InfoBox>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-400">
            PULL THE PLUG — turn the internet off and see what still works
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Internet</span>
            <Toggle checked={online} onChange={setOnline} onLabel="Online" offLabel="Offline" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className={'rounded-xl border p-4 transition ' +
            (online ? 'border-slate-700 bg-slate-800/40' : 'border-emerald-500/40 bg-emerald-500/[0.06]')}>
            <div className="text-sm font-semibold text-slate-300">The 750B model on the laptop</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="text-3xl">💻</div>
              <div>
                <div className="font-semibold text-emerald-300">✓ Still works perfectly</div>
                <div className="text-sm text-slate-400">
                  It’s only doing maths on numbers already on the disk.
                </div>
              </div>
            </div>
          </div>
          <div className={'rounded-xl border p-4 transition ' +
            (online ? 'border-sky-500/40 bg-sky-500/[0.06]' : 'border-rose-500/40 bg-rose-500/[0.06]')}>
            <div className="text-sm font-semibold text-slate-300">Looking up today’s news / prices</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="text-3xl">{online ? '🌐' : '🚫'}</div>
              <div>
                {online ? (
                  <>
                    <div className="font-semibold text-sky-300">Available</div>
                    <div className="text-sm text-slate-400">Needs a live connection to fetch it.</div>
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-rose-300">Not available</div>
                    <div className="text-sm text-slate-400">
                      No connection = no fresh facts. This is the trade-off.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-4 text-sm font-semibold text-slate-400">
          WHY IT HAS A “KNOWLEDGE CUT-OFF”
        </div>
        <div className="relative py-4">
          <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded bg-slate-700" />
          <div className="relative flex justify-between">
            <TimelineDot title="Reads the internet" sub="up to a certain date" icon="📚" />
            <TimelineDot title="Dials frozen" sub="the file is finished" icon="🧊" active />
            <TimelineDot title="Shipped to laptops" sub="nothing changes now" icon="💾" />
            <TimelineDot title="Today" sub="model still frozen" icon="📅" />
          </div>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
          The moment training stops, the model’s knowledge is sealed at that date. Anything that
          happened afterwards, it simply never saw. That’s not a bug — it’s the flip side of being
          a self-contained file. <span className="font-semibold text-white">Frozen is exactly what
          lets it run anywhere, forever, with no connection.</span>
        </p>
      </Card>

      <AnalogyBox>
        It’s a printed research report. Incredibly valuable, self-contained, works on a plane with
        no signal — but dated the day it went to print. For last night’s close you need a live
        feed. A local AI is that report: deep, portable, and frozen in time. A cloud AI is the
        live terminal — current, but only while you’re connected.
      </AnalogyBox>
    </div>
  )
}

function TimelineDot({ title, sub, icon, active }) {
  return (
    <div className="flex w-1/4 flex-col items-center text-center">
      <div className={'flex h-11 w-11 items-center justify-center rounded-full border-2 text-lg ' +
        (active ? 'border-sky-400 bg-slate-900 pulse-glow' : 'border-slate-600 bg-slate-900')}>
        {icon}
      </div>
      <div className="mt-2 text-xs font-semibold text-slate-200">{title}</div>
      <div className="text-[11px] text-slate-500">{sub}</div>
    </div>
  )
}
