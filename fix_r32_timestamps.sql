-- Fix: 3 foute kickoff-tijden in R32 (m86/m87/m88)
UPDATE match_kickoffs SET kickoff=1783101600000 WHERE match_id='m86'; -- Australië vs Egypte → 03/07 20:00 CEST (was 21:00)
UPDATE match_kickoffs SET kickoff=1783116000000 WHERE match_id='m87'; -- Argentinië vs Kaapverdië → 04/07 00:00 CEST (was 02:00)
UPDATE match_kickoffs SET kickoff=1783128600000 WHERE match_id='m88'; -- Colombia vs Ghana → 04/07 03:30 CEST (was 05:30)
