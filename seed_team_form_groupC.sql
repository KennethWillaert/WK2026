-- Groep C — Brazilië, Marokko, Schotland, Haïti
-- Marokko-Senegal (18 jan): op het veld 0-1 verlies, later door CAF herzien naar 3-0
-- winst voor Marokko wegens forfait (walk-off Senegal in de finale). Hier als W/3-0 opgenomen.

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Brazilië
('Brazilië','Tunesië',1,1,'G','vriendschappelijk','2025-11-18','seed_bra_1'),
('Brazilië','Frankrijk',1,2,'V','vriendschappelijk','2026-03-26','seed_bra_2'),
('Brazilië','Kroatië',3,1,'W','vriendschappelijk','2026-04-01','seed_bra_3'),
('Brazilië','Panama',6,2,'W','vriendschappelijk','2026-05-31','seed_bra_4'),
('Brazilië','Egypte',2,1,'W','vriendschappelijk','2026-06-06','seed_bra_5'),

-- Marokko
('Marokko','Zambia',3,0,'W','competitief','2025-12-29','seed_mar_1'),
('Marokko','Tanzania',1,0,'W','competitief','2026-01-04','seed_mar_2'),
('Marokko','Kameroen',2,0,'W','competitief','2026-01-09','seed_mar_3'),
('Marokko','Nigeria',0,0,'W','competitief','2026-01-14','seed_mar_4'),
('Marokko','Senegal',3,0,'W','competitief','2026-01-18','seed_mar_5'),

-- Schotland
('Schotland','Griekenland',2,3,'V','competitief','2025-11-15','seed_sco_1'),
('Schotland','Denemarken',4,2,'W','competitief','2025-11-18','seed_sco_2'),
('Schotland','Japan',0,1,'V','vriendschappelijk','2026-03-28','seed_sco_3'),
('Schotland','Ivoorkust',0,1,'V','vriendschappelijk','2026-03-31','seed_sco_4'),
('Schotland','Curaçao',4,1,'W','vriendschappelijk','2026-05-30','seed_sco_5'),

-- Haïti
('Haïti','Nicaragua',2,0,'W','competitief','2025-11-19','seed_hai_1'),
('Haïti','Tunesië',0,1,'V','vriendschappelijk','2026-03-28','seed_hai_2'),
('Haïti','IJsland',1,1,'G','vriendschappelijk','2026-03-31','seed_hai_3'),
('Haïti','Nieuw-Zeeland',4,0,'W','vriendschappelijk','2026-06-03','seed_hai_4'),
('Haïti','Peru',1,2,'V','vriendschappelijk','2026-06-05','seed_hai_5')
ON CONFLICT(team,match_id) DO NOTHING;
