/*! ppz_website 2015-02-02 10:07:15 AM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["a.m.","p.m."],DAY:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],MONTH:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],SHORTDAY:["dom","lun","mar","mié","jue","vie","sáb"],SHORTMONTH:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],fullDate:"EEEE, d 'de' MMMM 'de' y",longDate:"d 'de' MMMM 'de' y",medium:"dd/MM/yyyy HH:mm:ss",mediumDate:"dd/MM/yyyy",mediumTime:"HH:mm:ss","short":"dd/MM/yy HH:mm",shortDate:"dd/MM/yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"es-ea",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);