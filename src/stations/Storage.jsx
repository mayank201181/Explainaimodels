import React, { useState } from 'react'
import { Card, AnalogyBox, InfoBox, Slider, Chip } from '../ui.jsx'
import { humanBytes, humanNumber } from '../data.js'

const PRECISIONS = [
  { bits: 16, label: '16-bit', note: 'full precision (how models are born)' },
  { bits: 8, label: '8-bit', note: 'lightly compressed' },
  { bits: 4, label: '4-bit', note: 'heavily compressed — what runs on laptops' },
]

export default function Storage() {
  const [params, setParams] = useState(750e9) // 750B
  const [bits, setBits] = useState(4)

  const bytes = (params * bits) / 8 // bytes
  const gb = bytes / 1e9
  const laptopTB = 2 // a 2 TB laptop SSD
  const fitsPct = Math.min(100, (gb / 1000 / laptopTB) * 100)

  return (
    <div className="space-y-6">
      <InfoBox title="Here is the exact answer to your question">
        Every parameter is one number. Store each number in fewer bits and the whole model
        shrinks. Do the multiplication and the “impossible” terabyte stops being a mystery —
        it’s just <span className="font-semibold">parameters × bytes-per-parameter</span>.
      </InfoBox>

      <Card className="p-6">
        <div className="mb-5 text-sm font-semibold text-slate-400">
          THE CALCULATOR — move the sliders and watch the file size
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Slider
              label="Number of parameters"
              value={params}
              min={1e9}
              max={2e12}
              step={1e9}
              onChange={setParams}
              format={(v) => humanNumber(v)}
            />
            <div>
              <div className="mb-2 text-sm text-slate-300">
                Bits used to store each number{' '}
                <span className="text-slate-500">(this is called “quantization”)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRECISIONS.map((p) => (
                  <Chip key={p.bits} active={bits === p.bits} onClick={() => setBits(p.bits)}>
                    {p.label}
                  </Chip>
                ))}
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {PRECISIONS.find((p) => p.bits === bits).note}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-800/40 p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              File on disk
            </div>
            <div className="my-1 font-mono text-5xl font-bold text-emerald-300">
              {humanBytes(gb)}
            </div>
            <div className="font-mono text-xs text-slate-500">
              {humanNumber(params)} × {bits} bits ÷ 8
            </div>

            <div className="mt-5 w-full">
              <div className="mb-1 flex justify-between text-xs text-slate-400">
                <span>Space used on a 2 TB laptop SSD</span>
                <span>{fitsPct.toFixed(0)}%</span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-slate-700">
                <div
                  className={
                    'h-full rounded-full transition-all duration-500 ' +
                    (fitsPct < 100 ? 'bg-emerald-400' : 'bg-rose-400')
                  }
                  style={{ width: fitsPct + '%' }}
                />
              </div>
              <div className="mt-2 text-center text-sm font-medium">
                {fitsPct < 100 ? (
                  <span className="text-emerald-300">✓ Fits on the laptop — with room to spare</span>
                ) : (
                  <span className="text-rose-300">Too big for one drive at this setting</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoBox title="Try this to feel it" tone="green">
          Set it to <span className="font-semibold">750 billion parameters</span> at{' '}
          <span className="font-semibold">4-bit</span>. That’s about{' '}
          <span className="font-semibold">{humanBytes((750e9 * 4) / 8 / 1e9)}</span> —
          comfortably under a terabyte. The “knowledge of the universe” claim is really just:
          a lot of numbers, each stored very compactly.
        </InfoBox>
        <InfoBox title="Isn’t 4-bit lossy? Yes — and it’s fine" tone="purple">
          Squeezing each dial into 4 bits rounds it off a little, like a slightly blurry photo.
          The model gets marginally less sharp but keeps almost all its ability — which is
          exactly the trade that lets a giant model run on ordinary hardware.
        </InfoBox>
      </div>

      <AnalogyBox>
        You already do this every day. A tick doesn’t need 15 decimal places — you round to the
        cent and your P&amp;L is still right. Quantization is the model rounding its 750 billion
        “prices” to fewer digits so the whole book fits in memory. Precision you can’t perceive,
        thrown away on purpose.
      </AnalogyBox>
    </div>
  )
}
