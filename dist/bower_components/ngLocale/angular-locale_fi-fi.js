/*! ppz_website 2015-02-05 3:20:31 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["ap.","ip."],DAY:["sunnuntaina","maanantaina","tiistaina","keskiviikkona","torstaina","perjantaina","lauantaina"],MONTH:["tammikuuta","helmikuuta","maaliskuuta","huhtikuuta","toukokuuta","kesäkuuta","heinäkuuta","elokuuta","syyskuuta","lokakuuta","marraskuuta","joulukuuta"],SHORTDAY:["su","ma","ti","ke","to","pe","la"],SHORTMONTH:["tammikuuta","helmikuuta","maaliskuuta","huhtikuuta","toukokuuta","kesäkuuta","heinäkuuta","elokuuta","syyskuuta","lokakuuta","marraskuuta","joulukuuta"],fullDate:"cccc, d. MMMM y",longDate:"d. MMMM y",medium:"d.M.yyyy H.mm.ss",mediumDate:"d.M.yyyy",mediumTime:"H.mm.ss","short":"d.M.yyyy H.mm",shortDate:"d.M.yyyy",shortTime:"H.mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"fi-fi",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);