/*! ppz_website 2015-02-05 3:20:31 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["am","pm"],DAY:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহষ্পতিবার","শুক্রবার","শনিবার"],MONTH:["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],SHORTDAY:["রবি","সোম","মঙ্গল","বুধ","বৃহস্পতি","শুক্র","শনি"],SHORTMONTH:["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],fullDate:"EEEE, d MMMM, y",longDate:"d MMMM, y",medium:"d MMM, y h:mm:ss a",mediumDate:"d MMM, y",mediumTime:"h:mm:ss a","short":"d/M/yy h:mm a",shortDate:"d/M/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"৳",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:2,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:2,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(",negSuf:"¤)",posPre:"",posSuf:"¤"}]},id:"bn-in",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);