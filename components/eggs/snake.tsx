'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const COLS = 16
const ROWS = 12
const CELL = 14

type Point = { x: number; y: number }

function randomFood(snake: Point[]): Point {
  let p: Point
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some((s) => s.x === p.x && s.y === p.y))
  return p
}

export function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([{ x: 4, y: 6 }])
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 })
  const [food, setFood] = useState<Point>(() => ({ x: 10, y: 6 }))
  const [score, setScore] = useState(0)
  const [over, setOver] = useState(false)
  const dirRef = useRef(dir)
  dirRef.current = dir

  const reset = useCallback(() => {
    const start = [{ x: 4, y: 6 }]
    setSnake(start)
    setDir({ x: 1, y: 0 })
    setFood(randomFood(start))
    setScore(0)
    setOver(false)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const d = dirRef.current
      if (e.key === 'ArrowUp' && d.y !== 1) setDir({ x: 0, y: -1 })
      if (e.key === 'ArrowDown' && d.y !== -1) setDir({ x: 0, y: 1 })
      if (e.key === 'ArrowLeft' && d.x !== 1) setDir({ x: -1, y: 0 })
      if (e.key === 'ArrowRight' && d.x !== -1) setDir({ x: 1, y: 0 })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (over) return
    const id = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0]
        const next = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y }
        if (
          next.x < 0 ||
          next.x >= COLS ||
          next.y < 0 ||
          next.y >= ROWS ||
          prev.some((s) => s.x === next.x && s.y === next.y)
        ) {
          setOver(true)
          return prev
        }
        const ate = next.x === food.x && next.y === food.y
        const body = [next, ...prev]
        if (!ate) body.pop()
        else {
          setScore((s) => s + 10)
          setFood(randomFood(body))
        }
        return body
      })
    }, 140)
    return () => clearInterval(id)
  }, [over, food])

  return (
    <div>
      <p className="mb-2 font-mono text-[12px] text-black">
        SCORE: {score} {over && '— GAME OVER'}
      </p>
      <div
        className="bevel-in inline-block bg-black p-1"
        style={{ width: COLS * CELL + 8, height: ROWS * CELL + 8 }}
      >
        <svg width={COLS * CELL} height={ROWS * CELL}>
          <rect
            x={food.x * CELL}
            y={food.y * CELL}
            width={CELL - 1}
            height={CELL - 1}
            fill="#39ff14"
          />
          {snake.map((s, i) => (
            <rect
              key={`${s.x}-${s.y}-${i}`}
              x={s.x * CELL}
              y={s.y * CELL}
              width={CELL - 1}
              height={CELL - 1}
              fill={i === 0 ? '#ff8c00' : '#c0c0c0'}
            />
          ))}
        </svg>
      </div>
      <p className="mt-2 font-mono text-[11px] text-black">Arrow keys to move</p>
      {over && (
        <button type="button" onClick={reset} className="btn95 mt-2 text-[13px]">
          Play again
        </button>
      )}
    </div>
  )
}
