import { TICKER_ITEMS } from "../data/site";

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="ticker-shell relative overflow-hidden border-y-2 border-ink-950 bg-brass-400"
      aria-hidden="true"
    >
      <div className="ticker-track flex w-max">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 whitespace-nowrap px-6 py-3.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.22em] text-ink-900"
          >
            <svg viewBox="0 0 8 8" className="h-2 w-2 fill-ink-950">
              <path d="M4 0 8 4 4 8 0 4Z" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
