/*! ppz_website 2015-02-03 11:00:22 AM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["am","pm"],DAY:["रविवार","सोमवार","मंगळवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],MONTH:["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोव्हेंबर","डिसेंबर"],SHORTDAY:["रवि","सोम","मंगळ","बुध","गुरु","शुक्र","शनि"],SHORTMONTH:["जाने","फेब्रु","मार्च","एप्रि","मे","जून","जुलै","ऑग","सेप्टें","ऑक्टोबर","नोव्हें","डिसें"],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM y h-mm-ss a",mediumDate:"d MMM y",mediumTime:"h-mm-ss a","short":"d-M-yy h-mm a",shortDate:"d-M-yy",shortTime:"h-mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"₹",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(¤",negSuf:")",posPre:"¤",posSuf:""}]},id:"mr",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);