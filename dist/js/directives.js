/*! ppz_website 2014-12-02 2:52:39 PM */
!function(){var a=/^\-?\d+((\.|\,)\d+)?$/;angular.module("ppzDirectives",[]).directive("menuManager",function(){return{restrict:"E",scope:{},controller:function(){},templateUrl:"partials/menu.html"}}).directive("smartFloat",function(){return{require:"ngModel",link:function(b,c,d,e){e.$parsers.unshift(function(b){return a.test(b)?(e.$setValidity("float",!0),parseFloat(b.replace(",","."))):void e.$setValidity("float",!1)})}}}).directive("fileModel",function(){return{restrict:"A",link:function(a,b,c){var d=$(b);d.bind("change",function(){a.$apply(function(){a[c.fileModel]=d[0].files})})}}}).directive("confirmHint",function(){var a=$("#modal-hint");return a.modal({keyboard:!1,show:!1,backdrop:!1}),{restrict:"A",link:function(b,c,d){var e=$(c),f=!1;document.addEventListener("click",function(b){e[0]===b.target&&(f?f=!1:(b.stopPropagation(),a.find(".modal-title").html(d.modalTitle||"温馨提示"),a.find(".modal-body").html(d.modalContent),a.modal("show"),a.find(".confirm")[0].onclick=function(){f=!0,a.modal("hide"),b.target.click()}))},!0)}}}).directive("preventSpread",function(){return{restrict:"A",link:function(a,b,c){var d=$(b);d.bind(c.preventSpread,function(a){a.stopPropagation()})}}}).directive("viewImg",function(){var a=$("#modal-view-img");return a.modal({show:!1}),{restrict:"A",link:function(b,c,d){var e=$(c);e.bind("click",function(){e.attr("src")&&(a.find(".modal-title").html(d.imgTitle),a.find(".modal-body img").attr("src",e.attr("src")),a.modal("show"))})}}}).directive("dragId",function(){return{restrict:"A",link:function(a,b){$(b).attr("draggable","true")}}}).directive("dragSort",function(){return{restrict:"A",scope:{dragCompleted:"="},link:function(a,b,c){function d(a){var b;return f.find(h).each(function(d,e){e.getAttribute(c.dragSort)===a.getAttribute(c.dragSort)&&(b=d+1)}),b}var e,f=$(b),g=-1,h=">["+c.dragSort+"]";f.delegate(h,"dragstart",function(a){var b=a.originalEvent;e=a.currentTarget,g=d(e),$(e).addClass("moving"),b.dataTransfer.setData("text",""),b.dataTransfer.effectAllowed="move"}),f.delegate(h,"dragover",function(a){var b;if(e){if(b=a.currentTarget,b===e)return;var c=2===e.compareDocumentPosition(b)?"before":"after";$(b)[c](e)}}),f.delegate(h,"dragend",function(){var b=[];$(e).removeClass("moving"),(e&&g!==d(e)||"forceRefresh"in c)&&(f.children().attr("data-remove",""),f.find(h).each(function(a,d){b.push({id:d.getAttribute(c.dragSort),sort:a+1})}),a.$apply(function(){a.dragCompleted({sortList:b,dragParam:c.dragParam,dragNodeId:e.getAttribute(c.dragSort)})})),e=null,g=-1})}}}).directive("selfPopover",["$compile","utilService",function(a,b){return{restrict:"E",terminal:!0,scope:!0,link:function(c,d,e){function f(a){var b=h.data("bs.popover").$tip[0];b&&!$.contains(b,a.target)&&h.popover("hide")}var g=$(d),h=g.parent(),i=e.style||"";c.$$close=!1,c.$watch("$$close",function(){c.$$close&&(h.popover("hide"),c.$$close=!1)}),c.close=function(){c.$$close=!0},e.name&&b.setPropertyValue(c.$parent,e.name,c),e.relatedTarget&&(h="parent"===e.context?g.parent().find(e.relatedTarget):$(e.relatedTarget)),g.remove(),h.attr("data-toggle","popover"),h.popover({html:!0,content:g.html(),container:e.container,placement:"top"}),h.on("shown.bs.popover",function(){var b=h.data("bs.popover").$tip.find(".popover-content");b.attr("style",i),a(b.children())(c),"autoClose"in e&&$(document).bind("click",f)}),h.on("hidden.bs.popover",function(){$(document).unbind("click",f)})}}}])}();