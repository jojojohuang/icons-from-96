'use client'

import { useCallback, useState } from 'react'

const SIZE = 8
const MINES = 10

type Cell = { mine: boolean; revealed: boolean; flagged: boolean; count: number }

function buildBoard(): Cell[][] {
  const board: Cell[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({ mine: false, revealed: false, flagged: false, count: 0 })),
  )
  let placed = 0
  while (placed < MINES) {
    const x = Math.floor(Math.random() * SIZE)
    const y = Math.floor(Math.random() * SIZE)
    if (!board[y][x].mine) {
      board[y][x].mine = true
      placed++
    }
  }
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (board[y][x].mine) continue
      let n = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = y + dy
          const nx = x + dx
          if (ny >= 0 && ny < SIZE && nx >= 0 && nx < SIZE && board[ny][nx].mine) n++
        }
      }
      board[y][x].count = n
    }
  }
  return board
}

export function MinesweeperGame() {
  const [board, setBoard] = useState<Cell[][]>(() => buildBoard())
  const [lost, setLost] = useState(false)
  const [won, setWon] = useState(false)

  const reveal = useCallback((y: number, x: number) => {
    if (lost || won) return
    setBoard((prev) => {
      const next = prev.map((row) => row.map((c) => ({ ...c })))
      const cell = next[y][x]
      if (cell.revealed || cell.flagged) return prev
      if (cell.mine) {
        setLost(true)
        next.forEach((row) => row.forEach((c) => { c.revealed = true }))
        return next
      }
      const stack: [number, number][] = [[y, x]]
      while (stack.length) {
        const [cy, cx] = stack.pop()!
        const c = next[cy][cx]
        if (c.revealed || c.mine) continue
        c.revealed = true
        if (c.count === 0) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny = cy + dy
              const nx = cx + dx
              if (ny >= 0 && ny < SIZE && nx >= 0 && nx < SIZE) stack.push([ny, nx])
            }
          }
        }
      }
      const allSafe = next.every((row) => row.every((c) => c.mine || c.revealed))
      if (allSafe) setWon(true)
      return next
    })
  }, [lost, won])

  const reset = () => {
    setBoard(buildBoard())
    setLost(false)
    setWon(false)
  }

  return (
    <div>
      <p className="mb-2 font-mono text-[12px] text-black">
        MINES: {MINES}
        {lost && ' — BOOM!'}
        {won && ' — YOU WIN!'}
      </p>
      <div className="bevel-in inline-block bg-win p-1">
        <div
          className="grid gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${SIZE}, 24px)` }}
        >
          {board.map((row, y) =>
            row.map((cell, x) => (
              <button
                key={`${y}-${x}`}
                type="button"
                onClick={() => reveal(y, x)}
                className={`bevel-out grid h-[24px] w-[24px] place-items-center font-mono text-[11px] font-bold ${
                  cell.revealed ? 'bevel-in bg-white' : 'bg-win'
                }`}
              >
                {cell.revealed
                  ? cell.mine
                    ? '*'
                    : cell.count > 0
                      ? cell.count
                      : ''
                  : ''}
              </button>
            )),
          )}
        </div>
      </div>
      {(lost || won) && (
        <button type="button" onClick={reset} className="btn95 mt-2 text-[13px]">
          New game
        </button>
      )}
    </div>
  )
}
