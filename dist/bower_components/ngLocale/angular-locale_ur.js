/*! ppz_website 2015-03-20 5:16:00 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["دن","رات"],DAY:["اتوار","پير","منگل","بده","جمعرات","جمعہ","ہفتہ"],MONTH:["جنوری","فروری","مارچ","اپريل","مئ","جون","جولائ","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],SHORTDAY:["اتوار","پير","منگل","بده","جمعرات","جمعہ","ہفتہ"],SHORTMONTH:["جنوری","فروری","مارچ","اپريل","مئ","جون","جولائ","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],fullDate:"EEEE؍ d؍ MMMM y",longDate:"d؍ MMMM y",medium:"d؍ MMM y h:mm:ss a",mediumDate:"d؍ MMM y",mediumTime:"h:mm:ss a","short":"d/M/yy h:mm a",shortDate:"d/M/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"Rs",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"¤-",negSuf:"",posPre:"¤",posSuf:""}]},id:"ur",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);