/*! ppz_website 2015-02-05 3:20:31 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["قبل‌ازظهر","بعدازظهر"],DAY:["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],MONTH:["ژانویهٔ","فوریهٔ","مارس","آوریل","مهٔ","ژوئن","ژوئیهٔ","اوت","سپتامبر","اکتبر","نوامبر","دسامبر"],SHORTDAY:["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],SHORTMONTH:["ژانویهٔ","فوریهٔ","مارس","آوریل","مهٔ","ژوئن","ژوئیهٔ","اوت","سپتامبر","اکتبر","نوامبر","دسامبر"],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM y H:mm:ss",mediumDate:"d MMM y",mediumTime:"H:mm:ss","short":"yyyy/M/d H:mm",shortDate:"yyyy/M/d",shortTime:"H:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"Rial",DECIMAL_SEP:"٫",GROUP_SEP:"٬",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"‎(¤",negSuf:")",posPre:"‎¤",posSuf:""}]},id:"fa-ir",pluralCat:function(){return b.OTHER}})}]);