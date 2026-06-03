CREATE TABLE IF NOT EXISTS players (
  name TEXT PRIMARY KEY,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS predictions (
  player     TEXT NOT NULL,
  match_id   TEXT NOT NULL,
  home_score INTEGER NOT NULL,
  away_score INTEGER NOT NULL,
  PRIMARY KEY (player, match_id),
  FOREIGN KEY (player) REFERENCES players(name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS results (
  match_id   TEXT PRIMARY KEY,
  home_score INTEGER NOT NULL,
  away_score INTEGER NOT NULL
);
