/*! ppz_website 2015-01-27 4:24:49 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["dop.","pop."],DAY:["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"],MONTH:["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"],SHORTDAY:["ned.","pon.","tor.","sre.","čet.","pet.","sob."],SHORTMONTH:["jan.","feb.","mar.","apr.","maj","jun.","jul.","avg.","sep.","okt.","nov.","dec."],fullDate:"EEEE, dd. MMMM y",longDate:"dd. MMMM y",medium:"d. MMM yyyy HH:mm:ss",mediumDate:"d. MMM yyyy",mediumTime:"HH:mm:ss","short":"d. MM. yy HH:mm",shortDate:"d. MM. yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(¤",negSuf:")",posPre:"¤",posSuf:""}]},id:"sl",pluralCat:function(a){return a%100==1?b.ONE:a%100==2?b.TWO:a%100==3||a%100==4?b.FEW:b.OTHER}})}]);