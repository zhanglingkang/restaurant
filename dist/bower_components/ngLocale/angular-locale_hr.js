/*! ppz_website 2015-01-27 4:31:55 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],MONTH:["siječnja","veljače","ožujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenoga","prosinca"],SHORTDAY:["ned","pon","uto","sri","čet","pet","sub"],SHORTMONTH:["sij","velj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro"],fullDate:"EEEE, d. MMMM y.",longDate:"d. MMMM y.",medium:"d. M. y. HH:mm:ss",mediumDate:"d. M. y.",mediumTime:"HH:mm:ss","short":"d.M.y. HH:mm",shortDate:"d.M.y.",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"kn",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"hr",pluralCat:function(a){return a%10==1&&a%100!=11?b.ONE:a==(0|a)&&a%10>=2&&4>=a%10&&(12>a%100||a%100>14)?b.FEW:a%10==0||a==(0|a)&&a%10>=5&&9>=a%10||a==(0|a)&&a%100>=11&&14>=a%100?b.MANY:b.OTHER}})}]);