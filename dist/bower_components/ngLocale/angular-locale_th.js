/*! ppz_website 2015-02-05 3:20:31 PM */
"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["ก่อนเที่ยง","หลังเที่ยง"],DAY:["วันอาทิตย์","วันจันทร์","วันอังคาร","วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์"],MONTH:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],SHORTDAY:["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],SHORTMONTH:["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],fullDate:"EEEEที่ d MMMM G y",longDate:"d MMMM y",medium:"d MMM y H:mm:ss",mediumDate:"d MMM y",mediumTime:"H:mm:ss","short":"d/M/yyyy H:mm",shortDate:"d/M/yyyy",shortTime:"H:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"฿",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(¤",negSuf:")",posPre:"¤",posSuf:""}]},id:"th",pluralCat:function(){return b.OTHER}})}]);