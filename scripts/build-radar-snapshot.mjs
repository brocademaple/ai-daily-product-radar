#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')

function parseArgs(argv) {
  const args = {
    runsDir: path.join(repoRoot, 'data', 'runs'),
    out: path.join(repoRoot, 'frontend', 'public', 'radar-snapshot.json'),
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--runs-dir') {
      args.runsDir = path.resolve(argv[index + 1] ?? '')
      index += 1
    } else if (arg === '--out') {
      args.out = path.resolve(argv[index + 1] ?? '')
      index += 1
    } else if (arg === '--help' || arg === '-h') {
      printHelp()
      process.exit(0)
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  return args
}

function printHelp() {
  console.log(`Usage: node scripts/build-radar-snapshot.mjs [--runs-dir data/runs] [--out frontend/public/radar-snapshot.json]`)
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function valueOrNull(value) {
  return isNonEmptyString(value) ? value : null
}

function isProjectItem(value) {
  return (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    isNonEmptyString(value.full_name) &&
    isNonEmptyString(value.url)
  )
}

function isCompleteRunPayload(value) {
  return (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    isNonEmptyString(value.run_date) &&
    isNonEmptyString(value.generated_at) &&
    isNonEmptyString(value.data_window) &&
    isNonEmptyString(value.source_summary) &&
    isNonEmptyString(value.trend_observations) &&
    isNonEmptyString(value.assumptions) &&
    isNonEmptyString(value.markdown_report) &&
    Array.isArray(value.top_projects) &&
    Array.isArray(value.watchlist) &&
    Array.isArray(value.skipped_projects) &&
    value.top_projects.every(isProjectItem) &&
    value.watchlist.every(isProjectItem) &&
    value.skipped_projects.every(isProjectItem)
  )
}

function entryFromItem(item, run, sourceFile, section, fallbackRank) {
  return {
    runDate: run.run_date,
    generatedAt: run.generated_at,
    sourceFile,
    section,
    rank: Number.isInteger(item.rank) && item.rank > 0 ? item.rank : section === 'skip' ? null : fallbackRank,
    fullName: item.full_name,
    url: item.url,
    category: valueOrNull(item.category),
    score: Number.isInteger(item.score) && item.score >= 0 && item.score <= 100 ? item.score : null,
    summary: valueOrNull(item.summary),
    audience: valueOrNull(item.audience),
    aiNativeAngle: valueOrNull(item.ai_native_angle),
    growthSignal: valueOrNull(item.growth_signal),
    runnability: valueOrNull(item.runnability),
    recommendedAction: valueOrNull(item.recommended_action),
    skipReason: valueOrNull(item.skip_reason),
    rawJson: item,
  }
}

function normalizeRun(payload, sourceFile) {
  const entries = [
    ...payload.top_projects.map((item, index) => entryFromItem(item, payload, sourceFile, 'top', index + 1)),
    ...payload.watchlist.map((item, index) => entryFromItem(item, payload, sourceFile, 'watchlist', index + 1)),
    ...payload.skipped_projects.map((item, index) => entryFromItem(item, payload, sourceFile, 'skip', index + 1)),
  ]
  const id = `run:${payload.run_date}:${payload.generated_at}`

  return {
    payload,
    entries,
    run: {
      id,
      runDate: payload.run_date,
      generatedAt: payload.generated_at,
      dataWindow: payload.data_window,
      sourceSummary: payload.source_summary,
      trendObservations: payload.trend_observations,
      assumptions: payload.assumptions,
      markdownReport: payload.markdown_report,
      sourceFile,
      entryCount: entries.length,
    },
  }
}

function compareEntryDesc(a, b) {
  return b.generatedAt.localeCompare(a.generatedAt) || b.runDate.localeCompare(a.runDate)
}

function sectionToBoardStatus(section) {
  if (section === 'top') return 'top-picks'
  if (section === 'watchlist') return 'watchlist'
  return 'skip-low-signal'
}

function firstPresent(history, field) {
  const entry = history.find((item) => item[field] !== null)
  return entry ? entry[field] : null
}

function entryId(fullName, generatedAt, section, index) {
  const repoId = fullName.replace(/[^a-zA-Z0-9_.-]+/g, '-')
  return `${repoId}:${generatedAt}:${section}:${index}`
}

function buildProjectBoard(normalizedRuns) {
  const byRepo = new Map()

  for (const run of normalizedRuns) {
    for (const entry of run.entries) {
      const current = byRepo.get(entry.fullName) ?? []
      current.push({ ...entry, runId: run.run.id })
      byRepo.set(entry.fullName, current)
    }
  }

  return Array.from(byRepo.entries())
    .map(([fullName, entries]) => {
      const history = entries.sort(compareEntryDesc).map((entry, index) => ({
        id: entryId(entry.fullName, entry.generatedAt, entry.section, index),
        runId: entry.runId,
        runDate: entry.runDate,
        generatedAt: entry.generatedAt,
        section: entry.section,
        rank: entry.rank,
        fullName: entry.fullName,
        url: entry.url,
        category: entry.category,
        score: entry.score,
        summary: entry.summary,
        audience: entry.audience,
        aiNativeAngle: entry.aiNativeAngle,
        growthSignal: entry.growthSignal,
        runnability: entry.runnability,
        recommendedAction: entry.recommendedAction,
        skipReason: entry.skipReason,
        rawJson: entry.rawJson,
      }))
      const latest = history[0]
      const scores = history.map((entry) => entry.score).filter((score) => score !== null)

      return {
        fullName,
        url: latest.url,
        firstSeenDate: history[history.length - 1].runDate,
        lastSeenDate: latest.runDate,
        seenCount: history.length,
        bestScore: scores.length ? Math.max(...scores) : null,
        latestScore: latest.score,
        latestSection: latest.section,
        boardStatus: sectionToBoardStatus(latest.section),
        category: firstPresent(history, 'category'),
        summary: firstPresent(history, 'summary'),
        audience: firstPresent(history, 'audience'),
        aiNativeAngle: firstPresent(history, 'aiNativeAngle'),
        growthSignal: firstPresent(history, 'growthSignal'),
        runnability: firstPresent(history, 'runnability'),
        recommendedAction: firstPresent(history, 'recommendedAction'),
        skipReason: latest.skipReason,
        history,
      }
    })
    .sort((a, b) => {
      const scoreDiff = (b.bestScore ?? -1) - (a.bestScore ?? -1)
      return scoreDiff || b.lastSeenDate.localeCompare(a.lastSeenDate) || a.fullName.localeCompare(b.fullName)
    })
}

async function loadRuns(runsDir) {
  if (!existsSync(runsDir)) {
    throw new Error(`Runs directory does not exist: ${runsDir}`)
  }

  const files = (await readdir(runsDir)).filter((file) => file.endsWith('.json')).sort()
  const runs = []
  const skipped = []

  for (const file of files) {
    const fullPath = path.join(runsDir, file)
    try {
      const payload = JSON.parse(await readFile(fullPath, 'utf8'))
      if (isCompleteRunPayload(payload)) {
        runs.push(normalizeRun(payload, file))
      } else {
        skipped.push(file)
      }
    } catch (error) {
      throw new Error(`Cannot parse ${fullPath}: ${error.message}`)
    }
  }

  return { runs, skipped }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const { runs, skipped } = await loadRuns(args.runsDir)
  const sortedRuns = [...runs].sort((a, b) => b.run.generatedAt.localeCompare(a.run.generatedAt) || b.run.runDate.localeCompare(a.run.runDate))
  const projectsWithHistory = buildProjectBoard(sortedRuns)
  const histories = Object.fromEntries(projectsWithHistory.map((project) => [project.fullName, project.history]))
  const projects = projectsWithHistory.map(({ history, ...project }) => project)
  const snapshot = {
    runs: sortedRuns.map((run) => run.run),
    projects,
    histories,
  }

  await mkdir(path.dirname(args.out), { recursive: true })
  await writeFile(args.out, `${JSON.stringify(snapshot, null, 2)}\n`)

  const historyCount = Object.values(histories).reduce((total, history) => total + history.length, 0)
  console.log(
    JSON.stringify(
      {
        out: path.relative(repoRoot, args.out),
        importedRuns: snapshot.runs.length,
        projects: snapshot.projects.length,
        historyEntries: historyCount,
        latestRunDate: snapshot.runs[0]?.runDate ?? null,
        skippedFiles: skipped,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
