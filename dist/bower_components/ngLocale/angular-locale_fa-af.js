/*! ppz_website 2015-02-10 10:45:23 AM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["قبل‌ازظهر","بعدازظهر"],DAY:["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],MONTH:["جنوری","فبروری","مارچ","اپریل","می","جون","جولای","اگست","سپتمبر","اکتوبر","نومبر","دسمبر"],SHORTDAY:["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],SHORTMONTH:["جنو","فوریهٔ","مارس","آوریل","مـی","ژوئن","جول","اوت","سپتامبر","اکتبر","نوامبر","دسم"],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM y H:mm:ss",mediumDate:"d MMM y",mediumTime:"H:mm:ss","short":"yyyy/M/d H:mm",shortDate:"yyyy/M/d",shortTime:"H:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"Rial",DECIMAL_SEP:"٫",GROUP_SEP:"٬",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"‎(¤",negSuf:")",posPre:"‎¤",posSuf:""}]},id:"fa-af",pluralCat:function(){return b.OTHER}})}]);