"use client";
import Image from "next/image";
import { ArrowRight, Heart, Menu, Moon, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EditorialLink } from "./editorial-link";
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
  const icons = {
    heart: Heart,
    search: Search,
    moon: Moon,
    menu: Menu,
    close: X,
  };
  const Glyph = icons[name as keyof typeof icons] || ArrowRight;
  return (
    <Glyph
      className={className}
      size={20}
      strokeWidth={1.5}
      aria-hidden="true"
    />
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
  const pathname = usePathname();
  const { ids } = useContext(Saved);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" href="/">
          <span className="brand-stamp">
            서<br />울
          </span>
          <span>
            SeoulScene
            <span className="brand-sub">서울씬 · STORIES THAT STAY</span>
          </span>
        </Link>
        <nav
          id="main-navigation"
          className={open ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              document.getElementById("menu-toggle")?.focus();
            }
          }}
        >
          {[
            ["Home", "/"],
            ["Dramas", "/dramas"],
            ["Reviews", "/reviews"],
            ["News", "/news"],
            ["Actors", "/actors"],
            ["Airing Calendar", "/calendar"],
            ["K-Culture", "/culture"],
          ].map(([t, h]) => (
            <EditorialLink
              key={h}
              href={h}
              aria-current={pathname === h ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t}
            </EditorialLink>
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
          <Link
            href="/watchlist"
            className="nav-watch"
            aria-label={`My watchlist${ids.length ? ` (${ids.length})` : ""}`}
          >
            <Icon name="heart" />
            <span>My watchlist{ids.length ? ` (${ids.length})` : ""}</span>
          </Link>
          <button
            id="menu-toggle"
            className="icon-button mobile-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
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
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
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
        {typeof drama.rating === "number" &&
          (drama.id > 0 || drama.ratingSource) && (
            <span title={drama.ratingSource || "TMDB community rating"}>
              {drama.ratingSource || "TMDB"} {drama.rating.toFixed(1)}
            </span>
          )}
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
