/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["enne keskpäeva","pärast keskpäeva"],DAY:["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"],MONTH:["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember"],SHORTDAY:["P","E","T","K","N","R","L"],SHORTMONTH:["jaan","veebr","märts","apr","mai","juuni","juuli","aug","sept","okt","nov","dets"],fullDate:"EEEE, d. MMMM y",longDate:"d. MMMM y",medium:"dd.MM.yyyy H:mm.ss",mediumDate:"dd.MM.yyyy",mediumTime:"H:mm.ss","short":"dd.MM.yy H:mm",shortDate:"dd.MM.yy",shortTime:"H:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:0,lgSize:0,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(",negSuf:"¤)",posPre:"",posSuf:"¤"}]},id:"et",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);