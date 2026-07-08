import React from 'react'

/* ---------- Layout / text primitives ---------- */

export function Card({ children, className = '' }) {
  return (
    <div
      className={
        'rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur ' +
        'shadow-lg shadow-black/20 ' +
        className
      }
    >
      {children}
    </div>
  )
}

export function Eyebrow({ children }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400/80">
      {children}
    </div>
  )
}

export function AnalogyBox({ title = 'Trader’s analogy', icon = '💹', children }) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4">
      <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-amber-300">
        <span>{icon}</span> {title}
      </div>
      <div className="text-[15px] leading-relaxed text-amber-100/90">{children}</div>
    </div>
  )
}

export function InfoBox({ title = 'In plain words', children, tone = 'sky' }) {
  const tones = {
    sky: 'border-sky-500/30 bg-sky-500/[0.06] text-sky-100/90',
    green: 'border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-100/90',
    purple: 'border-purple-500/30 bg-purple-500/[0.06] text-purple-100/90',
  }
  const heads = {
    sky: 'text-sky-300',
    green: 'text-emerald-300',
    purple: 'text-purple-300',
  }
  return (
    <div className={'rounded-xl border p-4 ' + tones[tone]}>
      {title && (
        <div className={'mb-1 text-sm font-semibold ' + heads[tone]}>{title}</div>
      )}
      <div className="text-[15px] leading-relaxed">{children}</div>
    </div>
  )
}

/* ---------- Controls ---------- */

export function Slider({ label, value, min, max, step = 1, onChange, format }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="font-mono text-sm font-semibold text-sky-300">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

export function Toggle({ checked, onChange, onLabel = 'On', offLabel = 'Off' }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={
        'relative inline-flex h-9 items-center gap-2 rounded-full px-1 pr-3 text-sm font-semibold transition ' +
        (checked
          ? 'bg-emerald-500/20 text-emerald-300'
          : 'bg-slate-700/50 text-slate-400')
      }
    >
      <span
        className={
          'flex h-7 w-7 items-center justify-center rounded-full transition ' +
          (checked ? 'translate-x-0 bg-emerald-400 text-slate-900' : 'bg-slate-500 text-slate-900')
        }
      >
        {checked ? '✓' : '✕'}
      </span>
      {checked ? onLabel : offLabel}
    </button>
  )
}

export function Button({ children, onClick, variant = 'primary', className = '', disabled }) {
  const styles = {
    primary:
      'bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-500/20',
    ghost:
      'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600',
    subtle: 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        'rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ' +
        styles[variant] +
        ' ' +
        className
      }
    >
      {children}
    </button>
  )
}

export function Chip({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-full border px-3 py-1.5 text-sm transition ' +
        (active
          ? 'border-sky-400 bg-sky-500/20 text-sky-200'
          : 'border-slate-600 bg-slate-800/40 text-slate-300 hover:border-slate-500')
      }
    >
      {children}
    </button>
  )
}

/* ---------- Data viz ---------- */

// A horizontal probability bar (for next-token distributions etc.)
export function ProbBar({ label, value, max = 1, highlight }) {
  const pct = Math.max(2, (value / max) * 100)
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 shrink-0 truncate text-right font-mono text-sm text-slate-300">
        {label}
      </div>
      <div className="h-6 flex-1 overflow-hidden rounded-md bg-slate-800">
        <div
          className={
            'flex h-full items-center justify-end rounded-md pr-2 text-xs font-semibold text-slate-900 transition-all duration-500 ' +
            (highlight ? 'bg-emerald-400' : 'bg-sky-400')
          }
          style={{ width: pct + '%' }}
        >
          {(value * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  )
}
