/*! ppz_website 2015-01-27 5:27:15 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["ntɔ́ngɔ́","mpókwa"],DAY:["eyenga","mokɔlɔ mwa yambo","mokɔlɔ mwa míbalé","mokɔlɔ mwa mísáto","mokɔlɔ ya mínéi","mokɔlɔ ya mítáno","mpɔ́sɔ"],MONTH:["sánzá ya yambo","sánzá ya míbalé","sánzá ya mísáto","sánzá ya mínei","sánzá ya mítáno","sánzá ya motóbá","sánzá ya nsambo","sánzá ya mwambe","sánzá ya libwa","sánzá ya zómi","sánzá ya zómi na mɔ̌kɔ́","sánzá ya zómi na míbalé"],SHORTDAY:["eye","ybo","mbl","mst","min","mtn","mps"],SHORTMONTH:["yan","fbl","msi","apl","mai","yun","yul","agt","stb","ɔtb","nvb","dsb"],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM y HH:mm:ss",mediumDate:"d MMM y",mediumTime:"HH:mm:ss","short":"d/M/yyyy HH:mm",shortDate:"d/M/yyyy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"FrCD",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"ln",pluralCat:function(a){return 0==a||1==a?b.ONE:b.OTHER}})}]);