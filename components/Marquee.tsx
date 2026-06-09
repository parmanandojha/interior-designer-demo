export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee py-8 border-y hairline">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i} className="font-serif italic text-3xl md:text-5xl whitespace-nowrap">
            {t} <span className="px-6 opacity-30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
