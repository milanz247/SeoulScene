import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import Database from "better-sqlite3";
const directory = mkdtempSync(join(tmpdir(), "seoulscene-sync-"));
const script = fileURLToPath(new URL("./sync-tmdb.mjs", import.meta.url));
const seed = JSON.parse(
  readFileSync(new URL("../lib/catalog.json", import.meta.url), "utf8"),
);
function run(bootstrap, token = "test-token") {
  return spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `${bootstrap};await import(${JSON.stringify(script)})`,
    ],
    {
      cwd: directory,
      env: { ...process.env, TMDB_READ_ACCESS_TOKEN: token },
      encoding: "utf8",
    },
  );
}
const missing = run("", "");
assert.equal(missing.status, 1);
assert.match(missing.stderr, /Set TMDB_READ_ACCESS_TOKEN/);
assert(!existsSync(join(directory, ".data/seoulscene.sqlite")));
const valid = `const seed=${JSON.stringify(seed)};globalThis.fetch=async url=>{const id=Number(new URL(url).pathname.split('/').pop());const d=seed.find(d=>d.id===id);return new Response(JSON.stringify({id,name:d.title,original_name:d.korean,overview:d.overview,genres:d.genres.map(name=>({name})),number_of_episodes:d.episodes,status:d.status,first_air_date:d.year+'-01-01',credits:{cast:d.cast}}),{status:200})}`;
const success = run(valid);
assert.equal(success.status, 0, success.stderr);
const db = new Database(join(directory, ".data/seoulscene.sqlite"));
const before = db.prepare("SELECT * FROM dramas ORDER BY id").all();
assert.equal(before.length, seed.length);
const invalid = run(
  `let calls=0;globalThis.fetch=async()=>{calls++;return new Response(JSON.stringify({id:0}),{status:200})}`,
);
assert.equal(invalid.status, 1);
assert.match(invalid.stderr, /Invalid metadata/);
assert.deepEqual(db.prepare("SELECT * FROM dramas ORDER BY id").all(), before);
const offline = run(
  `globalThis.fetch=async()=>{throw new Error('Network unavailable')}`,
);
assert.equal(offline.status, 1);
assert.deepEqual(db.prepare("SELECT * FROM dramas ORDER BY id").all(), before);
db.close();
console.log(
  "Sync checks passed: missing credentials, successful transaction, invalid metadata, and network failure preserve existing records.",
);
