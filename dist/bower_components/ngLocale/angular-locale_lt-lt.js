/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["priešpiet","popiet"],DAY:["sekmadienis","pirmadienis","antradienis","trečiadienis","ketvirtadienis","penktadienis","šeštadienis"],MONTH:["sausis","vasaris","kovas","balandis","gegužė","birželis","liepa","rugpjūtis","rugsėjis","spalis","lapkritis","gruodis"],SHORTDAY:["Sk","Pr","An","Tr","Kt","Pn","Št"],SHORTMONTH:["Saus.","Vas.","Kov.","Bal.","Geg.","Bir.","Liep.","Rugp.","Rugs.","Spal.","Lapkr.","Gruod."],fullDate:"y 'm'. MMMM d 'd'., EEEE",longDate:"y 'm'. MMMM d 'd'.",medium:"y MMM d HH:mm:ss",mediumDate:"y MMM d",mediumTime:"HH:mm:ss","short":"yyyy-MM-dd HH:mm",shortDate:"yyyy-MM-dd",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"Lt",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"lt-lt",pluralCat:function(a){return a%10==1&&(11>a%100||a%100>19)?b.ONE:a==(0|a)&&a%10>=2&&9>=a%10&&(11>a%100||a%100>19)?b.FEW:b.OTHER}})}]);