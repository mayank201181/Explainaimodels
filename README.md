# How does an AI fit on a laptop? 🧠

An interactive, no-jargon web app that answers a simple question:

> How can a 750-billion-parameter AI model run **offline on a laptop**, and how
> does "the knowledge of the universe" get compressed into a ~1 TB file?

It's a step-by-step guided journey of 10 hands-on stations. Each one explains a
single idea in plain language, gives you something to **play with**, then unlocks
the next step — the "yes, *this* part I understand → now go deeper" flow.

### Two audiences, one app

A **💹 Pro / 🎮 Teen** switch at the top re-skins every explanation and analogy:

- **Pro** — finance / trading framing (markets, portfolios, risk, calibration)
- **Teen (12–16)** — everyday framing (phones, autocomplete, gaming, YouTube,
  school, sport)

The interactive widgets are identical in both modes; only the words change. The
choice is remembered across visits.

## The stations

1. **Predict** — the one idea everything is built on: predicting the next word
2. **Numbers** — a live tokenizer: how words become numbers
3. **Dials** — turn the dials of a real (tiny) neuron; what a "parameter" is
4. **The 1 TB** — a calculator showing how 750B parameters fit in ~1 TB
5. **Compress** — patterns vs. pages: how "all knowledge" compresses so small
6. **Training** — run a *real* gradient-descent training loop and watch a model learn
7. **Answering** — generate a sentence one word at a time, with a temperature dial
8. **Offline** — pull the plug and see why it still works; the knowledge cut-off
9. **Limits** — why it sometimes makes things up
10. **Recap** — the whole picture in one place

## Running locally

```bash
npm install
npm run dev
```

## Building

```bash
npm run build      # outputs static files to dist/
npm run preview
```

## Deploying

Built with **Vite + React + Tailwind** as a fully static site — deploys to
Vercel (or any static host) with zero configuration.

---

The interactive demos are simplified illustrations of real mechanisms. The
concepts are accurate; the exact numbers are chosen for intuition, not precision.
