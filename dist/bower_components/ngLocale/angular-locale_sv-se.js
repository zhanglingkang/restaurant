/*! ppz_website 2015-02-02 10:07:15 AM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["fm","em"],DAY:["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],MONTH:["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],SHORTDAY:["sön","mån","tis","ons","tors","fre","lör"],SHORTMONTH:["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],fullDate:"EEEE'en' 'den' d:'e' MMMM y",longDate:"d MMMM y",medium:"d MMM y HH:mm:ss",mediumDate:"d MMM y",mediumTime:"HH:mm:ss","short":"yyyy-MM-dd HH:mm",shortDate:"yyyy-MM-dd",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"kr",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"sv-se",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);