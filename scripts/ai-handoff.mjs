import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const handoffPath = path.join(root, ".ai", "handoff.md");
const focusPath = path.join(root, ".ai", "current-focus.md");

function argValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || index === process.argv.length - 1) {
    return "";
  }

  return process.argv[index + 1];
}

function listValue(flag) {
  const value = argValue(flag);
  if (!value) {
    return ["- "];
  }

  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `- ${item}`);
}

function nowStamp() {
  return new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "Asia/Bangkok",
  })
    .format(new Date())
    .replace(",", "");
}

function readMaybe(filePath) {
  if (!existsSync(filePath)) {
    return "";
  }

  return readFileSync(filePath, "utf8");
}

const owner = argValue("--owner") || "unassigned";
const goal = argValue("--goal") || "";
const scope = argValue("--scope") || "";
const next = argValue("--next") || "";
const files = listValue("--files");
const checks = listValue("--checks");
const blockers = listValue("--blockers");

const handoff = [
  "# Latest Handoff",
  "",
  "Goal:",
  "",
  `- ${goal}`,
  "",
  "Owner:",
  "",
  `- ${owner}`,
  "",
  "Scope:",
  "",
  `- ${scope}`,
  "",
  "Files touched:",
  "",
  ...files,
  "",
  "Checks run:",
  "",
  ...checks,
  "",
  "Blockers:",
  "",
  ...blockers,
  "",
  "Next step:",
  "",
  `- ${next}`,
  "",
  "Updated:",
  "",
  `- ${nowStamp()} ICT`,
  "",
].join("\n");

writeFileSync(handoffPath, handoff, "utf8");

const currentFocus = readMaybe(focusPath);
if (currentFocus) {
  const ownerBlock = [
    "Active harness owner:",
    "",
    `- Owner: \`${owner}\``,
    `- Scope: \`${scope}\``,
    `- Goal: ${goal || "`" + "" + "`"}`,
    `- Started: ${nowStamp()} ICT`,
  ].join("\n");

  const updatedFocus = currentFocus.replace(
    /Active harness owner:\r?\n\r?\n(?:- .*\r?\n)*/m,
    `${ownerBlock}\n`,
  );

  writeFileSync(focusPath, updatedFocus, "utf8");
}

process.stdout.write(`Updated ${path.relative(root, handoffPath)}\n`);
