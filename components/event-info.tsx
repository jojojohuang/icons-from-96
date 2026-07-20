import { event } from '@/lib/event-config'

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <th
        scope="row"
        className="border-2 border-win-shadow bg-navy px-3 py-2 text-left align-top font-sans text-[13px] font-bold text-white"
      >
        {label}
      </th>
      <td className="border-2 border-win-shadow bg-white px-3 py-2 font-serif text-[16px] text-black">
        {children}
      </td>
    </tr>
  )
}

export function EventInfo() {
  return (
    <section className="px-4 py-5" aria-labelledby="event-heading">
      <h2
        id="event-heading"
        className="mb-3 bg-navy px-2 py-1 text-center font-sans text-[16px] font-bold text-white"
      >
        ═══ EVENT INFORMATION ═══
      </h2>

      <table className="w-full border-collapse" style={{ border: '2px solid #808080' }}>
        <tbody>
          <Row label="WHEN">
            {event.when.date}
            <br />
            {event.when.time}
          </Row>
          <Row label="WHERE">
            {event.where.line1}
            <br />
            {event.where.line2}
          </Row>
          <Row label="DRESS CODE">
            <span className="font-sans font-black text-hween-orange">
              ★ {event.dressCode.title} ★
            </span>
            <br />
            <span className="text-[14px]">{event.dressCode.blurb}</span>
          </Row>
        </tbody>
      </table>
    </section>
  )
}
