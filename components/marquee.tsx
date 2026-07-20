export function Marquee({ text }: { text: string }) {
  return (
    <div className="bevel-in overflow-hidden bg-black py-[3px]">
      <div className="marquee-track font-mono text-[13px] font-bold text-toxic">
        {text}
      </div>
    </div>
  )
}
