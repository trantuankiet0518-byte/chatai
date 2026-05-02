/**
 * ai-scope.mjs — Load context cho một scope cụ thể.
 *
 * Usage:
 *   node scripts/ai-scope.mjs --scope <scope-name>
 *   node scripts/ai-scope.mjs --scope <scope-name> --depth full
 *   node scripts/ai-scope.mjs --list
 *
 * Chỉ in ra files và context thuộc scope đó.
 * Agent dùng output này thay vì đọc toàn bộ repo → tiết kiệm token.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();

// --- helpers ----------------------------------------------------------------

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && i + 1 < process.argv.length ? process.argv[i + 1] : "";
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function readJSON(rel) {
  const full = path.join(root, rel);
  if (!existsSync(full)) return null;
  return JSON.parse(readFileSync(full, "utf8"));
}

function readText(rel) {
  const full = path.join(root, rel);
  if (!existsSync(full)) return `(not found: ${rel})`;
  return readFileSync(full, "utf8").trim();
}

/** Expand a glob-like pattern to real file paths (simple implementation). */
function expandGlob(pattern) {
  // Handle "dir/**" → all files recursively
  if (pattern.endsWith("/**")) {
    const dir = path.join(root, pattern.slice(0, -3));
    if (!existsSync(dir)) return [];
    return walk(dir).map((f) => path.relative(root, f));
  }
  // Handle "dir/*.ts" → files matching extension in dir
  if (pattern.includes("*")) {
    const dir = path.join(root, path.dirname(pattern));
    const ext = path.extname(pattern);
    if (!existsSync(dir)) return [];
    try {
      return readdirSync(dir)
        .filter((f) => f.endsWith(ext))
        .map((f) => path.relative(root, path.join(dir, f)));
    } catch {
      return [];
    }
  }
  // Literal path
  const full = path.join(root, pattern);
  return existsSync(full) ? [pattern] : [];
}

function walk(dir) {
  let results = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        results = results.concat(walk(full));
      } else {
        results.push(full);
      }
    }
  } catch { /* skip */ }
  return results;
}

function gitDiffForFiles(files) {
  if (!files.length) return "";
  const result = spawnSync("git", ["diff", "--name-only", "HEAD", "--", ...files], {
    cwd: root,
    encoding: "utf8",
    shell: false,
  });
  return (result.stdout || "").trim();
}

// --- main -------------------------------------------------------------------

const registry = readJSON(".ai/scopes.json");
if (!registry) {
  process.stderr.write("Error: .ai/scopes.json not found\n");
  process.exit(1);
}

const scopes = registry.scopes;

// --list: show all scopes
if (hasFlag("--list")) {
  const out = ["# Available Scopes", ""];
  for (const [key, s] of Object.entries(scopes)) {
    const fileCount = s.files.flatMap(expandGlob).length;
    out.push(`- **${key}** — ${s.label} (${fileCount} files)`);
    out.push(`  ${s.description}`);
    if (s.deps.length) out.push(`  deps: ${s.deps.join(", ")}`);
  }
  process.stdout.write(out.join("\n") + "\n");
  process.exit(0);
}

// --scope <name>
const scopeName = arg("--scope");
if (!scopeName) {
  process.stderr.write("Usage: node scripts/ai-scope.mjs --scope <name> | --list\n");
  process.exit(1);
}

const scope = scopes[scopeName];
if (!scope) {
  process.stderr.write(`Error: scope "${scopeName}" not found. Use --list to see available scopes.\n`);
  process.exit(1);
}

const depth = arg("--depth") || "summary"; // "summary" | "full"

// Expand file lists
const writableFiles = scope.files.flatMap(expandGlob);
const contextFiles = (scope.context || []).flatMap(expandGlob);
const readonlyFiles = (scope.readonly || []).flatMap(expandGlob);

// Collect changed files (intersection with scope)
const allScopeFiles = [...new Set([...writableFiles, ...contextFiles, ...readonlyFiles])];
const changedRaw = gitDiffForFiles(allScopeFiles);
const changedFiles = changedRaw ? changedRaw.split("\n").filter(Boolean) : [];

// Build output
const out = [];
out.push(`# Scope: ${scopeName} — ${scope.label}`);
out.push("");
out.push(`> ${scope.description}`);
out.push("");

if (scope.deps.length) {
  out.push(`Dependencies: ${scope.deps.map((d) => "`" + d + "`").join(", ")}`);
  out.push("");
}

out.push("## Writable files (you CAN edit these)");
out.push("");
if (writableFiles.length) {
  writableFiles.forEach((f) => out.push(`- ${f}`));
} else {
  out.push("- (none found)");
}
out.push("");

if (readonlyFiles.length) {
  out.push("## Readonly files (read for context, do NOT edit)");
  out.push("");
  readonlyFiles.forEach((f) => out.push(`- 🔒 ${f}`));
  out.push("");
}

if (changedFiles.length) {
  out.push("## Changed (uncommitted) in this scope");
  out.push("");
  changedFiles.forEach((f) => out.push(`- ⚡ ${f}`));
  out.push("");
}

// In depth=full mode, print context file contents
if (depth === "full" && contextFiles.length) {
  out.push("## Context file contents");
  out.push("");
  for (const cf of contextFiles) {
    const content = readText(cf);
    const lines = content.split("\n");
    const truncated = lines.length > 80 ? lines.slice(0, 80).join("\n") + "\n... (truncated)" : content;
    out.push(`### ${cf}`);
    out.push("");
    out.push("```typescript");
    out.push(truncated);
    out.push("```");
    out.push("");
  }
}

// Summary of off-scope deps context
if (scope.deps.length) {
  out.push("## Dependency scopes (ask for separate load if needed)");
  out.push("");
  for (const dep of scope.deps) {
    const ds = scopes[dep];
    if (ds) {
      out.push(`- **${dep}**: ${ds.description}`);
    }
  }
  out.push("");
}

out.push("## Rules");
out.push("");
out.push("- Only edit files listed under **Writable files**");
out.push("- Read **Readonly files** for context but never modify them");
out.push("- If you need files outside this scope, request a scope expansion");
out.push("- Update `.ai/handoff.md` when done with scope: `" + scopeName + "`");
out.push("");

process.stdout.write(out.join("\n"));
