// Run with: node tests/logic.test.mjs
import assert from "node:assert/strict";
import {SEED,REPEATERS,calc,groups,annual,rankOf,ord,sheetRows,termStats,grade,parseNames} from "../logic.js";
const all=[...SEED,...REPEATERS].map(n=>n.toLowerCase());
assert.equal(SEED.length,147);assert.equal(REPEATERS.length,21);
assert.equal(new Set(all).size,all.length,"no duplicate names");
const c={subject:"Mathematics",cls:"SS2",teacher:"T",bonus:false,
 students:{a:{n:"Zed Bo",s:"M",r:false},b:{n:"Amy Li",s:"F",r:true},c:{n:"Ben Ko",s:"M",r:false},d:{n:"No Sex",s:"",r:false}},
 scores:{1:{a:{a:8,b:7,c:9,e:50,at:5,tb:5,nb:5},b:{a:10,b:10,c:10,e:70,at:5,tb:5,nb:5}},2:{a:{a:5,b:5,c:5,e:40}}}};
assert.equal(calc(c,"1","a").t,8+7+9+50);           // bonus off
c.bonus=true;assert.equal(calc(c,"1","a").ex,65);assert.equal(calc(c,"1","a").t,8+7+9+65); // 50+15
assert.equal(calc(c,"1","b").ex,70);assert.equal(calc(c,"1","b").t,100);                    // capped at 70
assert.equal(calc(c,"1","c"),null);
const an=annual(c,"a");assert.equal(an.sum,89+55);assert.equal(an.n,2);assert.equal(an.avg,72);
assert.equal(annual(c,"b").avg,100);assert.equal(annual(c,"c").avg,null);
assert.deepEqual(rankOf(c,"1","a"),{p:2,n:2});assert.deepEqual(rankOf(c,"1","b"),{p:1,n:2});
assert.deepEqual(groups(c).map(g=>[g[0],g[1].map(s=>s.n)]),[["Male",["Ben Ko","Zed Bo"]],["Female",["Amy Li"]],["Sex not set",["No Sex"]]]);
assert.equal(termStats(c,"1").scored,2);
assert.deepEqual([1,2,3,4,11,12,13,21,22,101].map(ord),["1st","2nd","3rd","4th","11th","12th","13th","21st","22nd","101st"]);
const {rows,merges}=sheetRows(c);
assert.equal(rows[6].length,23);assert.equal(rows[6][0],"S/N");assert.equal(merges.length,3);
const ben=rows.find(r=>r[1]==="Ben Ko"),zed=rows.find(r=>r[1]==="Zed Bo"),amy=rows.find(r=>r[1]==="Amy Li (Repeater)");
assert.ok(amy&&ben&&zed);assert.equal(zed[6],65);assert.equal(zed[7],89);assert.equal(zed[13],55);assert.equal(zed[20],144);assert.equal(zed[21],144);assert.equal(zed[22],72);
assert.equal(zed[4],"");                      // 3rd test column stays blank
assert.ok(rows.findIndex(r=>r[1]==="MALE")<rows.findIndex(r=>r[1]==="FEMALE"));
assert.deepEqual([100,70,69,60,50,49,45,44,40,39,0].map(grade),["A","A","B","B","C","D","D","E","E","F","F"].map((g,i)=>[ "A","A","B","B","C","D","D","E","E","F","F"][i]).map((g,i)=>g));
assert.deepEqual(parseNames("1. ada  obi, f, R\n\nTunde Bello\nKemi Ade, Male"),[{n:"ada obi",s:"F",r:true},{n:"Tunde Bello",s:"",r:false},{n:"Kemi Ade",s:"M",r:false}]);
console.log("All tests passed");
