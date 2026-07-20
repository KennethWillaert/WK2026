INSERT INTO results(match_id,home_score,away_score)
VALUES('bonus','{"champion":"Spanje","topscorer":"Mbappe","goals":10}',0)
ON CONFLICT(match_id) DO UPDATE SET
home_score='{"champion":"Spanje","topscorer":"Mbappe","goals":10}';
