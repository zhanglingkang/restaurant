/*! ppz_website 2015-02-10 10:45:23 AM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["пре подне","поподне"],DAY:["недеља","понедељак","уторак","среда","четвртак","петак","субота"],MONTH:["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],SHORTDAY:["нед","пон","уто","сре","чет","пет","суб"],SHORTMONTH:["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец"],fullDate:"EEEE, dd. MMMM y.",longDate:"dd. MMMM y.",medium:"dd.MM.y. HH.mm.ss",mediumDate:"dd.MM.y.",mediumTime:"HH.mm.ss","short":"d.M.yy. HH.mm",shortDate:"d.M.yy.",shortTime:"HH.mm"},NUMBER_FORMATS:{CURRENCY_SYM:"din",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"sr",pluralCat:function(a){return a%10==1&&a%100!=11?b.ONE:a==(0|a)&&a%10>=2&&4>=a%10&&(12>a%100||a%100>14)?b.FEW:a%10==0||a==(0|a)&&a%10>=5&&9>=a%10||a==(0|a)&&a%100>=11&&14>=a%100?b.MANY:b.OTHER}})}]);