// Student lists from the school PDF (duplicates removed).
export const SEED=`Mustapha Roheemat|Ogundairo Deborah|Oladele Rodiat|Olalekan Aliyat|Olaniyan Rodiat|Shuaib Mariam|Yusuff Ayisat|Samuel Taiwo|Ajayi Dorcas|Rasaq Rukayat|Sanni Aishat|Daramola Aishat|Usman Abibat|Isaac Roseline|Gbadebo Rebecca|Dominic Sunday|Abubakar Haruna|Ajobo Adams|Ayomikun Michael|Arimoye Peter|David Andrew|Ibrahim Rosheed|Ibrahim Samad|Muritala Abdulrasheed|Omowunmi Fridaus|Olaniyan Julius|Olaniyi Samad|Oloyode Abdulsamad|Oyedokun Kholeed|Peter Sunday|Olukunmi Daniel|Rasaqi Ridwan|Saruni Qudus|Samuel Kehinde|John Joseph|James David|Ismail Samad|Usman Isiaq|Abraham Blessing|Abubakar Lawazana|Akorede Sofiat|Atobatele Deborah|Ajani Adenike|Badmos Halia|Dada Heritage|Hamzat Ayoka|Idris Rokeebat|Muhammed Mariam|Muhammed Sadiat|Akorede Fathia|Atiba Kingsley|Jimoh Rihanat|Salami Roheeb|Abass Rokeeb|Kolajo Saheed|Ali Ummi|Rahman Idowu|Sanmi Bello|Wahhab Yusroh|Abubakar Fatimah|Ogunleye Al-Ameen|Abiodun Opeyemi|Muridala Ganiyat|Okunlola Daniel|Abdulhamed Aminat|Zakariyahu Sheriff|Abdullah Bariyat|Adegoke Mariam|Adejumo Barakat|Adeyemi Haliyat|Akinrinde Blessing|Adeyemo Haliyat|Adeniyi Aanuoluwapo|Amuda Mariam|Bello Anifat|Dada Ajoke|Fakayode Aliat|Gbadamosi Sukurat|Hassan Abidat|Ibrahim Roheemot|Issa Khadijat|Kehinde Dorcas|Morakinyo Taiwo|Maritala Ganiya|Nofiu Sadia|Ogooluway Mary|Ogunsola Mercy|Olaniyi Busayo|Olaoye Soliat|Olasupo Rodiat|Olowookere Anuoluwapo|Rasidi Rokeebat|Saheed Shukura|Sanusi Faisat|Sunday Anuoluwapo|Adedeji Pamilerin|Anas Musa|Jacob Samuel|Abubakr Sadiq|Adeagbo Anuoluwapo|Aderinto Abdulsemiu|Adesina Abdulquadri|Babalola Fawas|Bashir Sanusi|Fantola Eniola|Ganiyu Sikiru|Ganiyu Soliu|Hamzat Fawas|Hassan Muhammad|Hastrup Juda|Ibrahim Yusuf|Johnson Joseph|Lasisi Sodiq|Morakinyo Selim|Muhammed Tuko|Musa Ibrahim|Nurudeen Akeem|Ibrahim Salaudeen|Nurudeen Lukman|Ogbu Friday|Oladimeji Micheal|Olasunkanmi Samuel|Olowoake Ridwan|Oloyede Kehinde|Oloyede Taiwo|Oyebamiji Damilare|Raufu Oluwatosin|Sahabi Yesiru|Saheed Toheeb|Salaudeen Taofeek|Hassan Hussein|Umaru Yisa|Usman Kehinde|Akeem Olasunkanmi|Akinpelu Nurudeen|Paul John|Adesina Rokeebat|Adewusi Fatimo|Aliu Faidat|Augustine Bose M|Ayinde Kareemat|David Favour|Godwin Grace R.|Morakinyo Kehinde|Muritador Khadijat|Omisakin Blessing|Adejumo Victoria`.split("|");
export const REPEATERS=`Afolabi Ayomide|Aderibigbe Shaeed|Kazeem Kehinde|Muhammed Yusuf|Abdul-Rahman Maidat|Tajudeen Fathia|Abdul-Salam Faidat|Ganiyu Nafisat|Adeniyi Zainab|Sulaimon Aishat|Tajudeen Queen|Alimi Samad|Adeyemo Rofiat|Adeleke Marvelous|Ajani Aliat|Jacob Blessing|Lawal Rabiu|Amusa Abdullahi|Simeon Isaiah ebuka|Usman Abubakar|Usman Nafisat`.split("|");

export const LBL={1:"1st term",2:"2nd term",3:"3rd term"};
export const num=v=>(v===undefined||v===null||v==="")?0:+v;

// One student's scores for one term. Bonus goes into the exam only when c.bonus is on; exam is capped at 70.
export function calc(c,term,sid){
  const r=(c.scores?.[term]||{})[sid];
  if(!r||!["a","b","c","e"].some(k=>r[k]!==undefined))return null;
  const bonus=c.bonus?num(r.at)+num(r.tb)+num(r.nb):0;
  const ex=Math.min(70,num(r.e)+bonus);
  return {a:num(r.a),b:num(r.b),c:num(r.c),ex,t:num(r.a)+num(r.b)+num(r.c)+ex};
}
export const students=c=>Object.entries(c.students||{}).map(([id,s])=>({id,...s}))
  .sort((x,y)=>x.n.localeCompare(y.n,undefined,{sensitivity:"base"}));
export const groups=c=>{const l=students(c);
  return [["Male",l.filter(s=>s.s==="M")],["Female",l.filter(s=>s.s==="F")],["Sex not set",l.filter(s=>!s.s)]].filter(g=>g[1].length)};

export function annual(c,sid){
  let sum=0,n=0;const t={};
  for(const k of ["1","2","3"]){const x=calc(c,k,sid);t[k]=x;if(x){sum+=x.t;n++;}}
  return {t,sum,n,avg:n?Math.round(sum/n*10)/10:null};
}
export function rankOf(c,term,sid){
  const x=calc(c,term,sid);if(!x)return null;
  let p=1,n=0;
  for(const s of students(c)){const y=calc(c,term,s.id);if(y){n++;if(y.t>x.t)p++;}}
  return {p,n};
}
export function termStats(c,term){
  const l=students(c).map(s=>calc(c,term,s.id)).filter(Boolean);
  return {scored:l.length,total:Object.keys(c.students||{}).length,avg:l.length?Math.round(l.reduce((a,x)=>a+x.t,0)/l.length*10)/10:null};
}
export const ord=n=>n+(["th","st","nd","rd"][(n%100>10&&n%100<14)?0:Math.min(n%10,4)%4]||"th");

// Rows for the Excel file, laid out like the paper scoresheet.
export function sheetRows(c){
  const W=23,rows=[],merges=[],blank=()=>Array(W).fill("");
  rows.push(["SUBJECT:",c.subject],["CLASS:",c.cls],["TEACHER:",c.teacher],["TERM:","1st, 2nd & 3rd terms"],[]);
  const g=blank();["1ST TERM","2ND TERM","3RD TERM"].forEach((t,i)=>{g[2+i*6]=t;merges.push({s:{r:5,c:2+i*6},e:{r:5,c:7+i*6}});});
  rows.push(g);
  const cols=["1ST TEST","2ND TEST","3RD TEST","CLASS EXERCISE","EXAM","TOTAL"];
  rows.push(["S/N","NAMES",...cols,...cols,...cols,"Annual","Total Score","WEIGHTED AVERAGE"]);
  for(const [label,list] of groups(c)){
    const l=blank();l[1]=label.toUpperCase();rows.push(l);
    list.forEach((s,i)=>{
      const r=blank();r[0]=i+1;r[1]=s.n+(s.r?" (Repeater)":"");
      const an=annual(c,s.id);
      ["1","2","3"].forEach((t,k)=>{const x=an.t[t];if(!x)return;const o=2+k*6;r[o]=x.a;r[o+1]=x.b;r[o+3]=x.c;r[o+4]=x.ex;r[o+5]=x.t;});
      if(an.n){r[20]=an.sum;r[21]=an.sum;r[22]=an.avg;}
      rows.push(r);
    });
  }
  return {rows,merges};
}

// Grade scale used in the app and reports. Edit the numbers here to match your school.
export const grade=t=>t>=70?"A":t>=60?"B":t>=50?"C":t>=45?"D":t>=40?"E":"F";

// Turns pasted text into students. Line format: "Name", or "Name, F", or "Name, M, R" (R = repeater).
export function parseNames(text){
  const out=[];
  for(const line of String(text).split(/\r?\n/)){
    const p=line.split(",").map(x=>x.trim()).filter(Boolean);
    const n=(p[0]||"").replace(/^\d+[.)]\s*/,"").replace(/\s+/g," ");
    if(!n)continue;
    let s="",r=false;
    for(const f of p.slice(1).map(x=>x.toLowerCase())){
      if(f==="m"||f==="male")s="M";else if(f==="f"||f==="female")s="F";else if(f==="r"||f==="repeater")r=true;
    }
    out.push({n,s,r});
  }
  return out;
}
