/*! ppz_website 2015-01-27 4:31:55 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["dopoludnia","popoludní"],DAY:["nedeľa","pondelok","utorok","streda","štvrtok","piatok","sobota"],MONTH:["januára","februára","marca","apríla","mája","júna","júla","augusta","septembra","októbra","novembra","decembra"],SHORTDAY:["ne","po","ut","st","št","pi","so"],SHORTMONTH:["jan","feb","mar","apr","máj","jún","júl","aug","sep","okt","nov","dec"],fullDate:"EEEE, d. MMMM y",longDate:"d. MMMM y",medium:"d.M.yyyy H:mm:ss",mediumDate:"d.M.yyyy",mediumTime:"H:mm:ss","short":"d.M.yyyy H:mm",shortDate:"d.M.yyyy",shortTime:"H:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"sk-sk",pluralCat:function(a){return 1==a?b.ONE:a==(0|a)&&a>=2&&4>=a?b.FEW:b.OTHER}})}]);