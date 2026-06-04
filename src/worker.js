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
  'm1':['Mexico','Zuid-Afrika'],'m2':['Zuid-Korea','Tsjechië'],
  'm3':['Canada','Bosnië'],'m4':['VS','Paraguay'],
  'm5':['Qatar','Zwitserland'],'m6':['Brazilië','Marokko'],
  'm7':['Haïti','Schotland'],'m8':['Australië','Turkije'],
  'm9':['Duitsland','Curaçao'],'m10':['Nederland','Japan'],
  'm11':['Ivoorkust','Ecuador'],'m12':['Oekraïne','Tunesië'],
  'm13':['Spanje','Kaapverdië'],'m14':['België','Egypte'],
  'm15':['Saoedi-Arabië','Uruguay'],'m16':['Iran','Nieuw-Zeeland'],
  'm17':['Frankrijk','Senegal'],'m18':['Irak','Noorwegen'],
  'm19':['Argentinië','Algerije'],'m20':['Oostenrijk','Jordanië'],
  'm21':['Portugal','DRC'],'m22':['Engeland','Kroatië'],
  'm23':['Ghana','Panama'],'m24':['Oezbekistan','Colombia'],
  'm25':['Tsjechië','Zuid-Afrika'],'m26':['Zwitserland','Italië'],
  'm27':['Canada','Qatar'],'m28':['Mexico','Zuid-Korea'],
  'm29':['Schotland','Marokko'],'m30':['VS','Australië'],
  'm31':['Brazilië','Haïti'],'m32':['Turkije','Paraguay'],
  'm33':['Nederland','Oekraïne'],'m34':['Duitsland','Ivoorkust'],
  'm35':['Ecuador','Curaçao'],'m36':['Tunesië','Japan'],
  'm37':['Spanje','Saoedi-Arabië'],'m38':['België','Iran'],
  'm39':['Uruguay','Kaapverdië'],'m40':['Nieuw-Zeeland','Egypte'],
  'm41':['Argentinië','Oostenrijk'],'m42':['Frankrijk','Irak'],
  'm43':['Noorwegen','Senegal'],'m44':['Jordanië','Algerije'],
  'm45':['Portugal','Oezbekistan'],'m46':['Engeland','Ghana'],
  'm47':['Panama','Kroatië'],'m48':['Colombia','DRC'],
  'm49':['Zwitserland','Canada'],'m50':['Italië','Qatar'],
  'm51':['Schotland','Brazilië'],'m52':['Marokko','Haïti'],
  'm53':['Tsjechië','Mexico'],'m54':['Zuid-Afrika','Zuid-Korea'],
  'm55':['Ecuador','Duitsland'],'m56':['Curaçao','Ivoorkust'],
  'm57':['Japan','Oekraïne'],'m58':['Tunesië','Nederland'],
  'm59':['Turkije','VS'],'m60':['Paraguay','Australië'],
  'm61':['Noorwegen','Frankrijk'],'m62':['Senegal','Irak'],
  'm63':['Kaapverdië','Saoedi-Arabië'],'m64':['Uruguay','Spanje'],
  'm65':['Egypte','Iran'],'m66':['Nieuw-Zeeland','België'],
  'm67':['Panama','Engeland'],'m68':['Kroatië','Ghana'],
  'm69':['Colombia','Portugal'],'m70':['DRC','Oezbekistan'],
  'm71':['Algerije','Oostenrijk'],'m72':['Jordanië','Argentinië'],
};

const GROUPS={
  A:['Mexico','Zuid-Korea','Zuid-Afrika','Tsjechië'],
  B:['Canada','Qatar','Zwitserland','Italië'],
  C:['Brazilië','Marokko','Schotland','Haïti'],
  D:['VS','Australië','Paraguay','Turkije'],
  E:['Duitsland','Ecuador','Ivoorkust','Curaçao'],
  F:['Nederland','Japan','Tunesië','Oekraïne'],
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
  {id:'m11',h:'Ivoorkust',a:'Ecuador',g:'E'},{id:'m12',h:'Oekraïne',a:'Tunesië',g:'F'},
  {id:'m13',h:'Spanje',a:'Kaapverdië',g:'H'},{id:'m14',h:'België',a:'Egypte',g:'G'},
  {id:'m15',h:'Saoedi-Arabië',a:'Uruguay',g:'H'},{id:'m16',h:'Iran',a:'Nieuw-Zeeland',g:'G'},
  {id:'m17',h:'Frankrijk',a:'Senegal',g:'I'},{id:'m18',h:'Irak',a:'Noorwegen',g:'I'},
  {id:'m19',h:'Argentinië',a:'Algerije',g:'J'},{id:'m20',h:'Oostenrijk',a:'Jordanië',g:'J'},
  {id:'m21',h:'Portugal',a:'DRC',g:'K'},{id:'m22',h:'Engeland',a:'Kroatië',g:'L'},
  {id:'m23',h:'Ghana',a:'Panama',g:'L'},{id:'m24',h:'Oezbekistan',a:'Colombia',g:'K'},
  {id:'m25',h:'Tsjechië',a:'Zuid-Afrika',g:'A'},{id:'m26',h:'Zwitserland',a:'Italië',g:'B'},
  {id:'m27',h:'Canada',a:'Qatar',g:'B'},{id:'m28',h:'Mexico',a:'Zuid-Korea',g:'A'},
  {id:'m29',h:'Schotland',a:'Marokko',g:'C'},{id:'m30',h:'VS',a:'Australië',g:'D'},
  {id:'m31',h:'Brazilië',a:'Haïti',g:'C'},{id:'m32',h:'Turkije',a:'Paraguay',g:'D'},
  {id:'m33',h:'Nederland',a:'Oekraïne',g:'F'},{id:'m34',h:'Duitsland',a:'Ivoorkust',g:'E'},
  {id:'m35',h:'Ecuador',a:'Curaçao',g:'E'},{id:'m36',h:'Tunesië',a:'Japan',g:'F'},
  {id:'m37',h:'Spanje',a:'Saoedi-Arabië',g:'H'},{id:'m38',h:'België',a:'Iran',g:'G'},
  {id:'m39',h:'Uruguay',a:'Kaapverdië',g:'H'},{id:'m40',h:'Nieuw-Zeeland',a:'Egypte',g:'G'},
  {id:'m41',h:'Argentinië',a:'Oostenrijk',g:'J'},{id:'m42',h:'Frankrijk',a:'Irak',g:'I'},
  {id:'m43',h:'Noorwegen',a:'Senegal',g:'I'},{id:'m44',h:'Jordanië',a:'Algerije',g:'J'},
  {id:'m45',h:'Portugal',a:'Oezbekistan',g:'K'},{id:'m46',h:'Engeland',a:'Ghana',g:'L'},
  {id:'m47',h:'Panama',a:'Kroatië',g:'L'},{id:'m48',h:'Colombia',a:'DRC',g:'K'},
  {id:'m49',h:'Zwitserland',a:'Canada',g:'B'},{id:'m50',h:'Italië',a:'Qatar',g:'B'},
  {id:'m51',h:'Schotland',a:'Brazilië',g:'C'},{id:'m52',h:'Marokko',a:'Haïti',g:'C'},
  {id:'m53',h:'Tsjechië',a:'Mexico',g:'A'},{id:'m54',h:'Zuid-Afrika',a:'Zuid-Korea',g:'A'},
  {id:'m55',h:'Ecuador',a:'Duitsland',g:'E'},{id:'m56',h:'Curaçao',a:'Ivoorkust',g:'E'},
  {id:'m57',h:'Japan',a:'Oekraïne',g:'F'},{id:'m58',h:'Tunesië',a:'Nederland',g:'F'},
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
    const hs=match.score?.fullTime?.home;
    const as_=match.score?.fullTime?.away;
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

    await env.DB.prepare(
      `INSERT INTO results(match_id,home_score,away_score)VALUES(?,?,?)
       ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score,away_score=excluded.away_score`
    ).bind(mid,homeScore,awayScore).run();
    synced++;
  }

  // Sync topscorers — alleen als er al wedstrijden gespeeld zijn
  if(synced>0){
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
  }

  return{synced,message:`${synced} wedstrijden gesynchroniseerd`};
}

export default {
  // Cron trigger: elke 5 minuten tijdens het WK
  async scheduled(event,env,ctx){
    ctx.waitUntil(syncFromFootballData(env));
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

    // ── PLAYERS ───────────────────────────────────────────
    if(path==='/api/players'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT name FROM users ORDER BY created_at').all();
      return json(rows.results.map(r=>r.name));
    }

    // ── PREDICTIONS ───────────────────────────────────────
    if(path==='/api/predictions'&&request.method==='GET'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const rows=await env.DB.prepare('SELECT match_id,home_score,away_score FROM predictions WHERE player=?').bind(user.name).all();
      const result={};
      rows.results.forEach(r=>{result[r.match_id]={h:r.home_score,a:r.away_score};});
      return json(result);
    }

    if(path==='/api/predictions'&&request.method==='PUT'){
      const user=await getUser(request,env);
      if(!user)return err('Niet ingelogd',401);
      const{matchId,h,a,kickoff}=await request.json();
      if(!matchId||h==null||a==null)return err('Ontbrekende velden');
      if(kickoff&&Date.now()>=kickoff)return err('Wedstrijd is al begonnen — prono vergrendeld');
      await env.DB.prepare(
        `INSERT INTO predictions(player,match_id,home_score,away_score)VALUES(?,?,?,?)
         ON CONFLICT(player,match_id)DO UPDATE SET home_score=excluded.home_score,away_score=excluded.away_score`
      ).bind(user.name,matchId,parseInt(h),parseInt(a)).run();
      return json({ok:true});
    }

    // ── RESULTS ───────────────────────────────────────────
    if(path==='/api/results'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT match_id,home_score,away_score FROM results').all();
      const result={};
      rows.results.forEach(r=>{result[r.match_id]={h:r.home_score,a:r.away_score};});
      return json(result);
    }

    if(path==='/api/results'&&request.method==='PUT'){
      const user=await getUser(request,env);
      if(!user||!user.is_admin)return err('Geen toegang',403);
      const{matchId,h,a}=await request.json();
      if(!matchId||h==null||a==null)return err('Ontbrekende velden');
      await env.DB.prepare(
        `INSERT INTO results(match_id,home_score,away_score)VALUES(?,?,?)
         ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score,away_score=excluded.away_score`
      ).bind(matchId,parseInt(h),parseInt(a)).run();
      return json({ok:true});
    }

    // ── TOPSCORERS ────────────────────────────────────────
    if(path==='/api/topscorers'&&request.method==='GET'){
      const row=await env.DB.prepare("SELECT home_score FROM results WHERE match_id='topscorers'").first();
      if(!row)return json([]);
      try{return json(JSON.parse(row.home_score));}catch{return json([]);}
    }

    // ── STANDINGS ─────────────────────────────────────────
    if(path==='/api/standings'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT match_id,home_score,away_score FROM results').all();
      const resMap={};
      rows.results.forEach(r=>{
        if(!r.match_id.startsWith('override_')&&r.match_id!=='bonus'&&r.match_id!=='topscorers')
          resMap[r.match_id]={h:r.home_score,a:r.away_score};
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

    // ── RANKING ───────────────────────────────────────────
    if(path==='/api/ranking'&&request.method==='GET'){
      const users=await env.DB.prepare('SELECT name,avatar FROM users ORDER BY created_at').all();
      const allPreds=await env.DB.prepare('SELECT player,match_id,home_score,away_score FROM predictions').all();
      const allResults=await env.DB.prepare('SELECT match_id,home_score,away_score FROM results').all();
      const allBonus=await env.DB.prepare('SELECT * FROM bonus_predictions').all();
      const predsMap={};
      allPreds.results.forEach(r=>{
        if(!predsMap[r.player])predsMap[r.player]={};
        predsMap[r.player][r.match_id]={h:r.home_score,a:r.away_score};
      });
      const resMap={};let bonusResult={};
      allResults.results.forEach(r=>{
        if(r.match_id==='bonus'){try{bonusResult=JSON.parse(r.home_score);}catch{}}
        else if(!r.match_id.startsWith('override_')&&r.match_id!=='topscorers'){
          resMap[r.match_id]={h:r.home_score,a:r.away_score};
        }
      });
      const bonusMap={};
      allBonus.results.forEach(r=>{bonusMap[r.player]=r;});

      function normalizeStr(s){
        if(!s)return'';
        return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
      }

      const ranking=users.results.map(({name,avatar})=>{
        let pts=0,exact=0,win=0,filled=0,bonusPts=0;
        const preds=predsMap[name]||{};
        for(const[mid,pred]of Object.entries(preds)){
          filled++;
          const res=resMap[mid];
          if(res){
            if(pred.h===res.h&&pred.a===res.a){pts+=3;exact++;}
            else{
              const pw=pred.h>pred.a?1:pred.h<pred.a?-1:0;
              const rw=res.h>res.a?1:res.h<res.a?-1:0;
              if(pw===rw){pts+=1;win++;}
            }
          }
        }
        const bp=bonusMap[name];
        if(bp&&bonusResult.champion&&bp.champion===bonusResult.champion)bonusPts+=8;
        if(bp&&bonusResult.topscorer&&normalizeStr(bp.topscorer)===normalizeStr(bonusResult.topscorer))
          bonusPts+=(bp.goals!=null&&bp.goals===bonusResult.goals)?12:8;
        pts+=bonusPts;
        return{name,avatar:avatar||'🏳️',pts,exact,win,filled,bonusPts};
      }).sort((a,b)=>b.pts-a.pts||b.exact-a.exact);
      return json(ranking);
    }

    return err('Niet gevonden',404);
  },
};
