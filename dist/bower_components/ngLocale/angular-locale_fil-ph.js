/*! ppz_website 2015-02-02 10:07:15 AM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["Linggo","Lunes","Martes","Miyerkules","Huwebes","Biyernes","Sabado"],MONTH:["Enero","Pebrero","Marso","Abril","Mayo","Hunyo","Hulyo","Agosto","Setyembre","Oktubre","Nobyembre","Disyembre"],SHORTDAY:["Lin","Lun","Mar","Mye","Huw","Bye","Sab"],SHORTMONTH:["Ene","Peb","Mar","Abr","May","Hun","Hul","Ago","Set","Okt","Nob","Dis"],fullDate:"EEEE, MMMM dd y",longDate:"MMMM d, y",medium:"MMM d, y HH:mm:ss",mediumDate:"MMM d, y",mediumTime:"HH:mm:ss","short":"M/d/yy HH:mm",shortDate:"M/d/yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"₱",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(¤",negSuf:")",posPre:"¤",posSuf:""}]},id:"fil-ph",pluralCat:function(a){return 0==a||1==a?b.ONE:b.OTHER}})}]);