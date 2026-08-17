'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  'Dialling ISP...',
  'Handshaking...',
  'Verifying username...',
  'Negotiating protocol...',
  'Connected at 28.8 kbps',
  'Downloading AOL welcome screen...',
  'You\'ve got mail!',
]

export function DialUpGame() {
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 4
        if (next >= 100) {
          setDone(true)
          return 100
        }
        return next
      })
    }, 200)
    return () => clearInterval(id)
  }, [done])

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length)
    }, 1200)
    return () => clearInterval(id)
  }, [])

  const reset = () => {
    setProgress(0)
    setMsgIndex(0)
    setDone(false)
  }

  return (
    <div>
      <p className="mb-2 font-mono text-[12px] font-bold text-black">US ROBOTICS MODEM</p>
      <div className="bevel-in bg-white px-2 py-2">
        <p className="font-mono text-[12px] text-black">{MESSAGES[msgIndex]}</p>
        <div className="bevel-in mt-2 h-4 bg-white p-[2px]">
          <div
            className="h-full bg-navy transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1 font-mono text-[11px] text-black">{progress}%</p>
      </div>
      {done && (
        <p className="mt-2 font-serif text-[14px] text-black">
          Connection established. Welcome to 1996.
        </p>
      )}
      {done && (
        <button type="button" onClick={reset} className="btn95 mt-2 text-[13px]">
          Dial again
        </button>
      )}
    </div>
  )
}
