-- Groep B — Canada, Qatar, Zwitserland, Bosnië

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Canada
('Canada','Guatemala',1,0,'W','vriendschappelijk','2026-01-17','seed_can_1'),
('Canada','IJsland',2,2,'G','vriendschappelijk','2026-03-28','seed_can_2'),
('Canada','Tunesië',0,0,'G','vriendschappelijk','2026-03-31','seed_can_3'),
('Canada','Oezbekistan',2,0,'W','vriendschappelijk','2026-06-01','seed_can_4'),
('Canada','Ierland',1,1,'G','vriendschappelijk','2026-06-05','seed_can_5'),

-- Qatar
('Qatar','Palestina',0,1,'V','competitief','2025-12-01','seed_qat_1'),
('Qatar','Syrië',1,1,'G','competitief','2025-12-04','seed_qat_2'),
('Qatar','Tunesië',0,3,'V','competitief','2025-12-07','seed_qat_3'),
('Qatar','Ierland',0,1,'V','vriendschappelijk','2026-05-28','seed_qat_4'),
('Qatar','El Salvador',0,0,'G','vriendschappelijk','2026-06-06','seed_qat_5'),

-- Zwitserland
('Zwitserland','Kosovo',1,1,'G','competitief','2025-11-18','seed_sui_1'),
('Zwitserland','Duitsland',3,4,'V','vriendschappelijk','2026-03-27','seed_sui_2'),
('Zwitserland','Noorwegen',0,0,'G','vriendschappelijk','2026-03-31','seed_sui_3'),
('Zwitserland','Jordanië',4,1,'W','vriendschappelijk','2026-05-31','seed_sui_4'),
('Zwitserland','Australië',1,1,'G','vriendschappelijk','2026-06-06','seed_sui_5'),

-- Bosnië
('Bosnië','Wales',1,1,'W','competitief','2026-03-26','seed_bih_1'),
('Bosnië','Italië',1,1,'W','competitief','2026-03-31','seed_bih_2'),
('Bosnië','Noord-Macedonië',0,0,'G','vriendschappelijk','2026-05-29','seed_bih_3'),
('Bosnië','Panama',1,1,'G','vriendschappelijk','2026-06-06','seed_bih_4')
ON CONFLICT(team,match_id) DO NOTHING;
