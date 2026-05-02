import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

function readText(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!existsSync(filePath)) {
    return `# Missing\n\n- ${relativePath}\n`;
  }

  return readFileSync(filePath, "utf8").trim();
}

function run(command) {
  const [file, ...args] = command.split(" ");
  const result = spawnSync(file, args, {
    cwd: root,
    encoding: "utf8",
    shell: false,
  });

  if (result.status !== 0) {
    return "";
  }

  return (result.stdout || "").trim();
}

function limitLines(text, maxLines) {
  const lines = text.split(/\r?\n/);
  if (lines.length <= maxLines) {
    return text;
  }

  return `${lines.slice(0, maxLines).join("\n")}\n...`;
}

const branch = run("git branch --show-current");
const status = run("git status --short");

// Load scope summary
function scopeSummary() {
  const scopesPath = path.join(root, ".ai", "scopes.json");
  if (!existsSync(scopesPath)) return "- No scopes defined yet.";
  try {
    const data = JSON.parse(readFileSync(scopesPath, "utf8"));
    const lines = ["| Scope | Label | Files |", "|---|---|---|"];
    for (const [key, s] of Object.entries(data.scopes)) {
      lines.push(`| \`${key}\` | ${s.label} | ${s.files.join(", ")} |`);
    }
    lines.push("", "Load a scope: `node scripts/ai-scope.mjs --scope <name>`");
    return lines.join("\n");
  } catch {
    return "- Error reading scopes.json";
  }
}

const sections = [
  "# AI Context Snapshot",
  "",
  "## Repo",
  "",
  `- Root: ${root}`,
  `- Branch: ${branch || "(unknown)"}`,
  "",
  "## Scopes (use instead of reading whole repo)",
  "",
  scopeSummary(),
  "",
  "## Project Context",
  "",
  readText(".ai/project-context.md"),
  "",
  "## Current Focus",
  "",
  readText(".ai/current-focus.md"),
  "",
  "## Latest Handoff",
  "",
  readText(".ai/handoff.md"),
  "",
  "## Git Status",
  "",
  status
    ? "```text\n" + limitLines(status, 60) + "\n```"
    : "- Git status unavailable from Node in this environment. Run `git status --short` in shell if needed.",
];

process.stdout.write(sections.join("\n"));
