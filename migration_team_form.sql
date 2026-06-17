CREATE TABLE IF NOT EXISTS team_form (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team TEXT NOT NULL,
  opponent TEXT NOT NULL,
  goals_for INTEGER NOT NULL,
  goals_against INTEGER NOT NULL,
  result TEXT NOT NULL CHECK(result IN ('W','G','V')),
  category TEXT NOT NULL CHECK(category IN ('vriendschappelijk','competitief','wk_groep','wk_knockout')),
  match_date TEXT NOT NULL,
  match_id TEXT,
  UNIQUE(team, match_id)
);
CREATE INDEX IF NOT EXISTS idx_team_form_team_date ON team_form(team, match_date);
