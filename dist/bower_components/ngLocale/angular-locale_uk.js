/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["дп","пп"],DAY:["Неділя","Понеділок","Вівторок","Середа","Четвер","Пʼятниця","Субота"],MONTH:["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"],SHORTDAY:["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],SHORTMONTH:["січ.","лют.","бер.","квіт.","трав.","черв.","лип.","серп.","вер.","жовт.","лист.","груд."],fullDate:"EEEE, d MMMM y 'р'.",longDate:"d MMMM y 'р'.",medium:"d MMM y HH:mm:ss",mediumDate:"d MMM y",mediumTime:"HH:mm:ss","short":"dd.MM.yy HH:mm",shortDate:"dd.MM.yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"₴",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"uk",pluralCat:function(a){return a%10==1&&a%100!=11?b.ONE:a==(0|a)&&a%10>=2&&4>=a%10&&(12>a%100||a%100>14)?b.FEW:a%10==0||a==(0|a)&&a%10>=5&&9>=a%10||a==(0|a)&&a%100>=11&&14>=a%100?b.MANY:b.OTHER}})}]);