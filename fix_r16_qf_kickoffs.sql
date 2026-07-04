-- Fix m96 kickoff (was 00:00 Jul 8 CEST, correct is 22:00 Jul 7 CEST = 4PM ET)
UPDATE match_kickoffs SET kickoff=1783454400000, home_team='Zwitserland', away_team='Colombia' WHERE match_id='m96';

-- Fix alle R16 teamnamen in match_kickoffs
UPDATE match_kickoffs SET home_team='Canada',      away_team='Marokko'    WHERE match_id='m89';
UPDATE match_kickoffs SET home_team='Paraguay',    away_team='Frankrijk'  WHERE match_id='m90';
UPDATE match_kickoffs SET home_team='Brazilië',    away_team='Noorwegen'  WHERE match_id='m91';
UPDATE match_kickoffs SET home_team='Mexico',      away_team='Engeland'   WHERE match_id='m92';
UPDATE match_kickoffs SET home_team='Spanje',      away_team='Portugal'   WHERE match_id='m93';
UPDATE match_kickoffs SET home_team='België',      away_team='VS'         WHERE match_id='m94';
UPDATE match_kickoffs SET home_team='Egypte',      away_team='Argentinië' WHERE match_id='m95';

-- QF: echte teams + correcte kickoff tijden
INSERT OR REPLACE INTO match_kickoffs(match_id,kickoff,home_team,away_team,notified_soon,notified_unlock)
VALUES('m97',1783627200000,'Frankrijk','Marokko',0,0);    -- 09/07 22:00 CEST (4 PM ET)
INSERT OR REPLACE INTO match_kickoffs(match_id,kickoff,home_team,away_team,notified_soon,notified_unlock)
VALUES('m98',1783710000000,'Spanje','België',0,0);          -- 10/07 21:00 CEST (3 PM ET)
INSERT OR REPLACE INTO match_kickoffs(match_id,kickoff,home_team,away_team,notified_soon,notified_unlock)
VALUES('m99',1783803600000,'Brazilië','Engeland',0,0);      -- 11/07 23:00 CEST (5 PM ET)
INSERT OR REPLACE INTO match_kickoffs(match_id,kickoff,home_team,away_team,notified_soon,notified_unlock)
VALUES('m100',1783818000000,'Argentinië','Zwitserland',0,0); -- 12/07 03:00 CEST (9 PM ET)
