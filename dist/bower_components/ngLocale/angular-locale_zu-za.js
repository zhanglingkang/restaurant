/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["Sonto","Msombuluko","Lwesibili","Lwesithathu","uLwesine","Lwesihlanu","Mgqibelo"],MONTH:["Januwari","Februwari","Mashi","Apreli","Meyi","Juni","Julayi","Agasti","Septhemba","Okthoba","Novemba","Disemba"],SHORTDAY:["Son","Mso","Bil","Tha","Sin","Hla","Mgq"],SHORTMONTH:["Jan","Feb","Mas","Apr","Mey","Jun","Jul","Aga","Sep","Okt","Nov","Dis"],fullDate:"EEEE dd MMMM y",longDate:"d MMMM y",medium:"d MMM y h:mm:ss a",mediumDate:"d MMM y",mediumTime:"h:mm:ss a","short":"yyyy-MM-dd h:mm a",shortDate:"yyyy-MM-dd",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"R",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(¤",negSuf:")",posPre:"¤",posSuf:""}]},id:"zu-za",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);