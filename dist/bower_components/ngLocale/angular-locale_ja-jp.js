/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["午前","午後"],DAY:["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],MONTH:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],SHORTDAY:["日","月","火","水","木","金","土"],SHORTMONTH:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],fullDate:"y年M月d日EEEE",longDate:"y年M月d日",medium:"yyyy/MM/dd H:mm:ss",mediumDate:"yyyy/MM/dd",mediumTime:"H:mm:ss","short":"yyyy/MM/dd H:mm",shortDate:"yyyy/MM/dd",shortTime:"H:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"¥",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"¤-",negSuf:"",posPre:"¤",posSuf:""}]},id:"ja-jp",pluralCat:function(){return b.OTHER}})}]);