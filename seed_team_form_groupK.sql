-- Groep K — Portugal, Colombia, Oezbekistan, DR Congo

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Portugal
('Portugal','Armenië',9,1,'W','competitief','2025-11-16','seed_por_1'),
('Portugal','Mexico',0,0,'G','vriendschappelijk','2026-03-28','seed_por_2'),
('Portugal','VS',2,0,'W','vriendschappelijk','2026-03-31','seed_por_3'),
('Portugal','Chili',2,1,'W','vriendschappelijk','2026-06-06','seed_por_4'),
('Portugal','Nigeria',2,1,'W','vriendschappelijk','2026-06-10','seed_por_5'),

-- Colombia
('Colombia','Australië',3,0,'W','vriendschappelijk','2025-11-15','seed_col_1'),
('Colombia','Kroatië',1,2,'V','vriendschappelijk','2025-11-18','seed_col_2'),
('Colombia','Frankrijk',1,3,'V','vriendschappelijk','2026-03-29','seed_col_3'),
('Colombia','Costa Rica',3,1,'W','vriendschappelijk','2026-05-29','seed_col_4'),
('Colombia','Jordanië',2,0,'W','vriendschappelijk','2026-06-07','seed_col_5'),

-- Oezbekistan
('Oezbekistan','China',2,2,'G','vriendschappelijk','2026-01-26','seed_uzb_1'),
('Oezbekistan','Gabon',3,1,'W','vriendschappelijk','2026-03-27','seed_uzb_2'),
('Oezbekistan','Venezuela',0,0,'W','vriendschappelijk','2026-03-30','seed_uzb_3'),
('Oezbekistan','Canada',0,2,'V','vriendschappelijk','2026-06-01','seed_uzb_4'),
('Oezbekistan','Nederland',1,2,'V','vriendschappelijk','2026-06-08','seed_uzb_5'),

-- DR Congo
('DR Congo','Senegal',0,0,'G','competitief','2026-01-10','seed_drc_1'),
('DR Congo','Jamaica',1,0,'W','competitief','2026-03-31','seed_drc_2'),
('DR Congo','Bermuda',2,0,'W','vriendschappelijk','2026-05-30','seed_drc_3'),
('DR Congo','Denemarken',0,0,'G','vriendschappelijk','2026-06-03','seed_drc_4'),
('DR Congo','Chili',1,2,'V','vriendschappelijk','2026-06-09','seed_drc_5')
ON CONFLICT(team,match_id) DO NOTHING;
