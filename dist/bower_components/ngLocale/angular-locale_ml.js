/*! ppz_website 2015-03-20 5:16:00 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["am","pm"],DAY:["ഞായറാഴ്ച","തിങ്കളാഴ്ച","ചൊവ്വാഴ്ച","ബുധനാഴ്ച","വ്യാഴാഴ്ച","വെള്ളിയാഴ്ച","ശനിയാഴ്ച"],MONTH:["ജനുവരി","ഫെബ്രുവരി","മാര്‍ച്ച്","ഏപ്രില്‍","മേയ്","ജൂണ്‍","ജൂലൈ","ആഗസ്റ്റ്","സെപ്റ്റംബര്‍","ഒക്ടോബര്‍","നവംബര്‍","ഡിസംബര്‍"],SHORTDAY:["ഞായര്‍","തിങ്കള്‍","ചൊവ്വ","ബുധന്‍","വ്യാഴം","വെള്ളി","ശനി"],SHORTMONTH:["ജനു","ഫെബ്രു","മാര്‍","ഏപ്രി","മേയ്","ജൂണ്‍","ജൂലൈ","ഓഗ","സെപ്റ്റം","ഒക്ടോ","നവം","ഡിസം"],fullDate:"y, MMMM d, EEEE",longDate:"y, MMMM d",medium:"y, MMM d h:mm:ss a",mediumDate:"y, MMM d",mediumTime:"h:mm:ss a","short":"dd/MM/yy h:mm a",shortDate:"dd/MM/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"₹",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:2,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:2,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:"¤",posPre:"",posSuf:"¤"}]},id:"ml",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]);