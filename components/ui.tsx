"use client";
import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type { Drama } from "@/lib/dramas";
const Saved = createContext<{ ids: number[]; toggle: (id: number) => void }>({
  ids: [],
  toggle: () => {},
});
const emptyIds: number[] = [];
let savedSnapshot: number[] = emptyIds;
let savedRaw: string | null = null;
function getSnapshot() {
  try {
    const raw = localStorage.getItem("seoulscene-watchlist");
    if (raw !== savedRaw) {
      savedRaw = raw;
      const value = JSON.parse(raw || "[]");
      savedSnapshot = Array.isArray(value)
        ? value.filter((id: unknown) => typeof id === "number")
        : emptyIds;
    }
    return savedSnapshot;
  } catch {
    return emptyIds;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("watchlist-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("watchlist-change", callback);
  };
}
export function Preferences({ children }: { children: React.ReactNode }) {
  const ids = useSyncExternalStore(subscribe, getSnapshot, () => emptyIds);
  useEffect(() => {
    try {
      if (localStorage.getItem("seoulscene-theme") === "dark")
        document.documentElement.dataset.theme = "dark";
    } catch {}
  }, []);
  function toggle(id: number) {
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    savedSnapshot = next;
    try {
      localStorage.setItem("seoulscene-watchlist", JSON.stringify(next));
      savedRaw = JSON.stringify(next);
    } catch {}
    window.dispatchEvent(new Event("watchlist-change"));
  }
  return <Saved.Provider value={{ ids, toggle }}>{children}</Saved.Provider>;
}
export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "heart" ? (
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      ) : name === "search" ? (
        <>
          <circle cx="10.5" cy="10.5" r="7" />
          <path d="m16 16 5 5" />
        </>
      ) : name === "moon" ? (
        <path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z" />
      ) : name === "menu" ? (
        <path d="M4 6h16M4 12h16M4 18h16" />
      ) : name === "close" ? (
        <path d="m5 5 14 14M5 19 19 5" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function SaveButton({
  id,
  full = false,
}: {
  id: number;
  full?: boolean;
}) {
  const { ids, toggle } = useContext(Saved);
  const saved = ids.includes(id);
  return (
    <button
      className={`${full ? "button secondary" : "save"} ${saved ? "saved" : ""}`}
      onClick={() => toggle(id)}
      aria-label={`${saved ? "Remove from" : "Add to"} watchlist`}
      aria-pressed={saved}
    >
      <Icon name="heart" />
      {full && (saved ? "In your watchlist" : "Add to watchlist")}
    </button>
  );
}
export function Nav() {
  const [open, setOpen] = useState(false);
  const { ids } = useContext(Saved);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" href="/" aria-label="SeoulScene home">
          <span className="brand-stamp">
            서<br />울
          </span>
          <span>
            SeoulScene
            <span className="brand-sub">서울씬 · STORIES THAT STAY</span>
          </span>
        </Link>
        <nav
          className={open ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
        >
          {[
            ["Home", "/"],
            ["Explore Dramas", "/explore"],
            ["Actors", "/actors"],
            ["Airing Calendar", "/calendar"],
            ["K-Culture", "/culture"],
          ].map(([t, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}>
              {t}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link
            href="/explore"
            className="icon-button"
            aria-label="Search dramas"
          >
            <Icon name="search" />
          </Link>
          <button
            className="icon-button"
            aria-label="Toggle color theme"
            onClick={() => {
              const next = document.documentElement.dataset.theme !== "dark";
              document.documentElement.dataset.theme = next ? "dark" : "light";
              try {
                localStorage.setItem(
                  "seoulscene-theme",
                  next ? "dark" : "light",
                );
              } catch {}
            }}
          >
            <Icon name="moon" />
          </button>
          <Link href="/watchlist" className="nav-watch">
            <Icon name="heart" />
            <span>My watchlist{ids.length ? ` (${ids.length})` : ""}</span>
          </Link>
          <button
            className="icon-button mobile-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
export function Photo({
  src,
  alt,
  fill = true,
  priority = false,
  sizes = "(max-width: 600px) 50vw, 25vw",
  className = "",
}: {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? "/images/fallback.svg" : src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : 800}
      height={fill ? undefined : 500}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
export function DramaCard({ drama, index }: { drama: Drama; index?: number }) {
  return (
    <article className="drama-card">
      <div className="poster">
        <Link href={`/dramas/${drama.id}`}>
          <Photo src={drama.poster} alt={`${drama.title} poster`} />
        </Link>
        {index !== undefined && (
          <span className="card-number">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <SaveButton id={drama.id} />
      </div>
      <div className="card-meta">
        <span>
          {drama.year} <b>·</b> {drama.genres[0]}
        </span>
        {drama.rating && <span>★ {drama.rating.toFixed(1)}</span>}
      </div>
      <h3>
        <Link href={`/dramas/${drama.id}`}>{drama.title}</Link>
      </h3>
      <p lang="ko" className="korean-title">
        {drama.korean}
      </p>
    </article>
  );
}
export function Watchlist({ dramas }: { dramas: Drama[] }) {
  const { ids } = useContext(Saved);
  const items = dramas.filter((d) => ids.includes(d.id));
  return items.length ? (
    <div className="drama-grid">
      {items.map((d) => (
        <DramaCard key={d.id} drama={d} />
      ))}
    </div>
  ) : (
    <div className="empty">
      <span>♡</span>
      <h2>A place for your next obsession.</h2>
      <p>
        Tap the heart on any drama to keep its story close. Your list is saved
        on this browser.
      </p>
      <Link className="button" href="/explore">
        Find your first story <Icon name="arrow" />
      </Link>
    </div>
  );
}
