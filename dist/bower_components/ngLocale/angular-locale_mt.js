/*! ppz_website 2015-01-27 5:27:15 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["QN","WN"],DAY:["Il-Ħadd","It-Tnejn","It-Tlieta","L-Erbgħa","Il-Ħamis","Il-Ġimgħa","Is-Sibt"],MONTH:["Jannar","Frar","Marzu","April","Mejju","Ġunju","Lulju","Awwissu","Settembru","Ottubru","Novembru","Diċembru"],SHORTDAY:["Ħad","Tne","Tli","Erb","Ħam","Ġim","Sib"],SHORTMONTH:["Jan","Fra","Mar","Apr","Mej","Ġun","Lul","Aww","Set","Ott","Nov","Diċ"],fullDate:"EEEE, d 'ta'’ MMMM y",longDate:"d 'ta'’ MMMM y",medium:"dd MMM y HH:mm:ss",mediumDate:"dd MMM y",mediumTime:"HH:mm:ss","short":"dd/MM/yyyy HH:mm",shortDate:"dd/MM/yyyy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"¤-",negSuf:"",posPre:"¤",posSuf:""}]},id:"mt",pluralCat:function(a){return 1==a?b.ONE:0==a||a==(0|a)&&a%100>=2&&10>=a%100?b.FEW:a==(0|a)&&a%100>=11&&19>=a%100?b.MANY:b.OTHER}})}]);