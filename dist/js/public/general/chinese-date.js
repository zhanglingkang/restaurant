/*! ppz_website 2015-03-20 5:16:00 PM */
"use strict";define("public/general/chinese-date",[],function(require,exports,module){function getChineseCalendar(a){return a=a||new Date,{chineseYear:getChineseYear(a),chineseMonth:getChineseMonth(a),chineseDay:getChineseDate(a),chineseSolarTerm:getSolarTerm(a),weekName:getWeekName(a)}}function getWeekName(a){var b=["周日","周一","周二","周三","周四","周五","周六"];return b[a.getDay()]}function getChineseDateNumber(a){function b(a){return parseInt((Date.parse(a)-Date.parse(a.getFullYear()+"/1/1"))/864e5)+1}{var c,d,e,f,g,h,i,j,k=[22,42,218,0,131,73,182,5,14,100,187,0,25,178,91,0,135,106,87,4,18,117,43,0,29,182,149,0,138,173,85,2,21,85,170,0,130,85,108,7,13,201,118,0,23,100,183,0,134,228,174,5,17,234,86,0,27,109,42,0,136,90,170,4,20,173,85,0,129,170,213,9,11,82,234,0,22,169,109,0,132,169,93,6,15,212,174,0,26,234,77,0,135,186,85,4],l=[],m=[],n=[],o=a.getFullYear();a.getMonth()+1,a.getDate()}if(100>o&&(o+=1900),1997>o||o>2020)return 0;for(n[0]=k[4*(o-1997)],n[1]=k[4*(o-1997)+1],n[2]=k[4*(o-1997)+2],n[3]=k[4*(o-1997)+3],l[0]=0!=(128&n[0])?12:11,c=127&n[0],f=n[1],f<<=8,f|=n[2],d=n[3],e=15;e>=0;e--)m[15-e]=29,0!=(1<<e&f)&&m[15-e]++,l[15-e]==d?l[15-e+1]=-d:(l[15-e+1]=l[15-e]<0?-l[15-e]+1:l[15-e]+1,l[15-e+1]>12&&(l[15-e+1]=1));if(g=b(a)-1,g<=m[0]-c)i=o>1901&&getChineseDateNumber(new Date(o-1+"/12/31"))<0?-l[0]:l[0],j=c+g;else{for(h=m[0]-c,e=1;g>h&&h+m[e]<g;)h+=m[e],e++;i=l[e],j=g-h}return i>0?100*i+j:100*i-j}function getChineseYear(a){function b(a){var b=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],c=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");return b[a%10]+c[a%12]}var c=a.getFullYear(),d=a.getMonth()+1,e=parseInt(Math.abs(getChineseDateNumber(a))/100);return 100>c&&(c+=1900),e>d&&c--,c-=1864,b(c)}function getChineseMonth(a){var b=["零","正","二","三","四","五","六","七","八","九","十","冬","腊"],c=parseInt(getChineseDateNumber(a)/100);return 0>c?"闰"+b[-c]:b[c]}function getChineseDate(a){var b=["零","初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"],c=Math.abs(getChineseDateNumber(a))%100;return b[c]}function getSolarTerm(a){var b=["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],c=[1272060,1275495,1281180,1289445,1299225,1310355,1321560,1333035,1342770,1350855,1356420,1359045,1358580,1355055,1348695,1340040,1329630,1318455,1306935,1297380,1286865,1277730,1274550,1271556],d=31556926,e=new Date(1901);for(e.setTime(94712046e4);a.getFullYear()<e.getFullYear();)e.setTime(e.getTime()-1e3*d);for(;a.getFullYear()>e.getFullYear();)e.setTime(e.getTime()+1e3*d);for(var f=0;a.getMonth()>e.getMonth();f++)e.setTime(e.getTime()+1e3*c[f]);return a.getDate()>e.getDate()&&(e.setTime(e.getTime()+1e3*c[f]),f++),a.getDate()>e.getDate()&&(e.setTime(e.getTime()+1e3*c[f]),23==f?f=0:f++),a.getDate()==e.getDate()?b[f]:""}var dateProto={getChineseYear:getChineseYear.curryThis(),getChineseMonth:getChineseMonth.curryThis(),getChineseDate:getChineseDate.curryThis(),getSolarTerm:getSolarTerm.curryThis(),getWeekName:getWeekName.curryThis(),isToday:function(){return this.format("yyyy-MM-dd")===(new Date).format("yyyy-MM-dd")},isSameDay:function(a){return this.format("yyyy-MM-dd")===a.format("yyyy-MM-dd")},isBeforeToday:function(){return this.format("yyyy-MM-dd")<(new Date).format("yyyy-MM-dd")},isAfterToday:function(){return this.format("yyyy-MM-dd")>(new Date).format("yyyy-MM-dd")}};dateProto.__proto__=Date.prototype;var ChineseDate=function(){var newCode="new Date("+[].join.call(arguments,",")+")",date=eval(newCode);return date.__proto__=dateProto,date};ChineseDate.getCountOfMonth=function(a,b){var c=new Date(a,b-1,1),d=new Date(a,b,0),e=(d-c)/864e5+1;return e},module.exports=ChineseDate});