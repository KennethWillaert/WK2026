-- Groep E — Duitsland, Ecuador, Ivoorkust, Curaçao

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Duitsland
('Duitsland','Slowakije',6,0,'W','competitief','2025-11-17','seed_ger_1'),
('Duitsland','Zwitserland',4,3,'W','vriendschappelijk','2026-03-27','seed_ger_2'),
('Duitsland','Ghana',2,1,'W','vriendschappelijk','2026-03-30','seed_ger_3'),
('Duitsland','Finland',4,0,'W','vriendschappelijk','2026-05-31','seed_ger_4'),
('Duitsland','VS',2,1,'W','vriendschappelijk','2026-06-06','seed_ger_5'),

-- Ecuador (4 bevestigd — geen betrouwbare 5e gevonden)
('Ecuador','Marokko',1,1,'G','vriendschappelijk','2026-03-27','seed_ecu_1'),
('Ecuador','Nederland',1,1,'G','vriendschappelijk','2026-03-31','seed_ecu_2'),
('Ecuador','Saoedi-Arabië',2,1,'W','vriendschappelijk','2026-05-30','seed_ecu_3'),
('Ecuador','Guatemala',3,0,'W','vriendschappelijk','2026-06-07','seed_ecu_4'),

-- Ivoorkust
('Ivoorkust','Burkina Faso',3,0,'W','competitief','2026-01-06','seed_civ_1'),
('Ivoorkust','Egypte',2,3,'V','competitief','2026-01-10','seed_civ_2'),
('Ivoorkust','Zuid-Korea',4,0,'W','vriendschappelijk','2026-03-28','seed_civ_3'),
('Ivoorkust','Schotland',1,0,'W','vriendschappelijk','2026-03-31','seed_civ_4'),
('Ivoorkust','Frankrijk',2,1,'W','vriendschappelijk','2026-06-04','seed_civ_5'),

-- Curaçao
('Curaçao','Jamaica',0,0,'G','competitief','2025-11-19','seed_cur_1'),
('Curaçao','China',0,2,'V','vriendschappelijk','2026-03-26','seed_cur_2'),
('Curaçao','Australië',1,5,'V','vriendschappelijk','2026-03-31','seed_cur_3'),
('Curaçao','Schotland',1,4,'V','vriendschappelijk','2026-05-30','seed_cur_4'),
('Curaçao','Aruba',4,0,'W','vriendschappelijk','2026-06-06','seed_cur_5')
ON CONFLICT(team,match_id) DO NOTHING;
