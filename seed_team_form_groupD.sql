-- Groep D — VS, Australië, Paraguay, Turkije

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- VS
('VS','Uruguay',5,1,'W','vriendschappelijk','2025-11-18','seed_usa_1'),
('VS','België',2,5,'V','vriendschappelijk','2026-03-28','seed_usa_2'),
('VS','Portugal',0,2,'V','vriendschappelijk','2026-03-31','seed_usa_3'),
('VS','Senegal',3,2,'W','vriendschappelijk','2026-05-31','seed_usa_4'),
('VS','Duitsland',1,2,'V','vriendschappelijk','2026-06-06','seed_usa_5'),

-- Australië
('Australië','Colombia',0,3,'V','vriendschappelijk','2025-11-19','seed_aus_1'),
('Australië','Kameroen',1,0,'W','vriendschappelijk','2026-03-27','seed_aus_2'),
('Australië','Curaçao',5,1,'W','vriendschappelijk','2026-03-31','seed_aus_3'),
('Australië','Mexico',0,1,'V','vriendschappelijk','2026-05-31','seed_aus_4'),
('Australië','Zwitserland',1,1,'G','vriendschappelijk','2026-06-06','seed_aus_5'),

-- Paraguay
('Paraguay','Zuid-Korea',0,2,'V','vriendschappelijk','2025-10-14','seed_par_1'),
('Paraguay','Mexico',2,1,'W','vriendschappelijk','2025-11-19','seed_par_2'),
('Paraguay','Griekenland',1,0,'W','vriendschappelijk','2026-03-27','seed_par_3'),
('Paraguay','Marokko',1,2,'V','vriendschappelijk','2026-03-31','seed_par_4'),
('Paraguay','Nicaragua',4,0,'W','vriendschappelijk','2026-06-05','seed_par_5'),

-- Turkije
('Turkije','Georgië',4,1,'W','competitief','2025-10-14','seed_tur_1'),
('Turkije','Bulgarije',2,0,'W','competitief','2025-11-15','seed_tur_2'),
('Turkije','Spanje',2,2,'G','competitief','2025-11-18','seed_tur_3'),
('Turkije','Roemenië',1,0,'W','competitief','2026-03-26','seed_tur_4'),
('Turkije','Kosovo',1,0,'W','competitief','2026-03-31','seed_tur_5')
ON CONFLICT(team,match_id) DO NOTHING;
