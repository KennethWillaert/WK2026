const CORS={
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers':'Content-Type,Authorization',
};
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json',...CORS}});}
function err(msg,status=400){return json({error:msg},status);}

const ADMIN_EMAIL='djduuub@gmail.com';
const FD_BASE='https://api.football-data.org/v4';

// Mapping football-data.org team names → onze Nederlandse namen
const TEAM_MAP={
  'Belgium':'België','Netherlands':'Nederland','France':'Frankrijk',
  'Germany':'Duitsland','Spain':'Spanje','Portugal':'Portugal',
  'Brazil':'Brazilië','Argentina':'Argentinië','England':'Engeland',
  'United States':'VS','Canada':'Canada','Mexico':'Mexico',
  'Japan':'Japan','South Korea':'Zuid-Korea','Morocco':'Marokko',
  'Senegal':'Senegal','Switzerland':'Zwitserland','Italy':'Italië',
  'Croatia':'Kroatië','Uruguay':'Uruguay','Australia':'Australië',
  'Turkey':'Turkije','Paraguay':'Paraguay','Qatar':'Qatar',
  'South Africa':'Zuid-Afrika','Czech Republic':'Tsjechië',
  'Czechia':'Tsjechië','Bosnia and Herzegovina':'Bosnië',
  'Haiti':'Haïti','Scotland':'Schotland','Ivory Coast':'Ivoorkust',
  "Côte d'Ivoire":'Ivoorkust','Ecuador':'Ecuador','Curaçao':'Curaçao',
  'Ukraine':'Oekraïne','Tunisia':'Tunesië','Saudi Arabia':'Saoedi-Arabië',
  'Sweden':'Zweden',
  'Cape Verde':'Kaapverdië','Iran':'Iran','New Zealand':'Nieuw-Zeeland',
  'Egypt':'Egypte','Norway':'Noorwegen','Iraq':'Irak',
  'Austria':'Oostenrijk','Algeria':'Algerije','Jordan':'Jordanië',
  'Colombia':'Colombia','Uzbekistan':'Oezbekistan',
  'DR Congo':'DRC','Panama':'Panama','Ghana':'Ghana',
  'Israel':'Israël',
};

function mapTeam(name){return TEAM_MAP[name]||name;}

// Mapping onze match IDs → football-data wedstrijd zoeksleutel (thuis+uit teams)
const MATCH_ID_MAP={
  // ── GROEPSFASE ─────────────────────────────────────────────────────────────
  'm1':['Mexico','Zuid-Afrika'],'m2':['Zuid-Korea','Tsjechië'],
  'm3':['Canada','Bosnië'],'m4':['VS','Paraguay'],
  'm5':['Qatar','Zwitserland'],'m6':['Brazilië','Marokko'],
  'm7':['Haïti','Schotland'],'m8':['Australië','Turkije'],
  'm9':['Duitsland','Curaçao'],'m10':['Nederland','Japan'],
  'm11':['Ivoorkust','Ecuador'],'m12':['Zweden','Tunesië'],
  'm13':['Spanje','Kaapverdië'],'m14':['België','Egypte'],
  'm15':['Saoedi-Arabië','Uruguay'],'m16':['Iran','Nieuw-Zeeland'],
  'm17':['Frankrijk','Senegal'],'m18':['Irak','Noorwegen'],
  'm19':['Argentinië','Algerije'],'m20':['Oostenrijk','Jordanië'],
  'm21':['Portugal','DRC'],'m22':['Engeland','Kroatië'],
  'm23':['Ghana','Panama'],'m24':['Oezbekistan','Colombia'],
  'm25':['Tsjechië','Zuid-Afrika'],'m26':['Zwitserland','Bosnië'],
  'm27':['Canada','Qatar'],'m28':['Mexico','Zuid-Korea'],
  'm29':['Schotland','Marokko'],'m30':['VS','Australië'],
  'm31':['Brazilië','Haïti'],'m32':['Turkije','Paraguay'],
  'm33':['Nederland','Zweden'],'m34':['Duitsland','Ivoorkust'],
  'm35':['Ecuador','Curaçao'],'m36':['Tunesië','Japan'],
  'm37':['Spanje','Saoedi-Arabië'],'m38':['België','Iran'],
  'm39':['Uruguay','Kaapverdië'],'m40':['Nieuw-Zeeland','Egypte'],
  'm41':['Argentinië','Oostenrijk'],'m42':['Frankrijk','Irak'],
  'm43':['Noorwegen','Senegal'],'m44':['Jordanië','Algerije'],
  'm45':['Portugal','Oezbekistan'],'m46':['Engeland','Ghana'],
  'm47':['Panama','Kroatië'],'m48':['Colombia','DRC'],
  'm49':['Zwitserland','Canada'],'m50':['Bosnië','Qatar'],
  'm51':['Schotland','Brazilië'],'m52':['Marokko','Haïti'],
  'm53':['Tsjechië','Mexico'],'m54':['Zuid-Afrika','Zuid-Korea'],
  'm55':['Ecuador','Duitsland'],'m56':['Curaçao','Ivoorkust'],
  'm57':['Japan','Zweden'],'m58':['Tunesië','Nederland'],
  'm59':['Turkije','VS'],'m60':['Paraguay','Australië'],
  'm61':['Noorwegen','Frankrijk'],'m62':['Senegal','Irak'],
  'm63':['Kaapverdië','Saoedi-Arabië'],'m64':['Uruguay','Spanje'],
  'm65':['Egypte','Iran'],'m66':['Nieuw-Zeeland','België'],
  'm67':['Panama','Engeland'],'m68':['Kroatië','Ghana'],
  'm69':['Colombia','Portugal'],'m70':['DRC','Oezbekistan'],
  'm71':['Algerije','Oostenrijk'],'m72':['Jordanië','Argentinië'],
  // ── RONDE VAN 32 ───────────────────────────────────────────────────────────
  'm73':['Zuid-Afrika','Canada'],'m74':['Brazilië','Japan'],
  'm75':['Duitsland','Paraguay'],'m76':['Nederland','Marokko'],
  'm77':['Ivoorkust','Noorwegen'],'m78':['Frankrijk','Zweden'],
  'm79':['Mexico','Ecuador'],'m80':['Engeland','DR Congo'],
  'm81':['België','Senegal'],'m82':['VS','Bosnië'],
  'm83':['Spanje','Oostenrijk'],'m84':['Portugal','Kroatië'],
  'm85':['Zwitserland','Algerije'],'m86':['Australië','Egypte'],
  'm87':['Argentinië','Kaapverdië'],'m88':['Colombia','Ghana'],
  // ── ACHTSTE FINALES (teams gekend na R32) ──────────────────────────────────
  'm89':['Canada','Marokko'],'m90':['Paraguay','Frankrijk'],
  'm91':['Brazilië','Noorwegen'],'m92':['Mexico','Engeland'],
  'm93':['Spanje','Portugal'],'m94':['België','VS'],
  'm95':['Egypte','Argentinië'],'m96':['Zwitserland','Colombia'],
  // ── KWARTFINALES (teams gekend na R16) ─────────────────────────────────────
  'm97':['Frankrijk','Marokko'],'m98':['Spanje','België'],
  'm99':['Brazilië','Engeland'],'m100':['Argentinië','Zwitserland'],
};

// Bracket mapping: winner van match X → volgende match (slot home/away)
const KNOCKOUT_NEXT={
  m73:{next:'m89',slot:'home'}, m83:{next:'m89',slot:'away'},
  m74:{next:'m90',slot:'home'}, m80:{next:'m90',slot:'away'},
  m76:{next:'m91',slot:'home'}, m86:{next:'m91',slot:'away'},
  m79:{next:'m92',slot:'home'}, m85:{next:'m92',slot:'away'},
  m77:{next:'m93',slot:'home'}, m82:{next:'m93',slot:'away'},
  m75:{next:'m94',slot:'home'}, m81:{next:'m94',slot:'away'},
  m87:{next:'m95',slot:'home'}, m88:{next:'m95',slot:'away'},
  m78:{next:'m96',slot:'home'}, m84:{next:'m96',slot:'away'},
  m89:{next:'m97',slot:'home'}, m90:{next:'m97',slot:'away'},
  m91:{next:'m99',slot:'home'}, m92:{next:'m99',slot:'away'},
  m93:{next:'m98',slot:'home'}, m94:{next:'m98',slot:'away'},
  m95:{next:'m100',slot:'home'},m96:{next:'m100',slot:'away'},
  m97:{next:'m101',slot:'home',loserNext:'m103',loserSlot:'home'},
  m98:{next:'m101',slot:'away',loserNext:'m103',loserSlot:'away'},
  m99:{next:'m102',slot:'home',loserNext:'m103',loserSlot:'home'},
  m100:{next:'m102',slot:'away',loserNext:'m103',loserSlot:'away'},
  m101:{next:'m104',slot:'home'},m102:{next:'m104',slot:'away'},
};

const GROUPS={
  A:['Mexico','Zuid-Korea','Zuid-Afrika','Tsjechië'],
  B:['Canada','Qatar','Zwitserland','Bosnië'],
  C:['Brazilië','Marokko','Schotland','Haïti'],
  D:['VS','Australië','Paraguay','Turkije'],
  E:['Duitsland','Ecuador','Ivoorkust','Curaçao'],
  F:['Nederland','Japan','Tunesië','Zweden'],
  G:['België','Iran','Egypte','Nieuw-Zeeland'],
  H:['Spanje','Uruguay','Saoedi-Arabië','Kaapverdië'],
  I:['Frankrijk','Senegal','Noorwegen','Irak'],
  J:['Argentinië','Oostenrijk','Algerije','Jordanië'],
  K:['Portugal','Colombia','Oezbekistan','DRC'],
  L:['Engeland','Kroatië','Panama','Ghana'],
};

const GROUP_MATCHES=[
  {id:'m1',h:'Mexico',a:'Zuid-Afrika',g:'A'},{id:'m2',h:'Zuid-Korea',a:'Tsjechië',g:'A'},
  {id:'m3',h:'Canada',a:'Bosnië',g:'B'},{id:'m4',h:'VS',a:'Paraguay',g:'D'},
  {id:'m5',h:'Qatar',a:'Zwitserland',g:'B'},{id:'m6',h:'Brazilië',a:'Marokko',g:'C'},
  {id:'m7',h:'Haïti',a:'Schotland',g:'C'},{id:'m8',h:'Australië',a:'Turkije',g:'D'},
  {id:'m9',h:'Duitsland',a:'Curaçao',g:'E'},{id:'m10',h:'Nederland',a:'Japan',g:'F'},
  {id:'m11',h:'Ivoorkust',a:'Ecuador',g:'E'},{id:'m12',h:'Zweden',a:'Tunesië',g:'F'},
  {id:'m13',h:'Spanje',a:'Kaapverdië',g:'H'},{id:'m14',h:'België',a:'Egypte',g:'G'},
  {id:'m15',h:'Saoedi-Arabië',a:'Uruguay',g:'H'},{id:'m16',h:'Iran',a:'Nieuw-Zeeland',g:'G'},
  {id:'m17',h:'Frankrijk',a:'Senegal',g:'I'},{id:'m18',h:'Irak',a:'Noorwegen',g:'I'},
  {id:'m19',h:'Argentinië',a:'Algerije',g:'J'},{id:'m20',h:'Oostenrijk',a:'Jordanië',g:'J'},
  {id:'m21',h:'Portugal',a:'DRC',g:'K'},{id:'m22',h:'Engeland',a:'Kroatië',g:'L'},
  {id:'m23',h:'Ghana',a:'Panama',g:'L'},{id:'m24',h:'Oezbekistan',a:'Colombia',g:'K'},
  {id:'m25',h:'Tsjechië',a:'Zuid-Afrika',g:'A'},{id:'m26',h:'Zwitserland',a:'Bosnië',g:'B'},
  {id:'m27',h:'Canada',a:'Qatar',g:'B'},{id:'m28',h:'Mexico',a:'Zuid-Korea',g:'A'},
  {id:'m29',h:'Schotland',a:'Marokko',g:'C'},{id:'m30',h:'VS',a:'Australië',g:'D'},
  {id:'m31',h:'Brazilië',a:'Haïti',g:'C'},{id:'m32',h:'Turkije',a:'Paraguay',g:'D'},
  {id:'m33',h:'Nederland',a:'Zweden',g:'F'},{id:'m34',h:'Duitsland',a:'Ivoorkust',g:'E'},
  {id:'m35',h:'Ecuador',a:'Curaçao',g:'E'},{id:'m36',h:'Tunesië',a:'Japan',g:'F'},
  {id:'m37',h:'Spanje',a:'Saoedi-Arabië',g:'H'},{id:'m38',h:'België',a:'Iran',g:'G'},
  {id:'m39',h:'Uruguay',a:'Kaapverdië',g:'H'},{id:'m40',h:'Nieuw-Zeeland',a:'Egypte',g:'G'},
  {id:'m41',h:'Argentinië',a:'Oostenrijk',g:'J'},{id:'m42',h:'Frankrijk',a:'Irak',g:'I'},
  {id:'m43',h:'Noorwegen',a:'Senegal',g:'I'},{id:'m44',h:'Jordanië',a:'Algerije',g:'J'},
  {id:'m45',h:'Portugal',a:'Oezbekistan',g:'K'},{id:'m46',h:'Engeland',a:'Ghana',g:'L'},
  {id:'m47',h:'Panama',a:'Kroatië',g:'L'},{id:'m48',h:'Colombia',a:'DRC',g:'K'},
  {id:'m49',h:'Zwitserland',a:'Canada',g:'B'},{id:'m50',h:'Bosnië',a:'Qatar',g:'B'},
  {id:'m51',h:'Schotland',a:'Brazilië',g:'C'},{id:'m52',h:'Marokko',a:'Haïti',g:'C'},
  {id:'m53',h:'Tsjechië',a:'Mexico',g:'A'},{id:'m54',h:'Zuid-Afrika',a:'Zuid-Korea',g:'A'},
  {id:'m55',h:'Ecuador',a:'Duitsland',g:'E'},{id:'m56',h:'Curaçao',a:'Ivoorkust',g:'E'},
  {id:'m57',h:'Japan',a:'Zweden',g:'F'},{id:'m58',h:'Tunesië',a:'Nederland',g:'F'},
  {id:'m59',h:'Turkije',a:'VS',g:'D'},{id:'m60',h:'Paraguay',a:'Australië',g:'D'},
  {id:'m61',h:'Noorwegen',a:'Frankrijk',g:'I'},{id:'m62',h:'Senegal',a:'Irak',g:'I'},
  {id:'m63',h:'Kaapverdië',a:'Saoedi-Arabië',g:'H'},{id:'m64',h:'Uruguay',a:'Spanje',g:'H'},
  {id:'m65',h:'Egypte',a:'Iran',g:'G'},{id:'m66',h:'Nieuw-Zeeland',a:'België',g:'G'},
  {id:'m67',h:'Panama',a:'Engeland',g:'L'},{id:'m68',h:'Kroatië',a:'Ghana',g:'L'},
  {id:'m69',h:'Colombia',a:'Portugal',g:'K'},{id:'m70',h:'DRC',a:'Oezbekistan',g:'K'},
  {id:'m71',h:'Algerije',a:'Oostenrijk',g:'J'},{id:'m72',h:'Jordanië',a:'Argentinië',g:'J'},
];

async function hashPassword(password){
  const encoder=new TextEncoder();
  const data=encoder.encode(password+'wk2026salt');
  const hash=await crypto.subtle.digest('SHA-256',data);
  return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

function generateToken(){
  const arr=new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b=>b.toString(16).padStart(2,'0')).join('');
}

async function getUser(request,env){
  const auth=request.headers.get('Authorization')||'';
  const token=auth.replace('Bearer ','').trim();
  if(!token)return null;
  const session=await env.DB.prepare('SELECT user_id FROM sessions WHERE token=?').bind(token).first();
  if(!session)return null;
  const user=await env.DB.prepare('SELECT id,name,email,is_admin,avatar FROM users WHERE id=?').bind(session.user_id).first();
  return user||null;
}

function calcStandings(grpMatches,resMap){
  const teams={};
  grpMatches.forEach(m=>{
    if(!teams[m.h])teams[m.h]={name:m.h,pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,played:0};
    if(!teams[m.a])teams[m.a]={name:m.a,pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,played:0};
    const res=resMap[m.id];if(!res)return;
    const h=teams[m.h],a=teams[m.a];
    h.played++;a.played++;
    h.gf+=res.h;h.ga+=res.a;h.gd=h.gf-h.ga;
    a.gf+=res.a;a.ga+=res.h;a.gd=a.gf-a.ga;
    if(res.h>res.a){h.pts+=3;h.w++;a.l++;}
    else if(res.h<res.a){a.pts+=3;a.w++;h.l++;}
    else{h.pts+=1;a.pts+=1;h.d++;a.d++;}
  });
  return Object.values(teams).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf||a.name.localeCompare(b.name));
}

// ── FOOTBALL-DATA SYNC ────────────────────────────────────
async function syncFromFootballData(env){
  const headers={'X-Auth-Token':env.FOOTBALL_API_KEY};

  // Check rate limit headers
  const resp=await fetch(`${FD_BASE}/competitions/WC/matches?status=FINISHED`,{headers});

  // Respect rate limiting
  const reqsAvail=resp.headers.get('X-Requests-Available-Minute');
  if(reqsAvail&&parseInt(reqsAvail)<2){
    return{synced:0,message:'Rate limit bijna bereikt, overgeslagen'};
  }

  if(!resp.ok)return{synced:0,message:`API fout: ${resp.status}`};
  const data=await resp.json();
  const matches=data.matches||[];

  let synced=0;
  for(const match of matches){
    if(match.status!=='FINISHED')continue;
    const h=mapTeam(match.homeTeam?.name||'');
    const a=mapTeam(match.awayTeam?.name||'');
    // Voor puntentelling: score na 90 min (regularTime), niet na verlengingen
    const hs=match.score?.regularTime?.home??match.score?.fullTime?.home;
    const as_=match.score?.regularTime?.away??match.score?.fullTime?.away;
    // Doorwinnaar voor knockout (HOME_TEAM, AWAY_TEAM, DRAW)
    const winner=match.score?.winner||null;
    if(hs==null||as_==null)continue;

    // Zoek onze match ID op basis van teamnamen
    const ourMatch=Object.entries(MATCH_ID_MAP).find(([id,[th,ta]])=>
      (th===h&&ta===a)||(th===a&&ta===h)
    );
    if(!ourMatch)continue;
    const[mid,[th,ta]]=ourMatch;
    // Wissel scores om als teams omgekeerd staan
    const homeScore=th===h?hs:as_;
    const awayScore=th===h?as_:hs;
    // Vertaal HOME_TEAM/AWAY_TEAM naar teamnaam
    const winnerName=winner==='HOME_TEAM'?(th===h?th:ta):winner==='AWAY_TEAM'?(th===h?ta:th):null;

    await env.DB.prepare(
      `INSERT INTO results(match_id,home_score,away_score,winner)VALUES(?,?,?,?)
       ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score,away_score=excluded.away_score,winner=excluded.winner`
    ).bind(mid,homeScore,awayScore,winnerName).run();
    synced++;

    // Team-vorm bijhouden
    const matchDate=(match.utcDate||'').slice(0,10)||new Date().toISOString().slice(0,10);
    const homeResult=homeScore>awayScore?'W':homeScore<awayScore?'V':'G';
    const awayResult=awayScore>homeScore?'W':awayScore<homeScore?'V':'G';
    const isKnockout=parseInt(mid.replace('m',''))>72;
    const formCategory=isKnockout?'wk_knockout':'wk_groep';
    await env.DB.prepare(
      `INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id)
       VALUES(?,?,?,?,?,?,?,?)
       ON CONFLICT(team,match_id)DO UPDATE SET goals_for=excluded.goals_for,goals_against=excluded.goals_against,result=excluded.result,match_date=excluded.match_date`
    ).bind(th,ta,homeScore,awayScore,homeResult,formCategory,matchDate,mid).run();
    await env.DB.prepare(
      `INSERT INTO team_form(team,opponent,goals_for,goals_against,result,category,match_date,match_id)
       VALUES(?,?,?,?,?,?,?,?)
       ON CONFLICT(team,match_id)DO UPDATE SET goals_for=excluded.goals_for,goals_against=excluded.goals_against,result=excluded.result,match_date=excluded.match_date`
    ).bind(ta,th,awayScore,homeScore,awayResult,formCategory,matchDate,mid).run();

    // Knockout: update match_kickoffs volgende ronde + voeg dynamisch toe aan MATCH_ID_MAP
    if(isKnockout&&winnerName){
      const nextMap=KNOCKOUT_NEXT[mid];
      if(nextMap){
        const col=nextMap.slot==='home'?'home_team':'away_team';
        await env.DB.prepare(`UPDATE match_kickoffs SET ${col}=? WHERE match_id=?`).bind(winnerName,nextMap.next).run();
        // Voeg toe aan MATCH_ID_MAP voor toekomstige sync-runs (in-memory voor deze run)
        if(!MATCH_ID_MAP[nextMap.next])MATCH_ID_MAP[nextMap.next]=[null,null];
        if(nextMap.slot==='home')MATCH_ID_MAP[nextMap.next][0]=winnerName;
        else MATCH_ID_MAP[nextMap.next][1]=winnerName;
      }
    }
  }

  // Sync topscorers — elke cron run
  const scoreResp=await fetch(`${FD_BASE}/competitions/WC/scorers?limit=20`,{headers});
  if(scoreResp.ok){
    const scoreData=await scoreResp.json();
    const scorers=(scoreData.scorers||[]).filter(s=>s.goals>0).map(s=>({
      name:s.player?.name||'',
      team:mapTeam(s.team?.name||''),
      goals:s.goals||0,
    }));
    if(scorers.length>0){
      await env.DB.prepare(
        `INSERT INTO results(match_id,home_score,away_score)VALUES('topscorers',?,0)
         ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score`
      ).bind(JSON.stringify(scorers)).run();
    }
  }

  return{synced,message:`${synced} wedstrijden gesynchroniseerd`};
}


async function sendPush(env,payload){
  const apiKey=env.ONESIGNAL_API_KEY;
  if(!apiKey)throw new Error('no api key');
  const res=await fetch('https://onesignal.com/api/v1/notifications',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Basic ${apiKey}`},
    body:JSON.stringify({
      app_id:'6adb9c17-2469-4c00-8b83-e6eb8df5116f',
      included_segments:['Total Subscriptions'],
      headings:{en:payload.title},
      contents:{en:payload.body},
      web_url:'https://wk2026-413.pages.dev'
    })
  });
  if(!res.ok)throw new Error(`OneSignal HTTP ${res.status}`);
  const data=await res.json();
  if(data.errors&&data.errors.length)throw new Error(`OneSignal error: ${JSON.stringify(data.errors)}`);
  return data;
}

export default {
  // Cron trigger: elke 5 minuten tijdens het WK
  async scheduled(event,env,ctx){
    ctx.waitUntil((async()=>{
      // Sync en push apart uitvoeren zodat een sync fout de push niet blokkeert
      try{await syncFromFootballData(env);}catch(e){console.error('Sync error:',e);}
      try{
        const now=Date.now();

      // Haal bracket overrides op voor echte teamnamen
      const overrideRows=await env.DB.prepare("SELECT match_id,home_score FROM results WHERE match_id LIKE 'override_%'").all();
      const overrides={};
      overrideRows.results.forEach(r=>{overrides[r.match_id.replace('override_','')]=r.home_score;});
      function resolveTeam(t){
        if(overrides[t])return overrides[t];
        // Friendly fallback voor bracket placeholders
        if(/^[12][A-L]$/.test(t))return `Winnaar groep ${t[1]}`;
        if(/^W\d+$/.test(t))return `Winnaar match ${t.slice(1)}`;
        if(/^3/.test(t))return 'Beste derde';
        return t;
      }

      // Push 1: wedstrijden die binnen ~75 min beginnen (prono reminder)
      // Open venster: alles wat nog moet starten en binnen 75 min valt, en nog niet gemeld is.
      // Zo vangt de volgende cron-run het alsnog op als een eerdere run mislukte.
      const reminderCutoff=now+75*60*1000;
      const matchesSoon=await env.DB.prepare(
        'SELECT match_id,home_team,away_team,kickoff FROM match_kickoffs WHERE kickoff>? AND kickoff<=? AND notified_soon=0'
      ).bind(now,reminderCutoff).all();
      console.log(`[cron] reminder-venster (tot ${new Date(reminderCutoff).toISOString()}): ${matchesSoon.results.length} match(es)`);
      for(const m of matchesSoon.results){
        try{
          const h=resolveTeam(m.home_team);
          const a=resolveTeam(m.away_team);
          const ko1=new Date(m.kickoff);
          const time1=ko1.toLocaleString('nl-BE',{timeZone:'Europe/Brussels',hour:'2-digit',minute:'2-digit'});
          await sendPush(env,{
            title:'1u voor aftrap!',
            body:`${h} vs ${a} — vandaag om ${time1}`,
            url:'/'
          });
          await env.DB.prepare('UPDATE match_kickoffs SET notified_soon=1 WHERE match_id=?').bind(m.match_id).run();
        }catch(e){console.error(`[cron] reminder-push mislukt voor ${m.match_id}:`,e.message);}
      }

      // Push 2: wedstrijden die binnen ~12u beginnen (prono unlock)
      // Idem: open venster, geen smal tijdslot — vangt gemiste cron-runs alsnog op.
      const unlockCutoff=now+12*60*60*1000;
      const matchesUnlocked=await env.DB.prepare(
        'SELECT match_id,home_team,away_team,kickoff FROM match_kickoffs WHERE kickoff>? AND kickoff<=? AND notified_unlock=0'
      ).bind(now,unlockCutoff).all();
      console.log(`[cron] unlock-venster (tot ${new Date(unlockCutoff).toISOString()}): ${matchesUnlocked.results.length} match(es)`);
      for(const m of matchesUnlocked.results){
        try{
          const h=resolveTeam(m.home_team);
          const a=resolveTeam(m.away_team);
          const ko2=new Date(m.kickoff);
          const time2=ko2.toLocaleString('nl-BE',{timeZone:'Europe/Brussels',hour:'2-digit',minute:'2-digit',day:'numeric',month:'short'});
          await sendPush(env,{
            title:'Prono open!',
            body:`${h} vs ${a} — aftrap ${time2}`,
            url:'/'
          });
          await env.DB.prepare('UPDATE match_kickoffs SET notified_unlock=1 WHERE match_id=?').bind(m.match_id).run();
        }catch(e){console.error(`[cron] unlock-push mislukt voor ${m.match_id}:`,e.message);}
      }
      }catch(e){console.error('Push error:',e.message,e.stack);}
    })());
  },

  async fetch(request,env){
    if(request.method==='OPTIONS')return new Response(null,{headers:CORS});
    const url=new URL(request.url);
    const path=url.pathname;

    // ── AUTH ──────────────────────────────────────────────
    if(path==='/api/auth/register'&&request.method==='POST'){
      const{name,email,password,avatar}=await request.json();
      if(!name||!email||!password)return err('Alle velden zijn verplicht');
      if(password.length<4)return err('Wachtwoord minimaal 4 tekens');
      if(name.length>30)return err('Naam te lang');
      const hashed=await hashPassword(password);
      const isAdmin=email.toLowerCase()===ADMIN_EMAIL?1:0;
      try{
        const result=await env.DB.prepare(
          'INSERT INTO users(name,email,password,is_admin,avatar)VALUES(?,?,?,?,?)'
        ).bind(name.trim(),email.toLowerCase().trim(),hashed,isAdmin,avatar||'🏳️').run();
        const userId=result.meta.last_row_id;
        try{await env.DB.prepare('INSERT INTO players(name)VALUES(?)').bind(name.trim()).run();}catch{}
        const token=generateToken();
        await env.DB.prepare('INSERT INTO sessions(token,user_id)VALUES(?,?)').bind(token,userId).run();
        return json({ok:true,token,name:name.trim(),email:email.toLowerCase(),isAdmin:isAdmin===1,avatar:avatar||'🏳️'});
      }catch(e){
        if(e.message?.includes('UNIQUE'))return err('Email al in gebruik');
        return err('Registratie mislukt');
      }
    }

    if(path==='/api/auth/login'&&request.method==='POST'){
      const{email,password}=await request.json();
      if(!email||!password)return err('Email en wachtwoord verplicht');
      const hashed=await hashPassword(password);
      const user=await env.DB.prepare(
        'SELECT id,name,email,is_admin,avatar FROM users WHERE email=? AND password=?'
      ).bind(email.toLowerCase().trim(),hashed).first();
      if(!user)return err('Ongeldig email of wachtwoord');
      const token=generateToken();
      await env.DB.prepare('INSERT INTO sessions(token,user_id)VALUES(?,?)').bind(token,user.id).run();
      return json({ok:true,token,name:user.name,email:user.email,isAdmin:user.is_admin===1,avatar:user.avatar||'🏳️'});
    }

    if(path==='/api/auth/logout'&&request.method==='POST'){
      const auth=request.headers.get('Authorization')||'';
      const token=auth.replace('Bearer ','').trim();
      if(token)await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(token).run();
      return json({ok:true});
    }

    if(path==='/api/auth/me'&&request.method==='GET'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      await env.DB.prepare('UPDATE users SET last_seen=? WHERE name=?').bind(Date.now(),user.name).run();
      return json({name:user.name,email:user.email,isAdmin:user.is_admin===1,avatar:user.avatar||'🏳️'});
    }

    if(path==='/api/auth/avatar'&&request.method==='PUT'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const{avatar}=await request.json();
      await env.DB.prepare('UPDATE users SET avatar=? WHERE id=?').bind(avatar||'🏳️',user.id).run();
      return json({ok:true});
    }

    // ── MANUEL SYNC TRIGGER (admin) ───────────────────────
    if(path==='/api/sync'&&request.method==='POST'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const result=await syncFromFootballData(env);
      return json(result);
    }

    if(path==='/api/sync-debug'&&request.method==='GET'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const headers={'X-Auth-Token':env.FOOTBALL_API_KEY};
      const resp=await fetch(`${FD_BASE}/competitions/WC/matches?status=FINISHED`,{headers});
      if(!resp.ok)return json({error:`API fout: ${resp.status}`,body:await resp.text()});
      const data=await resp.json();
      const matches=(data.matches||[]).map(m=>({
        status:m.status,
        home:m.homeTeam?.name,
        away:m.awayTeam?.name,
        homeMapped:mapTeam(m.homeTeam?.name||''),
        awayMapped:mapTeam(m.awayTeam?.name||''),
        score:m.score
      }));
      return json({total:matches.length,matches});
    }

    // ── PLAYERS ───────────────────────────────────────────
    if(path==='/api/players'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT name FROM users ORDER BY created_at').all();
      return json(rows.results.map(r=>r.name));
    }

    // ── PREDICTIONS ───────────────────────────────────────
    if(path==='/api/predictions'&&request.method==='GET'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const rows=await env.DB.prepare('SELECT match_id,home_score,away_score,winner FROM predictions WHERE player=?').bind(user.name).all();
      const result={};
      rows.results.forEach(r=>{result[r.match_id]={h:r.home_score,a:r.away_score,winner:r.winner};});
      return json(result);
    }

    // ── MATCH PRONOS (pronos van anderen, enkel na kickoff) ──

    // ── MATCH NEWS ──────────────────────────
    if(path==='/api/og-preview'&&request.method==='GET'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const articleUrl=url.searchParams.get('url');
      if(!articleUrl)return err('url parameter vereist');
      try{
        const resp=await fetch(articleUrl,{headers:{'User-Agent':'Mozilla/5.0'}});
        if(!resp.ok)return json({title:'',description:'',image:''});
        const html=await resp.text();
        const getMeta=(prop)=>{
          const m=html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`,'i'))
            ||html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`,'i'));
          return m?m[1]:'';
        };
        return json({
          title:getMeta('og:title')||getMeta('twitter:title')||'',
          description:getMeta('og:description')||getMeta('description')||'',
          image:getMeta('og:image')||getMeta('twitter:image')||''
        });
      }catch(e){
        return json({title:'',description:'',image:''});
      }
    }

    if(path==='/api/news'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT match_id,title,content,url,generated_at FROM match_news ORDER BY generated_at DESC').all();
      return json(rows.results);
    }

    if(path==='/api/news'&&request.method==='POST'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const{matchId,title,url,image,description}=await request.json();
      if(!matchId||!url)return err('Ontbrekende velden');
      await env.DB.prepare(
        `INSERT INTO match_news(match_id,title,content,url,generated_at)VALUES(?,?,?,?,?)
         ON CONFLICT(match_id)DO UPDATE SET title=excluded.title,content=excluded.content,url=excluded.url,generated_at=excluded.generated_at`
      ).bind(matchId,title||matchId,JSON.stringify({image:image||'',description:description||''}),url,Date.now()).run();
      return json({ok:true});
    }

    if(path==='/api/news'&&request.method==='DELETE'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const{matchId}=await request.json();
      await env.DB.prepare('DELETE FROM match_news WHERE match_id=?').bind(matchId).run();
      return json({ok:true});
    }

    if(path==='/api/all-pronos-status'&&request.method==='GET'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      // Eén query voor alle predictions (wie/wanneer, geen scores van anderen tenzij match locked is)
      // ipv N losse /match-pronos-calls — voorkomt de late content-injectie die de scrollpositie
      // na de auto-scroll-naar-open-match nog liet verschuiven.
      const [usersRows,predRows,kickoffRows,resultRows]=await Promise.all([
        env.DB.prepare('SELECT name FROM users ORDER BY created_at').all(),
        env.DB.prepare('SELECT match_id,player,home_score,away_score,winner,created_at FROM predictions').all(),
        env.DB.prepare('SELECT match_id,kickoff FROM match_kickoffs').all(),
        env.DB.prepare('SELECT match_id,status,home_score FROM results').all()
      ]);
      const allNames=usersRows.results.map(r=>r.name);
      const kickoffMap={};
      kickoffRows.results.forEach(r=>{kickoffMap[r.match_id]=r.kickoff;});
      const resultMap={};
      resultRows.results.forEach(r=>{resultMap[r.match_id]=r;});
      const predsByMatch={};
      predRows.results.forEach(r=>{
        (predsByMatch[r.match_id]=predsByMatch[r.match_id]||[]).push(r);
      });
      const now=Date.now();
      const out={};
      Object.keys(predsByMatch).forEach(matchId=>{
        const resultRow=resultMap[matchId];
        const hasStarted=resultRow&&(resultRow.status==='FINISHED'||resultRow.status==='IN_PLAY'||resultRow.status==='PAUSED'||resultRow.status==='HALFTIME'||(resultRow.status==null&&resultRow.home_score!=null));
        const kickoffPassed=kickoffMap[matchId]&&now>=kickoffMap[matchId];
        const locked=hasStarted||kickoffPassed;
        const rows=predsByMatch[matchId].slice().sort((a,b)=>{
          if(a.created_at==null&&b.created_at==null)return a.player<b.player?-1:1;
          if(a.created_at==null)return 1;
          if(b.created_at==null)return -1;
          return a.created_at-b.created_at;
        });
        out[matchId]=locked
          ?rows.map(r=>({name:r.player,h:r.home_score,a:r.away_score,winner:r.winner||null,t:r.created_at}))
          :rows.map(r=>({name:r.player,t:r.created_at}));
      });
      return json({names:allNames,pronos:out});
    }

    if(path==='/api/match-pronos'&&request.method==='GET'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const matchId=url.searchParams.get('match_id');
      if(!matchId)return err('match_id vereist');
      const kickoffRow=await env.DB.prepare('SELECT kickoff FROM match_kickoffs WHERE match_id=?').bind(matchId).first();
      const resultRow=await env.DB.prepare('SELECT status,home_score FROM results WHERE match_id=?').bind(matchId).first();
      const hasStarted=resultRow&&(resultRow.status==='FINISHED'||resultRow.status==='IN_PLAY'||resultRow.status==='PAUSED'||resultRow.status==='HALFTIME'||(resultRow.status==null&&resultRow.home_score!=null));
      const kickoffPassed=kickoffRow&&Date.now()>=kickoffRow.kickoff;
      const locked=hasStarted||kickoffPassed;
      const rows=await env.DB.prepare(
        'SELECT player,home_score,away_score,created_at FROM predictions WHERE match_id=? ORDER BY created_at IS NULL, created_at ASC, player ASC'
      ).bind(matchId).all();
      if(!locked){
        // Match nog open: enkel tonen WIE al ingevuld heeft + wanneer, nooit de score zelf.
        return json(rows.results.map(r=>({name:r.player,t:r.created_at})));
      }
      return json(rows.results.map(r=>({name:r.player,h:r.home_score,a:r.away_score,t:r.created_at})));
    }

    if(path==='/api/predictions'&&request.method==='PUT'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const{matchId,h,a,kickoff,winner}=await request.json();
      if(!matchId||h==null||a==null)return err('Ontbrekende velden');
      if(kickoff&&Date.now()>=kickoff)return err('Wedstrijd is al begonnen — prono vergrendeld');
      await env.DB.prepare(
        `INSERT INTO predictions(player,match_id,home_score,away_score,winner,created_at)VALUES(?,?,?,?,?,?)
         ON CONFLICT(player,match_id)DO UPDATE SET home_score=excluded.home_score,away_score=excluded.away_score,winner=excluded.winner`
      ).bind(user.name,matchId,parseInt(h),parseInt(a),winner||null,Date.now()).run();
      return json({ok:true});
    }

    // ── RESULTS ───────────────────────────────────────────
    if(path==='/api/results'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT match_id,home_score,away_score,winner FROM results').all();
      const result={};
      rows.results.forEach(r=>{result[r.match_id]={h:r.home_score,a:r.away_score,winner:r.winner||null};});
      return json(result);
    }

    if(path==='/api/results'&&request.method==='PUT'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const{matchId,h,a,winner}=await request.json();
      if(!matchId||h==null||a==null)return err('Ontbrekende velden');
      await env.DB.prepare(
        `INSERT INTO results(match_id,home_score,away_score,winner)VALUES(?,?,?,?)
         ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score,away_score=excluded.away_score,winner=excluded.winner`
      ).bind(matchId,parseInt(h),parseInt(a),winner||null).run();
      // Auto-update match_kickoffs voor volgende ronde zodra winner bekend is
      if(winner){
        const map=KNOCKOUT_NEXT[matchId];
        if(map){
          const col=map.slot==='home'?'home_team':'away_team';
          await env.DB.prepare(`UPDATE match_kickoffs SET ${col}=? WHERE match_id=?`).bind(winner,map.next).run();
        }
      }
      return json({ok:true});
    }

    // ── TEAM FORM (laatste 5 resultaten per team) ──────────
    if(path==='/api/team-form'&&request.method==='GET'){
      const rows=await env.DB.prepare(
        'SELECT team,opponent,goals_for,goals_against,result,category,match_date FROM team_form ORDER BY match_date DESC,id DESC'
      ).all();
      const form={};
      rows.results.forEach(r=>{
        if(!form[r.team])form[r.team]=[];
        if(form[r.team].length<5){
          form[r.team].push({opponent:r.opponent,gf:r.goals_for,ga:r.goals_against,result:r.result,category:r.category,date:r.match_date});
        }
      });
      return json(form);
    }

    // ── POPUP CONFIRM ─────────────────────────────────────
    if(path==='/api/popup-confirm'&&request.method==='POST'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const body=await request.json().catch(()=>({}));
      const popup=body.popup||'unknown';
      await env.DB.prepare(
        `CREATE TABLE IF NOT EXISTS popup_confirmations(user TEXT NOT NULL,popup TEXT NOT NULL,confirmed_at INTEGER NOT NULL,PRIMARY KEY(user,popup))`
      ).run();
      await env.DB.prepare(
        `INSERT INTO popup_confirmations(user,popup,confirmed_at)VALUES(?,?,?)ON CONFLICT(user,popup)DO UPDATE SET confirmed_at=excluded.confirmed_at`
      ).bind(user.name,popup,Date.now()).run();
      return json({ok:true});
    }
    if(path==='/api/popup-confirmations'&&request.method==='GET'){
      const user=await getUser(request,env);
      if(!user||!user.isAdmin)return err('Geen toegang',403);
      const rows=await env.DB.prepare('SELECT user,popup,confirmed_at FROM popup_confirmations ORDER BY confirmed_at DESC').all().catch(()=>({results:[]}));
      return json(rows.results);
    }

    // ── TOPSCORERS ────────────────────────────────────────
    if(path==='/api/topscorers'&&request.method==='GET'){
      const row=await env.DB.prepare("SELECT home_score FROM results WHERE match_id='topscorers'").first();
      if(!row)return json([]);
      try{return json(JSON.parse(row.home_score));}catch{return json([]);}
    }

    // ── STANDINGS ─────────────────────────────────────────
    if(path==='/api/standings'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT match_id,home_score,away_score,winner FROM results').all();
      const resMap={};
      rows.results.forEach(r=>{
        if(!r.match_id.startsWith('override_')&&r.match_id!=='bonus'&&r.match_id!=='topscorers'&&r.match_id!=='titles_unlocked')
          resMap[r.match_id]={h:r.home_score,a:r.away_score,winner:r.winner||null};
      });
      const overrides={};
      rows.results.forEach(r=>{
        if(r.match_id.startsWith('override_'))overrides[r.match_id.replace('override_','')]=r.home_score;
      });
      const standings={};
      for(const[grp]of Object.entries(GROUPS)){
        const grpMatches=GROUP_MATCHES.filter(m=>m.g===grp);
        standings[grp]=calcStandings(grpMatches,resMap);
      }
      const bracket={};
      for(const[grp,table]of Object.entries(standings)){
        bracket[`1${grp}`]=overrides[`1${grp}`]||table[0]?.name||`1${grp}`;
        bracket[`2${grp}`]=overrides[`2${grp}`]||table[1]?.name||`2${grp}`;
        bracket[`3${grp}`]=overrides[`3${grp}`]||table[2]?.name||`3${grp}`;
      }
      const thirds=Object.entries(standings)
        .map(([grp,table])=>({...(table[2]||{}),grp}))
        .filter(t=>t.played>0)
        .sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf)
        .slice(0,8);
      thirds.forEach(t=>{if(!overrides[`3best_${t.grp}`])bracket[`3best_${t.grp}`]=t.name;});
      // Knockout W/L-brackets: winner/loser van elke afgespeelde knockoutwedstrijd
      Object.entries(resMap).forEach(([mid,res])=>{
        if(res.winner){
          const num=mid.replace('m','');
          bracket[`W${num}`]=res.winner;
          // Bepaal de verliezer voor 3de-plaatsmatch (L101, L102)
          // Verliezer = de andere ploeg (home of away die NIET wint)
          // We kunnen home/away niet hier bepalen zonder MATCHES — wordt afgehandeld via bracket zelf
        }
      });
      return json({standings,bracket,overrides});
    }

    if(path==='/api/bracket-override'&&request.method==='PUT'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const{slot,team}=await request.json();
      await env.DB.prepare(
        `INSERT INTO results(match_id,home_score,away_score)VALUES(?,?,0)
         ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score`
      ).bind('override_'+slot,team).run();
      return json({ok:true});
    }

    // ── BONUS ─────────────────────────────────────────────
    if(path==='/api/bonus'&&request.method==='GET'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const row=await env.DB.prepare('SELECT * FROM bonus_predictions WHERE player=?').bind(user.name).first();
      return json(row||{});
    }

    if(path==='/api/bonus'&&request.method==='PUT'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const{champion,topscorer,goals}=await request.json();
      await env.DB.prepare(
        `INSERT INTO bonus_predictions(player,champion,topscorer,goals)VALUES(?,?,?,?)
         ON CONFLICT(player)DO UPDATE SET champion=excluded.champion,topscorer=excluded.topscorer,goals=excluded.goals`
      ).bind(user.name,champion||null,topscorer||null,goals!=null?parseInt(goals):null).run();
      return json({ok:true});
    }

    if(path==='/api/bonus-result'&&request.method==='GET'){
      const row=await env.DB.prepare("SELECT * FROM results WHERE match_id='bonus'").first();
      if(!row)return json({});
      try{return json(JSON.parse(row.home_score+''));}catch{return json({});}
    }

    if(path==='/api/bonus-result'&&request.method==='PUT'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const data=await request.json();
      await env.DB.prepare(
        `INSERT INTO results(match_id,home_score,away_score)VALUES('bonus',?,0)
         ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score`
      ).bind(JSON.stringify(data)).run();
      return json({ok:true});
    }


    if(path==='/api/push/subscribe'&&request.method==='POST'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const{endpoint,p256dh,auth}=await request.json();
      if(!endpoint||!p256dh||!auth)return err('Ongeldige subscription');
      await env.DB.prepare(
        'INSERT INTO push_subscriptions(player,endpoint,p256dh,auth)VALUES(?,?,?,?)ON CONFLICT(endpoint)DO UPDATE SET player=excluded.player'
      ).bind(user.name,endpoint,p256dh,auth).run();
      return json({ok:true});
    }

    if(path==='/api/push/unsubscribe'&&request.method==='POST'){
      const{endpoint}=await request.json();
      await env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint=?').bind(endpoint).run();
      return json({ok:true});
    }

    if(path==='/api/push/send'&&request.method==='POST'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const{title,body,url}=await request.json();
      try{
        const result=await sendPush(env,{title,body,url});
        return json({sent:1,onesignal:result});
      }catch(e){
        return err(`Push mislukt: ${e.message}`,500);
      }
    }


    if(path==='/api/reactions'&&request.method==='GET'){
      const matchId=url.searchParams.get('match_id');
      if(!matchId)return err('match_id vereist');
      const rows=await env.DB.prepare('SELECT from_player,on_player,emoji FROM reactions WHERE match_id=?').bind(matchId).all();
      return json(rows.results);
    }

    if(path==='/api/reactions'&&request.method==='POST'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const{onPlayer,matchId,emoji}=await request.json();
      if(!onPlayer||!matchId||!emoji)return err('Ongeldige data');
      // Verwijder als al zelfde emoji, anders update
      const existing=await env.DB.prepare('SELECT emoji FROM reactions WHERE from_player=? AND on_player=? AND match_id=?').bind(user.name,onPlayer,matchId).first();
      if(existing&&existing.emoji===emoji){
        await env.DB.prepare('DELETE FROM reactions WHERE from_player=? AND on_player=? AND match_id=?').bind(user.name,onPlayer,matchId).run();
        return json({ok:true,removed:true});
      }
      await env.DB.prepare('INSERT INTO reactions(from_player,on_player,match_id,emoji)VALUES(?,?,?,?)ON CONFLICT(from_player,on_player,match_id)DO UPDATE SET emoji=excluded.emoji').bind(user.name,onPlayer,matchId,emoji).run();
      return json({ok:true});
    }


    if(path==='/api/admin/users'&&request.method==='GET'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const rows=await env.DB.prepare('SELECT name,email,avatar,last_seen FROM users ORDER BY last_seen DESC NULLS LAST').all();
      return json(rows.results);
    }

    if(path==='/api/bonus-all'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT player,champion,topscorer,goals FROM bonus_predictions').all();
      return json(rows.results.map(r=>({name:r.player,champion:r.champion||'',topscorer:r.topscorer||'',goals:r.goals!=null?r.goals:null})));
    }

    if(path==='/api/titles-unlocked'&&request.method==='GET'){
      const row=await env.DB.prepare("SELECT home_score FROM results WHERE match_id='titles_unlocked'").first();
      return json({unlocked:row?.home_score===1});
    }

    if(path==='/api/titles-unlocked'&&request.method==='PUT'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const{unlocked}=await request.json();
      await env.DB.prepare(
        `INSERT INTO results(match_id,home_score,away_score)VALUES('titles_unlocked',?,0)
         ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score`
      ).bind(unlocked?1:0).run();
      return json({ok:true});
    }

    // ── RANKING ───────────────────────────────────────────
    if(path==='/api/ranking'&&request.method==='GET'){
      const users=await env.DB.prepare('SELECT name,avatar FROM users ORDER BY created_at').all();
      const allPreds=await env.DB.prepare('SELECT player,match_id,home_score,away_score,winner FROM predictions').all();
      const allResults=await env.DB.prepare('SELECT match_id,home_score,away_score,winner FROM results').all();
      const allBonus=await env.DB.prepare('SELECT * FROM bonus_predictions').all();
      const predsMap={};
      allPreds.results.forEach(r=>{
        if(!predsMap[r.player])predsMap[r.player]={};
        predsMap[r.player][r.match_id]={h:r.home_score,a:r.away_score,winner:r.winner};
      });
      const resMap={};let bonusResult={};
      allResults.results.forEach(r=>{
        if(r.match_id==='bonus'){try{bonusResult=JSON.parse(r.home_score);}catch{}}
        else if(!r.match_id.startsWith('override_')&&r.match_id!=='topscorers'&&r.match_id!=='titles_unlocked'){
          resMap[r.match_id]={h:r.home_score,a:r.away_score,winner:r.winner||null};
        }
      });
      const bonusMap={};
      allBonus.results.forEach(r=>{bonusMap[r.player]=r;});

      function normalizeStr(s){
        if(!s)return'';
        return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
      }
      function nameMatch(a,b){
        const na=normalizeStr(a), nb=normalizeStr(b);
        if(na===nb)return true;
        // Gedeeltelijke match: één naam is onderdeel van de andere
        const partsA=na.split(/\s+/), partsB=nb.split(/\s+/);
        return partsA.some(p=>p.length>2&&nb.includes(p))||partsB.some(p=>p.length>2&&na.includes(p));
      }

      const ranking=users.results.map(({name,avatar})=>{
        let pts=0,exact=0,win=0,draws=0,filled=0,bonusPts=0,knockoutPts=0;
        const preds=predsMap[name]||{};
        for(const[mid,pred]of Object.entries(preds)){
          filled++;
          if(pred.h===pred.a)draws++;
          const res=resMap[mid];
          if(res){
            if(pred.h===res.h&&pred.a===res.a){pts+=3;exact++;}
            else{
              const pw=pred.h>pred.a?1:pred.h<pred.a?-1:0;
              const rw=res.h>res.a?1:res.h<res.a?-1:0;
              if(pw===rw){pts+=1;win++;}
            }
            // Knockout bonus: +1 pt voor juiste doorwinnaar
            if(pred.winner&&res.winner&&pred.winner===res.winner){pts+=1;knockoutPts+=1;}
          }
        }
        const bp=bonusMap[name];
        if(bp&&bonusResult.champion&&bp.champion===bonusResult.champion)bonusPts+=8;
        if(bp&&bonusResult.topscorer&&nameMatch(bp.topscorer,bonusResult.topscorer))
          bonusPts+=(bp.goals!=null&&bp.goals===bonusResult.goals)?12:8;
        pts+=bonusPts;
        return{name,avatar:avatar||'🏳️',pts,exact,win,draws,filled,bonusPts,knockoutPts};
      }).sort((a,b)=>b.pts-a.pts||b.exact-a.exact);
      return json(ranking);
    }

    return err('Niet gevonden',404);
  },
};
