-- Groep F — Nederland, Japan, Tunesië, Zweden

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Nederland
('Nederland','Polen',1,1,'G','competitief','2025-11-14','seed_ned_1'),
('Nederland','Litouwen',4,0,'W','competitief','2025-11-17','seed_ned_2'),
('Nederland','Noorwegen',2,1,'W','vriendschappelijk','2026-03-27','seed_ned_3'),
('Nederland','Ecuador',1,1,'G','vriendschappelijk','2026-03-31','seed_ned_4'),
('Nederland','Algerije',0,1,'V','vriendschappelijk','2026-06-03','seed_ned_5'),

-- Japan
('Japan','Ghana',2,0,'W','vriendschappelijk','2025-11-14','seed_jpn_1'),
('Japan','Bolivia',3,0,'W','vriendschappelijk','2025-11-18','seed_jpn_2'),
('Japan','Schotland',1,0,'W','vriendschappelijk','2026-03-28','seed_jpn_3'),
('Japan','Engeland',1,0,'W','vriendschappelijk','2026-03-31','seed_jpn_4'),
('Japan','IJsland',1,0,'W','vriendschappelijk','2026-05-31','seed_jpn_5'),

-- Tunesië
('Tunesië','Mali',1,1,'G','competitief','2026-01-03','seed_tun_1'),
('Tunesië','Haïti',1,0,'W','vriendschappelijk','2026-03-28','seed_tun_2'),
('Tunesië','Canada',0,0,'G','vriendschappelijk','2026-03-31','seed_tun_3'),
('Tunesië','Oostenrijk',0,1,'V','vriendschappelijk','2026-06-01','seed_tun_4'),
('Tunesië','België',0,5,'V','vriendschappelijk','2026-06-06','seed_tun_5'),

-- Zweden
('Zweden','Slovenië',1,1,'G','competitief','2025-11-18','seed_swe_1'),
('Zweden','Ukraïne',3,1,'W','competitief','2026-03-26','seed_swe_2'),
('Zweden','Polen',3,2,'W','competitief','2026-03-31','seed_swe_3'),
('Zweden','Noorwegen',1,3,'V','vriendschappelijk','2026-06-01','seed_swe_4'),
('Zweden','Griekenland',2,2,'G','vriendschappelijk','2026-06-04','seed_swe_5')
ON CONFLICT(team,match_id) DO NOTHING;
