import { gallery } from '@/lib/event-config'

export function Gallery() {
  return (
    <section className="px-4 py-5" aria-labelledby="gallery-heading">
      <h2
        id="gallery-heading"
        className="mb-1 bg-navy px-2 py-1 text-center font-sans text-[16px] font-bold text-white"
      >
        🖼 IMAGE ARCHIVE — CULTURAL ARTIFACTS
      </h2>
      <p className="mb-3 text-center font-serif text-[14px] text-black">
        Scanned relics recovered from 1996. Please do not right-click and Save As.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((img) => (
          <figure key={img.filename} className="bevel-out bg-win p-2">
            <div className="bevel-in bg-black p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src || '/placeholder.svg'}
                alt={img.alt}
                width={300}
                height={225}
                className="h-auto w-full"
                style={{ imageRendering: 'auto' }}
              />
            </div>
            <figcaption className="mt-2 font-mono text-[11px] leading-tight text-black">
              <div className="font-bold">{img.filename}</div>
              <div>Uploaded: {img.uploaded}</div>
              <div>Category: {img.category}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
