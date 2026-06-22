# AI Daily Product Radar Roadmap

## Version 0: Public Repository Packaging

Goal: make the project understandable from the GitHub landing page.

- Product README
- MVP scope
- Quickstart
- Publishing target description
- Development workflow notes

## Version 1: Local Radar Board MVP

Goal: load a structured run and review many product cards at once.

- Radar data contract
- SQLite-backed run storage
- Seed run for demo
- Board columns: Top Picks, Watchlist, Skip / Low Signal, Published
- Project detail panel
- Yuque and Feishu output previews

## Version 2: Yuque and Feishu Publishing

Goal: close the publishing loop.

- Publish a daily Markdown report to Yuque
- Sync project cards into Feishu Base
- Store publish status per channel
- Show failure reasons and retry guidance

## Version 3: Real Daily Ingestion

Goal: connect the workbench to the existing daily radar workflow.

- Import `data/runs/YYYY-MM-DD.json`
- Read historical runs from SQLite
- De-duplicate projects across days
- Preserve source run metadata

## Version 4: Discovery Automation

Goal: turn the product board into a full daily automation system.

- GitHub Search/API collection
- README and root tree audit
- Product-shape scoring
- Consistency checks for Top / Watchlist / Skip classification
- Scheduled daily runs

## Not in the MVP

- Multi-user permissions
- Drag-and-drop workflow
- Complex statistics
- Automatic cloning or local runtime verification
- Feishu interactive cards
- Multi-source discovery beyond GitHub
