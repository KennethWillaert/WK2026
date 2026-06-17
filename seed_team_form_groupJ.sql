-- Groep J — Argentinië, Oostenrijk, Algerije, Jordanië

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Argentinië
('Argentinië','Angola',2,0,'W','vriendschappelijk','2025-11-18','seed_arg_1'),
('Argentinië','Mauritanië',2,1,'W','vriendschappelijk','2026-03-27','seed_arg_2'),
('Argentinië','Zambia',5,0,'W','vriendschappelijk','2026-03-31','seed_arg_3'),
('Argentinië','Honduras',2,0,'W','vriendschappelijk','2026-06-06','seed_arg_4'),
('Argentinië','IJsland',3,0,'W','vriendschappelijk','2026-06-09','seed_arg_5'),

-- Oostenrijk
('Oostenrijk','Cyprus',2,0,'W','competitief','2025-10-11','seed_aut_1'),
('Oostenrijk','Bosnië',1,1,'G','competitief','2025-11-18','seed_aut_2'),
('Oostenrijk','Ghana',5,1,'W','vriendschappelijk','2026-03-27','seed_aut_3'),
('Oostenrijk','Zuid-Korea',1,0,'W','vriendschappelijk','2026-03-31','seed_aut_4'),
('Oostenrijk','Tunesië',1,0,'W','vriendschappelijk','2026-06-01','seed_aut_5'),

-- Algerije
('Algerije','Nigeria',0,2,'V','competitief','2026-01-10','seed_alg_1'),
('Algerije','Guatemala',7,0,'W','vriendschappelijk','2026-03-27','seed_alg_2'),
('Algerije','Uruguay',0,0,'G','vriendschappelijk','2026-03-31','seed_alg_3'),
('Algerije','Nederland',1,0,'W','vriendschappelijk','2026-06-03','seed_alg_4'),
('Algerije','Bolivia',4,0,'W','vriendschappelijk','2026-06-10','seed_alg_5'),

-- Jordanië
('Jordanië','Irak',1,0,'W','competitief','2025-12-12','seed_jor_1'),
('Jordanië','Saoedi-Arabië',1,0,'W','competitief','2025-12-15','seed_jor_2'),
('Jordanië','Marokko',2,3,'V','competitief','2025-12-18','seed_jor_3'),
('Jordanië','Costa Rica',2,2,'G','vriendschappelijk','2026-03-27','seed_jor_4'),
('Jordanië','Colombia',0,2,'V','vriendschappelijk','2026-06-07','seed_jor_5')
ON CONFLICT(team,match_id) DO NOTHING;
