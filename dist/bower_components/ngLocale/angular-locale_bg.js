/*! ppz_website 2015-03-20 5:16:00 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["пр. об.","сл. об."],DAY:["неделя","понеделник","вторник","сряда","четвъртък","петък","събота"],MONTH:["януари","февруари","март","април","май","юни","юли","август","септември","октомври","ноември","декември"],SHORTDAY:["нд","пн","вт","ср","чт","пт","сб"],SHORTMONTH:["ян.","февр.","март","апр.","май","юни","юли","авг.","септ.","окт.","ноем.","дек."],fullDate:"dd MMMM y, EEEE",longDate:"dd MMMM y",medium:"dd.MM.yyyy HH:mm:ss",mediumDate:"dd.MM.yyyy",mediumTime:"HH:mm:ss","short":"dd.MM.yy HH:mm",shortDate:"dd.MM.yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"lev",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"bg",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);