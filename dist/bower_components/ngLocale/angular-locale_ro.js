/*! ppz_website 2015-03-20 5:16:00 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["duminică","luni","marți","miercuri","joi","vineri","sâmbătă"],MONTH:["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"],SHORTDAY:["Du","Lu","Ma","Mi","Jo","Vi","Sâ"],SHORTMONTH:["ian.","feb.","mar.","apr.","mai","iun.","iul.","aug.","sept.","oct.","nov.","dec."],fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",medium:"dd.MM.yyyy HH:mm:ss",mediumDate:"dd.MM.yyyy",mediumTime:"HH:mm:ss","short":"dd.MM.yyyy HH:mm",shortDate:"dd.MM.yyyy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"RON",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"ro",pluralCat:function(a){return 1==a?b.ONE:0==a||1!=a&&a==(0|a)&&a%100>=1&&19>=a%100?b.FEW:b.OTHER}})}]);