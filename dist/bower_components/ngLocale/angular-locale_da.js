/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["f.m.","e.m."],DAY:["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],MONTH:["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december"],SHORTDAY:["søn","man","tir","ons","tor","fre","lør"],SHORTMONTH:["jan.","feb.","mar.","apr.","maj","jun.","jul.","aug.","sep.","okt.","nov.","dec."],fullDate:"EEEE 'den' d. MMMM y",longDate:"d. MMM y",medium:"dd/MM/yyyy HH.mm.ss",mediumDate:"dd/MM/yyyy",mediumTime:"HH.mm.ss","short":"dd/MM/yy HH.mm",shortDate:"dd/MM/yy",shortTime:"HH.mm"},NUMBER_FORMATS:{CURRENCY_SYM:"kr",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"da",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);