-- ============================================================
-- TEAM FORM: volledige (re)setup in één keer
-- Maakt de tabel aan (als ze nog niet bestaat), ruimt alles op
-- en zet alle 48 landen er opnieuw en correct in.
-- ============================================================

CREATE TABLE IF NOT EXISTS team_form (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team TEXT NOT NULL,
  opponent TEXT NOT NULL,
  goals_for INTEGER NOT NULL,
  goals_against INTEGER NOT NULL,
  result TEXT NOT NULL CHECK(result IN ('W','G','V')),
  category TEXT NOT NULL CHECK(category IN ('vriendschappelijk','competitief','wk_groep','wk_knockout')),
  match_date TEXT NOT NULL,
  match_id TEXT,
  UNIQUE(team, match_id)
);
CREATE INDEX IF NOT EXISTS idx_team_form_team_date ON team_form(team, match_date);

-- Tabel leegmaken zodat test-data of halve imports geen rommel achterlaten
DELETE FROM team_form;

-- ── Groep A ──
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

-- ── Groep B ──
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

-- ── Groep C ──
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

-- ── Groep D ──
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

-- ── Groep E ──
-- Groep E — Duitsland, Ecuador, Ivoorkust, Curaçao

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Duitsland
('Duitsland','Slowakije',6,0,'W','competitief','2025-11-17','seed_ger_1'),
('Duitsland','Zwitserland',4,3,'W','vriendschappelijk','2026-03-27','seed_ger_2'),
('Duitsland','Ghana',2,1,'W','vriendschappelijk','2026-03-30','seed_ger_3'),
('Duitsland','Finland',4,0,'W','vriendschappelijk','2026-05-31','seed_ger_4'),
('Duitsland','VS',2,1,'W','vriendschappelijk','2026-06-06','seed_ger_5'),

-- Ecuador (4 bevestigd — geen betrouwbare 5e gevonden)
('Ecuador','Marokko',1,1,'G','vriendschappelijk','2026-03-27','seed_ecu_1'),
('Ecuador','Nederland',1,1,'G','vriendschappelijk','2026-03-31','seed_ecu_2'),
('Ecuador','Saoedi-Arabië',2,1,'W','vriendschappelijk','2026-05-30','seed_ecu_3'),
('Ecuador','Guatemala',3,0,'W','vriendschappelijk','2026-06-07','seed_ecu_4'),

-- Ivoorkust
('Ivoorkust','Burkina Faso',3,0,'W','competitief','2026-01-06','seed_civ_1'),
('Ivoorkust','Egypte',2,3,'V','competitief','2026-01-10','seed_civ_2'),
('Ivoorkust','Zuid-Korea',4,0,'W','vriendschappelijk','2026-03-28','seed_civ_3'),
('Ivoorkust','Schotland',1,0,'W','vriendschappelijk','2026-03-31','seed_civ_4'),
('Ivoorkust','Frankrijk',2,1,'W','vriendschappelijk','2026-06-04','seed_civ_5'),

-- Curaçao
('Curaçao','Jamaica',0,0,'G','competitief','2025-11-19','seed_cur_1'),
('Curaçao','China',0,2,'V','vriendschappelijk','2026-03-26','seed_cur_2'),
('Curaçao','Australië',1,5,'V','vriendschappelijk','2026-03-31','seed_cur_3'),
('Curaçao','Schotland',1,4,'V','vriendschappelijk','2026-05-30','seed_cur_4'),
('Curaçao','Aruba',4,0,'W','vriendschappelijk','2026-06-06','seed_cur_5')
ON CONFLICT(team,match_id) DO NOTHING;

-- ── Groep F ──
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

-- ── Groep G ──
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

-- ── Groep H ──
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

-- ── Groep I ──
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

-- ── Groep J ──
-- Groep J — Argentinië, Oostenrijk, Algerije, Jordanië

INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id) VALUES
-- Argentinië
('Argentinië','Angola',2,0,'W','vriendschappelijk','2025-11-18','seed_arg_1'),
('Argentinië','Mauritanië',2,1,'W','vriendschappelijk','2026-03-27','seed_arg_2'),
('Argentinië','Zambia',5,0,'W','vriendschappelijk','2026-03-31','seed_arg_3'),
('Argentinië','Honduras',2,0,'W','vriendschappelijk','2026-06-06','seed_arg_4'),
('Argentinië','IJsland',3,0,'W','vriendschappelijk','2026-06-09','seed_arg_5'),

-- Oostenrijk
('Oostenrijk','Cyprus',2,0,'W','competitief','2025-10-11','seed_aut_1'),
('Oostenrijk','Bosnië',1,1,'G','competitief','2025-11-18','seed_aut_2'),
('Oostenrijk','Ghana',5,1,'W','vriendschappelijk','2026-03-27','seed_aut_3'),
('Oostenrijk','Zuid-Korea',1,0,'W','vriendschappelijk','2026-03-31','seed_aut_4'),
('Oostenrijk','Tunesië',1,0,'W','vriendschappelijk','2026-06-01','seed_aut_5'),

-- Algerije
('Algerije','Nigeria',0,2,'V','competitief','2026-01-10','seed_alg_1'),
('Algerije','Guatemala',7,0,'W','vriendschappelijk','2026-03-27','seed_alg_2'),
('Algerije','Uruguay',0,0,'G','vriendschappelijk','2026-03-31','seed_alg_3'),
('Algerije','Nederland',1,0,'W','vriendschappelijk','2026-06-03','seed_alg_4'),
('Algerije','Bolivia',4,0,'W','vriendschappelijk','2026-06-10','seed_alg_5'),

-- Jordanië
('Jordanië','Irak',1,0,'W','competitief','2025-12-12','seed_jor_1'),
('Jordanië','Saoedi-Arabië',1,0,'W','competitief','2025-12-15','seed_jor_2'),
('Jordanië','Marokko',2,3,'V','competitief','2025-12-18','seed_jor_3'),
('Jordanië','Costa Rica',2,2,'G','vriendschappelijk','2026-03-27','seed_jor_4'),
('Jordanië','Colombia',0,2,'V','vriendschappelijk','2026-06-07','seed_jor_5')
ON CONFLICT(team,match_id) DO NOTHING;

-- ── Groep K ──
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

-- ── Groep L ──
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

