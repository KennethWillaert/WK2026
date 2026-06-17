-- Groep I — Frankrijk, Senegal, Noorwegen, Irak
-- Senegal-Marokko (18 jan AFCON-finale): op het veld 1-0 winst voor Senegal na verlenging,
-- later door CAF herzien naar 0-3 forfait-verlies (zie Marokko-aantekening Groep C).

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Frankrijk
('Frankrijk','Ukraïne',4,0,'W','competitief','2025-11-13','seed_fra_1'),
('Frankrijk','Azerbeidzjan',3,1,'W','competitief','2025-11-16','seed_fra_2'),
('Frankrijk','Brazilië',2,1,'W','vriendschappelijk','2026-03-26','seed_fra_3'),
('Frankrijk','Colombia',3,1,'W','vriendschappelijk','2026-03-29','seed_fra_4'),
('Frankrijk','Ivoorkust',1,2,'V','vriendschappelijk','2026-06-04','seed_fra_5'),

-- Senegal
('Senegal','Marokko',0,3,'V','competitief','2026-01-18','seed_sen_1'),
('Senegal','Peru',2,0,'W','vriendschappelijk','2026-03-28','seed_sen_2'),
('Senegal','Gambia',3,1,'W','vriendschappelijk','2026-03-31','seed_sen_3'),
('Senegal','VS',2,3,'V','vriendschappelijk','2026-05-31','seed_sen_4'),
('Senegal','Saoedi-Arabië',0,0,'G','vriendschappelijk','2026-06-09','seed_sen_5'),

-- Noorwegen
('Noorwegen','Italië',4,1,'W','competitief','2025-11-16','seed_nor_1'),
('Noorwegen','Nederland',1,2,'V','vriendschappelijk','2026-03-27','seed_nor_2'),
('Noorwegen','Zwitserland',0,0,'G','vriendschappelijk','2026-03-31','seed_nor_3'),
('Noorwegen','Zweden',3,1,'W','vriendschappelijk','2026-06-01','seed_nor_4'),
('Noorwegen','Marokko',1,1,'G','vriendschappelijk','2026-06-07','seed_nor_5'),

-- Irak
('Irak','Algerije',0,2,'V','competitief','2025-12-09','seed_irq_1'),
('Irak','Jordanië',0,1,'V','competitief','2025-12-12','seed_irq_2'),
('Irak','Bolivia',2,1,'W','competitief','2026-03-31','seed_irq_3'),
('Irak','Spanje',1,1,'G','vriendschappelijk','2026-06-04','seed_irq_4'),
('Irak','Venezuela',0,2,'V','vriendschappelijk','2026-06-09','seed_irq_5')
ON CONFLICT(team,match_id) DO NOTHING;
