-- ── R32 winners instellen ────────────────────────────────────────────────────
UPDATE results SET winner='Canada'      WHERE match_id='m73' AND winner IS NULL;
UPDATE results SET winner='Brazilië'    WHERE match_id='m74' AND winner IS NULL;
UPDATE results SET winner='Paraguay'    WHERE match_id='m75' AND winner IS NULL;
UPDATE results SET winner='Marokko'     WHERE match_id='m76' AND winner IS NULL;
UPDATE results SET winner='Noorwegen'   WHERE match_id='m77' AND winner IS NULL;
UPDATE results SET winner='Frankrijk'   WHERE match_id='m78' AND winner IS NULL;
UPDATE results SET winner='Mexico'      WHERE match_id='m79' AND winner IS NULL;
UPDATE results SET winner='Engeland'    WHERE match_id='m80' AND winner IS NULL;
UPDATE results SET winner='België'      WHERE match_id='m81' AND winner IS NULL;
UPDATE results SET winner='VS'          WHERE match_id='m82' AND winner IS NULL;
UPDATE results SET winner='Spanje'      WHERE match_id='m83' AND winner IS NULL;
UPDATE results SET winner='Portugal'    WHERE match_id='m84' AND winner IS NULL;
UPDATE results SET winner='Zwitserland' WHERE match_id='m85' AND winner IS NULL;
UPDATE results SET winner='Egypte'      WHERE match_id='m86' AND winner IS NULL;
UPDATE results SET winner='Argentinië'  WHERE match_id='m87' AND winner IS NULL;
UPDATE results SET winner='Colombia'    WHERE match_id='m88' AND winner IS NULL;

-- ── R16 scores + winners invoegen (ON CONFLICT = update winner als score al bestond) ──
INSERT INTO results(match_id,home_score,away_score,winner) VALUES('m89',1,3,'Marokko')
  ON CONFLICT(match_id) DO UPDATE SET winner='Marokko';
INSERT INTO results(match_id,home_score,away_score,winner) VALUES('m90',1,3,'Frankrijk')
  ON CONFLICT(match_id) DO UPDATE SET winner='Frankrijk';
INSERT INTO results(match_id,home_score,away_score,winner) VALUES('m91',4,3,'Brazilië')
  ON CONFLICT(match_id) DO UPDATE SET winner='Brazilië';
INSERT INTO results(match_id,home_score,away_score,winner) VALUES('m92',1,2,'Engeland')
  ON CONFLICT(match_id) DO UPDATE SET winner='Engeland';
INSERT INTO results(match_id,home_score,away_score,winner) VALUES('m93',2,1,'Spanje')
  ON CONFLICT(match_id) DO UPDATE SET winner='Spanje';
INSERT INTO results(match_id,home_score,away_score,winner) VALUES('m94',2,2,'België')
  ON CONFLICT(match_id) DO UPDATE SET winner='België';
INSERT INTO results(match_id,home_score,away_score,winner) VALUES('m95',0,2,'Argentinië')
  ON CONFLICT(match_id) DO UPDATE SET winner='Argentinië';
INSERT INTO results(match_id,home_score,away_score,winner) VALUES('m96',1,1,'Zwitserland')
  ON CONFLICT(match_id) DO UPDATE SET winner='Zwitserland';
