-- Groep L — Engeland, Kroatië, Panama, Ghana (laatste groep)

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Engeland
('Engeland','Albanië',2,0,'W','competitief','2025-11-16','seed_eng_1'),
('Engeland','Uruguay',1,1,'G','vriendschappelijk','2026-03-27','seed_eng_2'),
('Engeland','Japan',0,1,'V','vriendschappelijk','2026-03-31','seed_eng_3'),
('Engeland','Nieuw-Zeeland',1,0,'W','vriendschappelijk','2026-06-06','seed_eng_4'),
('Engeland','Costa Rica',3,0,'W','vriendschappelijk','2026-06-10','seed_eng_5'),

-- Kroatië (4 bevestigd — geen betrouwbare 5e gevonden)
('Kroatië','Montenegro',3,2,'W','competitief','2025-11-17','seed_cro_1'),
('Kroatië','Brazilië',1,3,'V','vriendschappelijk','2026-04-01','seed_cro_2'),
('Kroatië','België',0,2,'V','vriendschappelijk','2026-06-02','seed_cro_3'),
('Kroatië','Slovenië',2,1,'W','vriendschappelijk','2026-06-07','seed_cro_4'),

-- Panama
('Panama','Zuid-Afrika',1,1,'G','vriendschappelijk','2026-03-27','seed_pan_1'),
('Panama','Zuid-Afrika',2,1,'W','vriendschappelijk','2026-03-31','seed_pan_2'),
('Panama','Brazilië',2,6,'V','vriendschappelijk','2026-05-31','seed_pan_3'),
('Panama','Dominicaanse Republiek',4,2,'W','vriendschappelijk','2026-06-03','seed_pan_4'),
('Panama','Bosnië',1,1,'G','vriendschappelijk','2026-06-06','seed_pan_5'),

-- Ghana
('Ghana','Zuid-Afrika',0,1,'V','vriendschappelijk','2026-03-23','seed_gha_1'),
('Ghana','Oostenrijk',1,5,'V','vriendschappelijk','2026-03-27','seed_gha_2'),
('Ghana','Duitsland',1,2,'V','vriendschappelijk','2026-03-30','seed_gha_3'),
('Ghana','Mexico',0,2,'V','vriendschappelijk','2026-04-01','seed_gha_4'),
('Ghana','Wales',1,1,'G','vriendschappelijk','2026-06-02','seed_gha_5')
ON CONFLICT(team,match_id) DO NOTHING;
