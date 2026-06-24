CREATE TABLE IF NOT EXISTS radar_runs (
  id                  TEXT PRIMARY KEY,
  run_date            TEXT NOT NULL,
  generated_at        TEXT NOT NULL,
  data_window         TEXT NOT NULL,
  source_summary      TEXT NOT NULL,
  trend_observations  TEXT NOT NULL,
  assumptions         TEXT NOT NULL,
  markdown_report     TEXT NOT NULL,
  source_file         TEXT,
  created_at          TEXT NOT NULL,
  updated_at          TEXT NOT NULL,
  UNIQUE(run_date, generated_at)
);

CREATE TABLE IF NOT EXISTS radar_projects (
  id          TEXT PRIMARY KEY,
  full_name   TEXT NOT NULL UNIQUE,
  url         TEXT NOT NULL,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS radar_project_entries (
  id                  TEXT PRIMARY KEY,
  run_id              TEXT NOT NULL,
  project_id          TEXT NOT NULL,
  section             TEXT NOT NULL CHECK(section IN ('top', 'watchlist', 'skip')),
  rank                INTEGER,
  category            TEXT,
  score               INTEGER CHECK(score IS NULL OR (score >= 0 AND score <= 100)),
  summary             TEXT,
  audience            TEXT,
  ai_native_angle     TEXT,
  growth_signal       TEXT,
  runnability         TEXT,
  recommended_action  TEXT,
  skip_reason         TEXT,
  raw_json            TEXT NOT NULL,
  created_at          TEXT NOT NULL,
  UNIQUE(run_id, project_id, section),
  FOREIGN KEY(run_id) REFERENCES radar_runs(id) ON DELETE CASCADE,
  FOREIGN KEY(project_id) REFERENCES radar_projects(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_radar_runs_generated_at ON radar_runs (generated_at);
CREATE INDEX IF NOT EXISTS idx_radar_projects_full_name ON radar_projects (full_name);
CREATE INDEX IF NOT EXISTS idx_radar_entries_run_section ON radar_project_entries (run_id, section);
CREATE INDEX IF NOT EXISTS idx_radar_entries_score ON radar_project_entries (score);
