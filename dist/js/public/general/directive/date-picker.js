/*! ppz_website 2015-02-03 11:00:22 AM */
"use strict";define("public/general/directive/date-picker",["app","public/local/system","public/general/util"],function(a){var b=a("app"),c=a("public/local/system"),d=a("public/general/util");b.directive("datePicker",function(){return{restrict:"E",replace:"true",scope:!0,templateUrl:c.getTplAbsolutePath("tpl/directive/date-picker.html"),compile:function(a,b){var c=$(a),e={};for(var f in b)b.hasOwnProperty(f)&&(f.match(/^ng/)||"required"===f||"name"===f||"placeholder"===f)&&(e[b.$attr[f]]=b[f]);return c.find("input").attr(e),function(a,b,c){$(b).attr("data-date",(new Date).toJSON().substring(0,10));var e=$(b).datetimepicker({language:"zh-CN",weekStart:1,todayBtn:1,autoclose:1,todayHighlight:1,startView:c.startView||2,minView:c.minView||2,forceParse:0,showMeridian:1});$(".datetimepicker").find(".next").html('<i class="glyphicon glyphicon-arrow-right"></i>'),$(".datetimepicker").find(".prev").html('<i class="glyphicon glyphicon-arrow-left"></i>'),e.on("changeDate",function(){a.$parent.$apply(function(){d.setPropertyValue(a.$parent,c.ngModel,$(b).find("input").val())})})}}}})});