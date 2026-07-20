'use client'

import { useEffect, useState } from 'react'

// A fake "visitors since 1996" odometer. Starts near 30 and ticks up
// slightly on load so it feels alive without pretending to be real.
export function VisitorCounter() {
  const [count, setCount] = useState(30)

  useEffect(() => {
    const base = 30 + Math.floor(Math.random() * 9)
    setCount(base)
    const t = setTimeout(() => setCount(base + 1), 2500)
    return () => clearTimeout(t)
  }, [])

  const digits = String(count).padStart(6, '0').split('')

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[12px] font-bold text-black">Visitors since 1996:</span>
      <div className="bevel-in flex gap-[2px] bg-black px-[3px] py-[2px]">
        {digits.map((d, i) => (
          <span
            key={i}
            className="grid h-[22px] w-[15px] place-items-center bg-black font-mono text-[16px] font-bold text-toxic"
            style={{ boxShadow: 'inset 0 0 0 1px #1a1a1a' }}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}
