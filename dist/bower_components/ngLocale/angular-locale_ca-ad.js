/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["a.m.","p.m."],DAY:["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],MONTH:["de gener","de febrer","de març","d’abril","de maig","de juny","de juliol","d’agost","de setembre","d’octubre","de novembre","de desembre"],SHORTDAY:["dg.","dl.","dt.","dc.","dj.","dv.","ds."],SHORTMONTH:["de gen.","de febr.","de març","d’abr.","de maig","de juny","de jul.","d’ag.","de set.","d’oct.","de nov.","de des."],fullDate:"EEEE d MMMM 'de' y",longDate:"d MMMM 'de' y",medium:"dd/MM/yyyy H:mm:ss",mediumDate:"dd/MM/yyyy",mediumTime:"H:mm:ss","short":"dd/MM/yy H:mm",shortDate:"dd/MM/yy",shortTime:"H:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(¤",negSuf:")",posPre:"¤",posSuf:""}]},id:"ca-ad",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);