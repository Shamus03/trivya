(function(e){function t(t){for(var r,c,o=t[0],i=t[1],l=t[2],d=0,f=[];d<o.length;d++)c=o[d],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&f.push(a[c][0]),a[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);s&&s(t);while(f.length)f.shift()();return u.push.apply(u,l||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},u=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/trivya/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],i=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var s=i;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"38c8":function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),a=n("5c40"),u=Object(a["i"])({setup:function(){return function(){return Object(r["f"])("div",null,[Object(r["f"])(Object(r["r"])("router-view"),null,null)])}}}),c=n("9483");Object(c["a"])("".concat("/trivya/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var o=n("1da1"),i=(n("d81d"),n("96cf"),n("caad"),n("2532"),n("99af"),n("bc3a")),l=n.n(i),s=n("260b"),d=(n("e71f"),s["a"].initializeApp({apiKey:"AIzaSyDc2ej0u82U5xnQDWjzBNyFBHh3UwFyfpg",authDomain:"trivya-2135a.firebaseapp.com",projectId:"trivya-2135a",storageBucket:"trivya-2135a.appspot.com",messagingSenderId:"448392939023",appId:"1:448392939023:web:dedce129a86efbe4e1857a"})),f=s["a"].firestore(d),v=f.collection("games");function p(e){return b.apply(this,arguments)}function b(){return b=Object(o["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v.add(t);case 2:return n=e.sent,e.abrupt("return",n.id);case 4:case"end":return e.stop()}}),e)}))),b.apply(this,arguments)}function j(e){return m.apply(this,arguments)}function m(){return m=Object(o["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v.doc(t).get();case 2:return n=e.sent,r=n.data(),e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)}))),m.apply(this,arguments)}var O,g=l.a.create({baseURL:"https://opentdb.com"}),h="";function y(e){return w.apply(this,arguments)}function w(){return w=Object(o["a"])(regeneratorRuntime.mark((function e(t){var n,r,a,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.difficulty,r=t.amount,h){e.next=6;break}return e.next=4,g.get("/api_token.php?command=request");case 4:a=e.sent,h=a.data.token;case 6:return e.next=8,g.get("/api.php",{params:{encode:"url3986",amount:r,difficulty:n,token:h}});case 8:if(u=e.sent,![O.TokenEmpty,O.TokenNotFound].includes(u.data.response_code)){e.next=14;break}return h="",e.next=13,y({difficulty:n,amount:r});case 13:return e.abrupt("return",e.sent);case 14:if(u.data.response_code==O.Success){e.next=16;break}throw new Error("Failed to get questions");case 16:return e.abrupt("return",u.data.results.map((function(e){var t=decodeURIComponent(e.correct_answer),n=e.incorrect_answers.map((function(e){return decodeURIComponent(e)})).concat(t);return{category:decodeURIComponent(e.category),difficulty:decodeURIComponent(e.difficulty),question:decodeURIComponent(e.question),correctAnswer:t,allAnswers:"boolean"===e.type?n.sort().reverse():n.sort()}})));case 17:case"end":return e.stop()}}),e)}))),w.apply(this,arguments)}(function(e){e[e["Success"]=0]="Success",e[e["NoResults"]=1]="NoResults",e[e["InvalidParameter"]=2]="InvalidParameter",e[e["TokenNotFound"]=3]="TokenNotFound",e[e["TokenEmpty"]=4]="TokenEmpty"})(O||(O={}));var k=n("a1e9"),x=n("7129"),S=Object(a["i"])({props:{gameId:{type:String,required:!0}},setup:function(e){var t,n,u,c,i,l,s,d,f,v,p=Object(k["j"])(null),b=Object(k["j"])(!1),m=function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return b.value=!0,t.prev=1,t.next=4,j(e.gameId);case 4:p.value=t.sent,t.next=11;break;case 7:t.prev=7,t.t0=t["catch"](1),alert("An error occurred - returning to main page"),T();case 11:return t.prev=11,b.value=!1,t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[1,7,11,14]])})));return function(){return t.apply(this,arguments)}}();m();var O=JSON.parse(null!==(t=localStorage.getItem("last-game"))&&void 0!==t?t:"null");(null===(n=O)||void 0===n?void 0:n.gameId)!==e.gameId&&(O=null);var g=Object(k["j"])(null!==(u=null===(c=O)||void 0===c?void 0:c.questionNumber)&&void 0!==u?u:0),h=Object(k["j"])(null!==(i=null===(l=O)||void 0===l?void 0:l.correctAnswers)&&void 0!==i?i:0),y=Object(k["j"])(null!==(s=null===(d=O)||void 0===d?void 0:d.incorrectAnswers)&&void 0!==s?s:0),w=Object(k["j"])(null!==(f=null===(v=O)||void 0===v?void 0:v.selectedAnswer)&&void 0!==f?f:"");Object(a["G"])((function(){var t={gameId:e.gameId,questionNumber:g.value,correctAnswers:h.value,incorrectAnswers:y.value,selectedAnswer:w.value};localStorage.setItem("last-game",JSON.stringify(t))}));var S=Object(a["d"])((function(){var e;return(null===(e=p.value)||void 0===e?void 0:e.questions)||[]})),I=Object(a["d"])((function(){return S.value[g.value]})),A=Object(a["d"])((function(){return g.value<S.value.length-1})),R=Object(a["d"])((function(){return h.value/(h.value+y.value)})),q=function(){A.value&&(w.value="",g.value++)},T=function(){N.push({name:"TriviaSetup"})},C=function(e){w.value||(w.value=e,e===I.value.correctAnswer?h.value++:y.value++)},_=function(){navigator.share?navigator.share({title:"Trivya",url:window.location.href}):alert("Your browser does not support sharing!")};return Object(a["G"])((function(){var e;h.value===(null===(e=p.value)||void 0===e?void 0:e.questions.length)&&Object(x["a"])()})),function(){return b.value?Object(r["f"])("div",null,[Object(r["e"])("Loading...")]):Object(r["f"])("div",null,[Object(r["f"])("div",{class:"share-these-questions",onClick:_},[Object(r["e"])("Share these questions")]),Object(r["f"])("div",{class:"question-progress"},[Object(r["e"])("Question: "),g.value+1,Object(r["e"])(" / "),S.value.length]),Object(r["f"])("div",{class:"difficulty"},[Object(r["e"])("Difficulty: "),I.value.difficulty]),Object(r["f"])("div",{class:"category"},[Object(r["e"])("Category: "),I.value.category]),Object(r["f"])(r["b"],{name:"fade",mode:"out-in"},{default:function(){return[Object(r["f"])("div",{key:g.value},[Object(r["f"])("div",{class:"question"},[I.value.question]),Object(r["f"])("div",{class:"answers"},[Object(r["f"])("ul",null,[I.value.allAnswers.map((function(e){return Object(r["f"])("li",{key:e,onClick:function(){return C(e)},class:{"correct-answer":w.value&&e===I.value.correctAnswer,"incorrect-answer":e===w.value&&e!==I.value.correctAnswer}},[e])}))])])])]}}),Object(r["f"])(r["b"],{name:"slide-fade"},{default:function(){return[!!w.value&&Object(r["f"])("div",null,[Object(r["f"])("div",{class:"accuracy"},[!isNaN(R.value)&&Object(r["f"])(r["a"],null,[Object(r["e"])("Accuracy: "),Math.round(100*R.value),Object(r["e"])("%")])]),A.value?Object(r["f"])("div",{class:"next-question"},[Object(r["f"])("button",{onClick:q},[Object(r["e"])("Next Question")])]):Object(r["f"])("div",{class:"set-up-new-game"},[Object(r["f"])("button",{onClick:T},[Object(r["e"])("Set up a new game")])])])]}})])}}}),I=Object(a["i"])({setup:function(){var e=[{text:"Any",value:""},{text:"Easy",value:"easy"},{text:"Medium",value:"medium"},{text:"Hard",value:"hard"}],t=Object(k["j"])(e[0].value),n=Object(k["j"])(!1),a=function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n.value=!0,e.prev=1,e.next=4,y({amount:10,difficulty:t.value});case 4:return r=e.sent,e.next=7,p({questions:r});case 7:a=e.sent,N.push({name:"TriviaGame",params:{gameId:a}});case 9:return e.prev=9,n.value=!1,e.finish(9);case 12:case"end":return e.stop()}}),e,null,[[1,,9,12]])})));return function(){return e.apply(this,arguments)}}();return function(){return Object(r["f"])("div",null,[Object(r["f"])("h4",null,[Object(r["e"])("Set up a new game")]),Object(r["f"])("div",{class:"difficulty-selector"},[Object(r["f"])("div",{class:"label"},[Object(r["e"])("Select a difficulty:")]),e.map((function(e){return Object(r["f"])("div",null,[Object(r["f"])("label",{key:e.value},[Object(r["w"])(Object(r["f"])("input",{"onUpdate:modelValue":function(e){return t.value=e},type:"radio",value:e.value},null),[[r["u"],t.value]]),Object(r["e"])(" "),e.text])])}))]),Object(r["f"])("button",{class:"start-new-game",onClick:a,disabled:n.value},[n.value?"Loading...":"Start!"])])}}}),A=n("6c02"),R=[{path:"/setup",name:"TriviaSetup",component:I},{path:"/game/:gameId",props:!0,name:"TriviaGame",component:S},{path:"/",redirect:"/setup"}],q=Object(A["a"])({history:Object(A["b"])(),routes:R}),N=q;n("38c8");Object(r["d"])(u).use(N).mount("#app")}});
//# sourceMappingURL=app.20f16d06.js.map