/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],MONTH:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],SHORTDAY:["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],SHORTMONTH:["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],fullDate:"d MMMM y EEEE",longDate:"d MMMM y",medium:"d MMM y HH:mm:ss",mediumDate:"d MMM y",mediumTime:"HH:mm:ss","short":"dd MM yyyy HH:mm",shortDate:"dd MM yyyy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"TL",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(",negSuf:" ¤)",posPre:"",posSuf:" ¤"}]},id:"tr-tr",pluralCat:function(){return b.OTHER}})}]);