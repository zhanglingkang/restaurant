/*! ppz_website 2015-02-10 10:45:23 AM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["PD","MD"],DAY:["e diel","e hënë","e martë","e mërkurë","e enjte","e premte","e shtunë"],MONTH:["janar","shkurt","mars","prill","maj","qershor","korrik","gusht","shtator","tetor","nëntor","dhjetor"],SHORTDAY:["Die","Hën","Mar","Mër","Enj","Pre","Sht"],SHORTMONTH:["Jan","Shk","Mar","Pri","Maj","Qer","Kor","Gsh","Sht","Tet","Nën","Dhj"],fullDate:"EEEE, dd MMMM y",longDate:"dd MMMM y",medium:"yyyy-MM-dd h.mm.ss.a",mediumDate:"yyyy-MM-dd",mediumTime:"h.mm.ss.a","short":"yy-MM-dd h.mm.a",shortDate:"yy-MM-dd",shortTime:"h.mm.a"},NUMBER_FORMATS:{CURRENCY_SYM:"Lek",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"¤-",negSuf:"",posPre:"¤",posSuf:""}]},id:"sq",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);