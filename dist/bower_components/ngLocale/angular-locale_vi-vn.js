/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["SA","CH"],DAY:["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"],MONTH:["tháng một","tháng hai","tháng ba","tháng tư","tháng năm","tháng sáu","tháng bảy","tháng tám","tháng chín","tháng mười","tháng mười một","tháng mười hai"],SHORTDAY:["CN","Th 2","Th 3","Th 4","Th 5","Th 6","Th 7"],SHORTMONTH:["thg 1","thg 2","thg 3","thg 4","thg 5","thg 6","thg 7","thg 8","thg 9","thg 10","thg 11","thg 12"],fullDate:"EEEE, 'ngày' dd MMMM 'năm' y",longDate:"'Ngày' dd 'tháng' M 'năm' y",medium:"dd-MM-yyyy HH:mm:ss",mediumDate:"dd-MM-yyyy",mediumTime:"HH:mm:ss","short":"dd/MM/yyyy HH:mm",shortDate:"dd/MM/yyyy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"₫",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"vi-vn",pluralCat:function(){return b.OTHER}})}]);