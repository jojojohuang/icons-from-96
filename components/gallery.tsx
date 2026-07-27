'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { gallery } from '@/lib/event-config'

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center bg-win px-4 text-center">
        <p className="font-mono text-[13px] font-bold text-black">IMAGE NOT FOUND</p>
        <p className="mt-2 font-mono text-[11px] text-black">{src}</p>
        <p className="mt-1 font-sans text-[12px] text-black">
          Drop file in public/gallery/
        </p>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="aspect-[4/3] h-auto w-full object-contain"
    />
  )
}

export function Gallery() {
  const [index, setIndex] = useState(0)
  const total = gallery.length
  const current = gallery[index]

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total)
  }, [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  if (!current) return null

  return (
    <section className="px-4 py-5" aria-labelledby="gallery-heading">
      <h2
        id="gallery-heading"
        className="mb-1 bg-navy px-2 py-1 text-center font-sans text-[16px] font-bold text-white"
      >
        IMAGE ARCHIVE — CULTURAL ARTIFACTS
      </h2>
      <p className="mb-3 text-center font-serif text-[14px] text-black">
        Scanned relics recovered from 1996. Please do not right-click and Save As.
      </p>

      <div className="bevel-out bg-win p-2">
        <div className="bevel-in bg-black p-1">
          <GalleryImage src={current.src} alt={current.alt} />
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="btn95 flex items-center gap-1 px-3 py-1 font-mono text-[12px] text-black"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            PREV
          </button>

          <span className="font-mono text-[12px] font-bold text-black">
            IMAGE {index + 1} OF {total}
          </span>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="btn95 flex items-center gap-1 px-3 py-1 font-mono text-[12px] text-black"
          >
            NEXT
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        <figcaption className="mt-3 font-mono text-[11px] leading-tight text-black">
          <div className="font-bold text-[14px]">{current.title}</div>
          <div>Released: {current.releaseDate}</div>
          <div>Category: {current.category}</div>
          {current.description && (
            <p className="mt-2 font-serif text-[13px] leading-snug">{current.description}</p>
          )}
        </figcaption>

        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {gallery.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}: ${img.title}`}
              aria-current={i === index ? 'true' : undefined}
              className={`btn95 h-[10px] w-[10px] !min-w-0 !p-0 ${
                i === index ? 'bg-navy' : 'bg-win-shadow'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
