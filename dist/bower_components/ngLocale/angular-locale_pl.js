/*! ppz_website 2015-02-02 10:07:15 AM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"],MONTH:["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"],SHORTDAY:["niedz.","pon.","wt.","śr.","czw.","pt.","sob."],SHORTMONTH:["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"],fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",medium:"d MMM y HH:mm:ss",mediumDate:"d MMM y",mediumTime:"HH:mm:ss","short":"dd.MM.yyyy HH:mm",shortDate:"dd.MM.yyyy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"zł",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(",negSuf:" ¤)",posPre:"",posSuf:" ¤"}]},id:"pl",pluralCat:function(a){return 1==a?b.ONE:a==(0|a)&&a%10>=2&&4>=a%10&&(12>a%100||a%100>14)?b.FEW:1!=a&&(a%10==0||a%10==1)||a==(0|a)&&a%10>=5&&9>=a%10||a==(0|a)&&a%100>=12&&14>=a%100?b.MANY:b.OTHER}})}]);