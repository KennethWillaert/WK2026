-- Pilot: Groep A — Mexico, Zuid-Korea, Zuid-Afrika, Tsjechië
-- Laatste 5 wedstrijden vóór het WK (bron: fotmob.com / espn.com, juni 2026)
-- category: 'vriendschappelijk' of 'competitief' (kwalificatie/continentaal toernooi)
-- match_id is een synthetische sleutel zodat dit script veilig herhaald kan worden (idempotent)

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Mexico
('Mexico','IJsland',4,0,'W','vriendschappelijk','2026-02-26','seed_mex_1'),
('Mexico','Portugal',0,0,'G','vriendschappelijk','2026-03-29','seed_mex_2'),
('Mexico','België',1,1,'G','vriendschappelijk','2026-04-01','seed_mex_3'),
('Mexico','Ghana',2,0,'W','vriendschappelijk','2026-05-23','seed_mex_4'),
('Mexico','Australië',1,0,'W','vriendschappelijk','2026-05-31','seed_mex_5'),

-- Zuid-Korea
('Zuid-Korea','Ghana',1,0,'W','vriendschappelijk','2025-11-18','seed_kor_1'),
('Zuid-Korea','Ivoorkust',0,4,'V','vriendschappelijk','2026-03-28','seed_kor_2'),
('Zuid-Korea','Oostenrijk',0,1,'V','vriendschappelijk','2026-03-31','seed_kor_3'),
('Zuid-Korea','Trinidad en Tobago',5,0,'W','vriendschappelijk','2026-05-31','seed_kor_4'),
('Zuid-Korea','El Salvador',1,0,'W','vriendschappelijk','2026-06-04','seed_kor_5'),

-- Zuid-Afrika
('Zuid-Afrika','Ghana',1,0,'W','vriendschappelijk','2025-12-16','seed_rsa_1'),
('Zuid-Afrika','Angola',2,1,'W','competitief','2025-12-22','seed_rsa_2'),
('Zuid-Afrika','Egypte',0,1,'V','competitief','2025-12-26','seed_rsa_3'),
('Zuid-Afrika','Zimbabwe',3,2,'W','competitief','2025-12-29','seed_rsa_4'),
('Zuid-Afrika','Kameroen',1,2,'V','competitief','2026-01-04','seed_rsa_5'),

-- Tsjechië
('Tsjechië','Gibraltar',6,0,'W','competitief','2025-11-17','seed_cze_1'),
('Tsjechië','Ierland',2,2,'W','competitief','2026-03-26','seed_cze_2'),
('Tsjechië','Denemarken',2,2,'W','competitief','2026-03-31','seed_cze_3'),
('Tsjechië','Kosovo',2,1,'W','vriendschappelijk','2026-05-31','seed_cze_4'),
('Tsjechië','Guatemala',3,1,'W','vriendschappelijk','2026-06-04','seed_cze_5')
ON CONFLICT(team,match_id) DO NOTHING;
