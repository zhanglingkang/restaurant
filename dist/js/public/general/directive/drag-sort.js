/*! ppz_website 2015-02-02 10:07:15 AM */
"use strict";define("public/general/directive/drag-sort",["app"],function(a){var b=a("app");b.directive("dragId",function(){return{restrict:"A",link:function(a,b){$(b).attr("draggable","true")}}}),b.directive("dragSort",function(){return{restrict:"A",scope:{dragCompleted:"="},link:function(a,b,c){function d(a){var b;return f.find(h).each(function(d,e){e.getAttribute(c.dragSort)===a.getAttribute(c.dragSort)&&(b=d+1)}),b}var e,f=$(b),g=-1,h=">["+c.dragSort+"]";f.on("dragstart",h,function(a){var b=a.originalEvent;e=a.currentTarget,g=d(e),$(e).addClass("moving"),b.dataTransfer.setData("text",""),b.dataTransfer.effectAllowed="move"}),f.on("dragover",h,function(a){var b;if(e){if(b=a.currentTarget,b===e)return;var c=2===e.compareDocumentPosition(b)?"before":"after";$(b)[c](e)}}),f.on("dragend",h,function(){var b=[];$(e).removeClass("moving"),(g!==d(e)||"forceRefresh"in c)&&(f.children().attr("data-remove",""),f.find(h).each(function(a,d){b.push({id:d.getAttribute(c.dragSort),sort:a+1})}),a.$apply(function(){a.dragCompleted({sortList:b,dragParam:c.dragParam,dragNodeId:e.getAttribute(c.dragSort)})})),e=null,g=-1})}}})});