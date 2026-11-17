import "server-only";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import catalog from "./catalog.json";
import type { Drama } from "./dramas";
let database: Database.Database | undefined;
function getDatabase() {
  if (database) return database;
  const directory = join(process.cwd(), ".data");
  mkdirSync(directory, { recursive: true });
  database = new Database(join(directory, "seoulscene.sqlite"));
  database.pragma("journal_mode = WAL");
  database.exec(
    "CREATE TABLE IF NOT EXISTS dramas (id INTEGER PRIMARY KEY, data TEXT NOT NULL)",
  );
  const insert = database.prepare(
    "INSERT OR IGNORE INTO dramas (id,data) VALUES (?,?)",
  );
  database.transaction(() => {
    for (const drama of catalog) insert.run(drama.id, JSON.stringify(drama));
  })();
  return database;
}
export function getDramas(): Drama[] {
  return (
    getDatabase().prepare("SELECT data FROM dramas").all() as { data: string }[]
  )
    .map((row) => JSON.parse(row.data) as Drama)
    .sort((a, b) => b.year - a.year);
}
