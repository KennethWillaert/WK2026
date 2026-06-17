-- Groep G — België, Iran, Egypte, Nieuw-Zeeland

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- België
('België','Liechtenstein',7,0,'W','competitief','2025-11-18','seed_bel_1'),
('België','VS',5,2,'W','vriendschappelijk','2026-03-28','seed_bel_2'),
('België','Mexico',1,1,'G','vriendschappelijk','2026-04-01','seed_bel_3'),
('België','Kroatië',2,0,'W','vriendschappelijk','2026-06-02','seed_bel_4'),
('België','Tunesië',5,0,'W','vriendschappelijk','2026-06-06','seed_bel_5'),

-- Iran
('Iran','Oezbekistan',0,0,'G','vriendschappelijk','2025-11-18','seed_irn_1'),
('Iran','Nigeria',1,2,'V','vriendschappelijk','2026-03-27','seed_irn_2'),
('Iran','Costa Rica',5,0,'W','vriendschappelijk','2026-03-31','seed_irn_3'),
('Iran','Gambia',3,1,'W','vriendschappelijk','2026-05-29','seed_irn_4'),
('Iran','Mali',2,0,'W','vriendschappelijk','2026-06-04','seed_irn_5'),

-- Egypte
('Egypte','Nigeria',0,0,'G','competitief','2026-01-17','seed_egy_1'),
('Egypte','Saoedi-Arabië',4,0,'W','vriendschappelijk','2026-03-27','seed_egy_2'),
('Egypte','Spanje',0,0,'G','vriendschappelijk','2026-03-30','seed_egy_3'),
('Egypte','Rusland',1,0,'W','vriendschappelijk','2026-05-28','seed_egy_4'),
('Egypte','Brazilië',1,2,'V','vriendschappelijk','2026-06-06','seed_egy_5'),

-- Nieuw-Zeeland
('Nieuw-Zeeland','Colombia',1,2,'V','vriendschappelijk','2025-11-16','seed_nzl_1'),
('Nieuw-Zeeland','Ecuador',0,2,'V','vriendschappelijk','2025-11-19','seed_nzl_2'),
('Nieuw-Zeeland','Chili',4,1,'W','vriendschappelijk','2026-03-30','seed_nzl_3'),
('Nieuw-Zeeland','Haïti',0,4,'V','vriendschappelijk','2026-06-03','seed_nzl_4'),
('Nieuw-Zeeland','Engeland',0,1,'V','vriendschappelijk','2026-06-06','seed_nzl_5')
ON CONFLICT(team,match_id) DO NOTHING;
