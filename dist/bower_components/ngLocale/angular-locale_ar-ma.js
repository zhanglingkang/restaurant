/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["ص","م"],DAY:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],MONTH:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],SHORTDAY:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],SHORTMONTH:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],fullDate:"EEEE، d MMMM، y",longDate:"d MMMM، y",medium:"yyyy/MM/dd h:mm:ss a",mediumDate:"yyyy/MM/dd",mediumTime:"h:mm:ss a","short":"yyyy/M/d h:mm a",shortDate:"yyyy/M/d",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"£",DECIMAL_SEP:"٫",GROUP_SEP:"٬",PATTERNS:[{gSize:0,lgSize:0,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"",negSuf:"-",posPre:"",posSuf:""},{gSize:0,lgSize:0,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"¤ ",negSuf:"-",posPre:"¤ ",posSuf:""}]},id:"ar-ma",pluralCat:function(a){return 0==a?b.ZERO:1==a?b.ONE:2==a?b.TWO:a==(0|a)&&a%100>=3&&10>=a%100?b.FEW:a==(0|a)&&a%100>=11&&99>=a%100?b.MANY:b.OTHER}})}]);