/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["priekšpusdienā","pēcpusdienā"],DAY:["svētdiena","pirmdiena","otrdiena","trešdiena","ceturtdiena","piektdiena","sestdiena"],MONTH:["janvāris","februāris","marts","aprīlis","maijs","jūnijs","jūlijs","augusts","septembris","oktobris","novembris","decembris"],SHORTDAY:["Sv","Pr","Ot","Tr","Ce","Pk","Se"],SHORTMONTH:["janv.","febr.","marts","apr.","maijs","jūn.","jūl.","aug.","sept.","okt.","nov.","dec."],fullDate:"EEEE, y. 'gada' d. MMMM",longDate:"y. 'gada' d. MMMM",medium:"y. 'gada' d. MMM HH:mm:ss",mediumDate:"y. 'gada' d. MMM",mediumTime:"HH:mm:ss","short":"dd.MM.yy HH:mm",shortDate:"dd.MM.yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"Ls",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(¤",negSuf:")",posPre:"¤",posSuf:""}]},id:"lv-lv",pluralCat:function(a){return 0==a?b.ZERO:a%10==1&&a%100!=11?b.ONE:b.OTHER}})}]);