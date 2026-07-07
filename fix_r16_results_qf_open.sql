-- ── Corrigeer m91: Noorwegen won van Brazilië (2-1), niet andersom ────────────
INSERT INTO results(match_id,home_score,away_score,winner) VALUES('m91',1,2,'Noorwegen')
  ON CONFLICT(match_id) DO UPDATE SET home_score=1,away_score=2,winner='Noorwegen';

-- ── Zorg dat alle andere R16 winners correct staan ─────────────────────────────
INSERT OR IGNORE INTO results(match_id,home_score,away_score,winner) VALUES('m89',1,3,'Marokko');
UPDATE results SET winner='Marokko' WHERE match_id='m89';
INSERT OR IGNORE INTO results(match_id,home_score,away_score,winner) VALUES('m90',1,3,'Frankrijk');
UPDATE results SET winner='Frankrijk' WHERE match_id='m90';
INSERT OR IGNORE INTO results(match_id,home_score,away_score,winner) VALUES('m92',1,2,'Engeland');
UPDATE results SET winner='Engeland' WHERE match_id='m92';
INSERT OR IGNORE INTO results(match_id,home_score,away_score,winner) VALUES('m93',2,1,'Spanje');
UPDATE results SET winner='Spanje' WHERE match_id='m93';
INSERT OR IGNORE INTO results(match_id,home_score,away_score,winner) VALUES('m94',2,2,'België');
UPDATE results SET winner='België' WHERE match_id='m94';

-- ── match_kickoffs QF: echte teams ─────────────────────────────────────────────
UPDATE match_kickoffs SET home_team='Frankrijk', away_team='Marokko'  WHERE match_id='m97';
UPDATE match_kickoffs SET home_team='Spanje',    away_team='België'   WHERE match_id='m98';
UPDATE match_kickoffs SET home_team='Noorwegen', away_team='Engeland' WHERE match_id='m99';
-- m100 krijgt teams zodra m95/m96 gespeeld zijn (automatisch via sync + admin)
