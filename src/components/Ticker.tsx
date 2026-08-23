import { TICKER_ITEMS } from "../data/site";

export default function Ticker() {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center"
    >
      {TICKER_ITEMS.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex items-center gap-6 whitespace-nowrap px-6 py-3.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.22em] text-ink-900"
        >
          {item}
          <svg viewBox="0 0 8 8" className="h-2 w-2 text-ink-900/60" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="ticker-shell overflow-hidden border-y border-ink-900/25 bg-brass-300">
      <div className="ticker-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
