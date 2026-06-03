CREATE TABLE IF NOT EXISTS bonus_predictions (
  player      TEXT PRIMARY KEY,
  champion    TEXT,
  topscorer   TEXT,
  goals       INTEGER,
  FOREIGN KEY (player) REFERENCES players(name) ON DELETE CASCADE
);
