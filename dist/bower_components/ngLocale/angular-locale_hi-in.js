/*! ppz_website 2015-01-27 4:31:55 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["am","pm"],DAY:["रविवार","सोमवार","मंगलवार","बुधवार","बृहस्पतिवार","शुक्रवार","शनिवार"],MONTH:["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर"],SHORTDAY:["रवि.","सोम.","मंगल.","बुध.","बृह.","शुक्र.","शनि."],SHORTMONTH:["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर"],fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",medium:"dd-MM-yyyy h:mm:ss a",mediumDate:"dd-MM-yyyy",mediumTime:"h:mm:ss a","short":"d-M-yy h:mm a",shortDate:"d-M-yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"₹",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:2,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:2,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"¤ -",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"hi-in",pluralCat:function(a){return 0==a||1==a?b.ONE:b.OTHER}})}]);