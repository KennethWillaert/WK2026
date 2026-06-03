const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json',...CORS}});}
function err(msg,status=400){return json({error:msg},status);}

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

function calcStandings(grpMatches,resMap){
  const teams={};
  grpMatches.forEach(m=>{
    if(!teams[m.h])teams[m.h]={name:m.h,pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,played:0};
    if(!teams[m.a])teams[m.a]={name:m.a,pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,played:0};
    const res=resMap[m.id];
    if(!res)return;
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

export default {
  async fetch(request,env){
    if(request.method==='OPTIONS')return new Response(null,{headers:CORS});
    const url=new URL(request.url);
    const path=url.pathname;

    if(path==='/api/players'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT name FROM players ORDER BY created_at').all();
      return json(rows.results.map(r=>r.name));
    }
    if(path==='/api/players'&&request.method==='POST'){
      const{name}=await request.json();
      if(!name||name.length>30)return err('Ongeldige naam');
      const count=await env.DB.prepare('SELECT COUNT(*) as c FROM players').first();
      if(count.c>=15)return err('Maximum 15 spelers bereikt');
      try{await env.DB.prepare('INSERT INTO players (name) VALUES (?)').bind(name.trim()).run();return json({ok:true});}
      catch{return err('Speler bestaat al');}
    }
    if(path.startsWith('/api/players/')&&request.method==='DELETE'){
      const name=decodeURIComponent(path.split('/api/players/')[1]);
      await env.DB.prepare('DELETE FROM players WHERE name = ?').bind(name).run();
      await env.DB.prepare('DELETE FROM predictions WHERE player = ?').bind(name).run();
      await env.DB.prepare('DELETE FROM bonus_predictions WHERE player = ?').bind(name).run();
      return json({ok:true});
    }

    if(path==='/api/predictions'&&request.method==='GET'){
      const player=url.searchParams.get('player');
      if(!player)return err('player vereist');
      const rows=await env.DB.prepare('SELECT match_id,home_score,away_score FROM predictions WHERE player=?').bind(player).all();
      const result={};
      rows.results.forEach(r=>{result[r.match_id]={h:r.home_score,a:r.away_score};});
      return json(result);
    }
    if(path==='/api/predictions'&&request.method==='PUT'){
      const{player,matchId,h,a,kickoff}=await request.json();
      if(!player||!matchId||h==null||a==null)return err('Ontbrekende velden');
      if(kickoff&&Date.now()>=kickoff)return err('Wedstrijd is al begonnen — prono vergrendeld');
      await env.DB.prepare(
        `INSERT INTO predictions(player,match_id,home_score,away_score)VALUES(?,?,?,?)
         ON CONFLICT(player,match_id)DO UPDATE SET home_score=excluded.home_score,away_score=excluded.away_score`
      ).bind(player,matchId,parseInt(h),parseInt(a)).run();
      return json({ok:true});
    }

    if(path==='/api/results'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT match_id,home_score,away_score FROM results').all();
      const result={};
      rows.results.forEach(r=>{result[r.match_id]={h:r.home_score,a:r.away_score};});
      return json(result);
    }
    if(path==='/api/results'&&request.method==='PUT'){
      const{matchId,h,a}=await request.json();
      if(!matchId||h==null||a==null)return err('Ontbrekende velden');
      await env.DB.prepare(
        `INSERT INTO results(match_id,home_score,away_score)VALUES(?,?,?)
         ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score,away_score=excluded.away_score`
      ).bind(matchId,parseInt(h),parseInt(a)).run();
      return json({ok:true});
    }

    if(path==='/api/standings'&&request.method==='GET'){
      const rows=await env.DB.prepare('SELECT match_id,home_score,away_score FROM results').all();
      const resMap={};
      rows.results.forEach(r=>{
        if(!r.match_id.startsWith('override_')&&r.match_id!=='bonus')
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
      const{slot,team}=await request.json();
      await env.DB.prepare(
        `INSERT INTO results(match_id,home_score,away_score)VALUES(?,?,0)
         ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score`
      ).bind('override_'+slot,team).run();
      return json({ok:true});
    }

    if(path==='/api/bonus'&&request.method==='GET'){
      const player=url.searchParams.get('player');
      if(!player)return err('player vereist');
      const row=await env.DB.prepare('SELECT * FROM bonus_predictions WHERE player=?').bind(player).first();
      return json(row||{});
    }
    if(path==='/api/bonus'&&request.method==='PUT'){
      const{player,champion,topscorer,goals}=await request.json();
      if(!player)return err('player vereist');
      await env.DB.prepare(
        `INSERT INTO bonus_predictions(player,champion,topscorer,goals)VALUES(?,?,?,?)
         ON CONFLICT(player)DO UPDATE SET champion=excluded.champion,topscorer=excluded.topscorer,goals=excluded.goals`
      ).bind(player,champion||null,topscorer||null,goals!=null?parseInt(goals):null).run();
      return json({ok:true});
    }

    if(path==='/api/bonus-result'&&request.method==='GET'){
      const row=await env.DB.prepare("SELECT * FROM results WHERE match_id='bonus'").first();
      if(!row)return json({});
      try{return json(JSON.parse(row.home_score+''));}catch{return json({});}
    }
    if(path==='/api/bonus-result'&&request.method==='PUT'){
      const data=await request.json();
      await env.DB.prepare(
        `INSERT INTO results(match_id,home_score,away_score)VALUES('bonus',?,0)
         ON CONFLICT(match_id)DO UPDATE SET home_score=excluded.home_score`
      ).bind(JSON.stringify(data)).run();
      return json({ok:true});
    }

    if(path==='/api/ranking'&&request.method==='GET'){
      const players=await env.DB.prepare('SELECT name FROM players ORDER BY created_at').all();
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
        else if(!r.match_id.startsWith('override_')){resMap[r.match_id]={h:r.home_score,a:r.away_score};}
      });
      const bonusMap={};
      allBonus.results.forEach(r=>{bonusMap[r.player]=r;});
      const ranking=players.results.map(({name})=>{
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
        if(bp&&bonusResult.champion&&bp.champion===bonusResult.champion)bonusPts+=10;
        if(bp&&bonusResult.topscorer&&bp.topscorer===bonusResult.topscorer)
          bonusPts+=(bp.goals!=null&&bp.goals===bonusResult.goals)?8:5;
        pts+=bonusPts;
        return{name,pts,exact,win,filled,bonusPts};
      }).sort((a,b)=>b.pts-a.pts||b.exact-a.exact);
      return json(ranking);
    }

    return err('Niet gevonden',404);
  },
};
