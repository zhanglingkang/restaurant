/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["f.h.","e.h."],DAY:["sunnudagur","mánudagur","þriðjudagur","miðvikudagur","fimmtudagur","föstudagur","laugardagur"],MONTH:["janúar","febrúar","mars","apríl","maí","júní","júlí","ágúst","september","október","nóvember","desember"],SHORTDAY:["sun","mán","þri","mið","fim","fös","lau"],SHORTMONTH:["jan","feb","mar","apr","maí","jún","júl","ágú","sep","okt","nóv","des"],fullDate:"EEEE, d. MMMM y",longDate:"d. MMMM y",medium:"d.M.yyyy HH:mm:ss",mediumDate:"d.M.yyyy",mediumTime:"HH:mm:ss","short":"d.M.yyyy HH:mm",shortDate:"d.M.yyyy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"kr",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(¤",negSuf:")",posPre:"¤",posSuf:""}]},id:"is",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);