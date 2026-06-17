-- Groep H — Spanje, Uruguay, Saoedi-Arabië, Kaapverdië
-- Spanje en Uruguay: slechts 3-4 bevestigde wedstrijden, geen betrouwbare extra bron gevonden

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Spanje
('Spanje','Egypte',0,0,'G','vriendschappelijk','2026-03-30','seed_esp_1'),
('Spanje','Irak',1,1,'G','vriendschappelijk','2026-06-04','seed_esp_2'),
('Spanje','Peru',3,1,'W','vriendschappelijk','2026-06-08','seed_esp_3'),

-- Uruguay
('Uruguay','Oezbekistan',2,1,'W','vriendschappelijk','2025-10-13','seed_uru_1'),
('Uruguay','Mexico',0,0,'G','vriendschappelijk','2025-11-16','seed_uru_2'),
('Uruguay','VS',1,5,'V','vriendschappelijk','2025-11-19','seed_uru_3'),
('Uruguay','Engeland',1,1,'G','vriendschappelijk','2026-03-27','seed_uru_4'),

-- Saoedi-Arabië
('Saoedi-Arabië','Jordanië',0,1,'V','competitief','2025-12-15','seed_ksa_1'),
('Saoedi-Arabië','VAE',0,0,'G','competitief','2025-12-18','seed_ksa_2'),
('Saoedi-Arabië','Egypte',0,4,'V','vriendschappelijk','2026-03-27','seed_ksa_3'),
('Saoedi-Arabië','Servië',1,2,'V','vriendschappelijk','2026-03-31','seed_ksa_4'),
('Saoedi-Arabië','Ecuador',1,2,'V','vriendschappelijk','2026-05-30','seed_ksa_5'),

-- Kaapverdië
('Kaapverdië','Egypte',1,1,'G','vriendschappelijk','2025-11-13','seed_cpv_1'),
('Kaapverdië','Chili',2,4,'V','vriendschappelijk','2025-11-17','seed_cpv_2'),
('Kaapverdië','Finland',1,1,'W','vriendschappelijk','2026-03-29','seed_cpv_3'),
('Kaapverdië','Servië',3,0,'W','vriendschappelijk','2026-05-31','seed_cpv_4'),
('Kaapverdië','Bermuda',3,0,'W','vriendschappelijk','2026-06-06','seed_cpv_5')
ON CONFLICT(team,match_id) DO NOTHING;
