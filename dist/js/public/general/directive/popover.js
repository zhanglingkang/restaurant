/*! ppz_website 2015-01-27 4:31:55 PM */
"use strict";define("public/general/directive/popover",["app","public/general/util","public/general/compute-position"],function(a){var b=a("app"),c=a("public/general/util"),d=a("public/general/compute-position");b.directive("selfPopover",["$compile",function(a){return{restrict:"E",terminal:!0,scope:!0,link:function(b,e,f){function g(){l=new MutationObserver(function(){$.contains(document.body,n[0])||(j&&j.remove(),l.disconnect())});var a;a="observeContext"in f?$(f.observeContext)[0]:n[0].parentNode,l.observe(a,{childList:!0,subtree:!0})}function h(a){if(!$.contains(document.body,j[0])||!$.contains(document.body,n[0]))return void document.removeEventListener("click",h,!0);var b=n.data("bs.popover").$tip[0];if(b&&!$.contains(b,a.target))if(f.exclude){var c=!1;$(f.exclude).each(function(b,d){$.contains(d,a.target)&&(c=!0)}),c||n.popover("hide")}else n.popover("hide");($.contains(n[0],a.target)||n[0]===a.target)&&a.stopPropagation()}function i(){var a=d.getPosition(n.data("bs.popover").$tip[0],n[0],f.placement,f.container,1);n.data("bs.popover").$tip.css({left:a.left,top:a.top}),a.arrowPosition&&("top"===f.placement||"bottom"===f.placement)&&n.data("bs.popover").$tip.find(".arrow").css({left:a.arrowPosition}),n.data("bs.popover").$tip.removeClass("popover-hidden"),i.last={width:d.getSize(n.data("bs.popover").$tip[0]).width,height:d.getSize(n.data("bs.popover").$tip[0]).height}}var j,k,l,m=$(e),n=m.parent(),o=f.style||"",p='<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content" ></div></div>';p=p.replace(/(?=class=['"]popover-content['"])/,"style='"+o+"' "),b.close=!1,b.$watch("close",function(){b.close&&(n.popover("hide"),b.close=!1)}),f.relatedTarget&&(n="parent"===f.context?m.parent().find(f.relatedTarget):$(f.relatedTarget)),f.placement=f.placement||"top",m.children().addClass("ng-cloak"),m.remove(),n.attr("data-toggle","popover"),n.popover({html:!0,content:m.html(),container:f.container,placement:f.placement,template:p}),n.on("show.bs.popover",function(){j=n.data("bs.popover").$tip,n.data("bs.popover").$tip.addClass(f.class),n.data("bs.popover").$tip.addClass("popover-hidden")}),n.on("shown.bs.popover",function(){var c=n.data("bs.popover").$tip.find(".popover-content");a(c.children())(b.$parent),"autoClose"in f&&document.addEventListener("click",h,!0),setTimeout(function(){i()},0),"needObserve"in f&&g(),"watchSize"in f&&(k=setInterval(function(){if(!$.contains(document.body,j[0])||!$.contains(document.body,n[0]))return void clearInterval(k);var a=d.getSize(j[0]);(a.width!==i.last.width||a.height!==i.last.height)&&i()},100)),b.$apply()}),n.on("hidden.bs.popover",function(){document.removeEventListener("click",h,!0),clearInterval(k),l&&l.disconnect()}),b.$on("closePopover",function(a,b){b===f.name&&n.popover("hide")});var q={close:function(){b.close=!0}};if("name"in f){var r=f.name;"object"in f&&(r=f.object+"."+f.name),c.setPropertyValue(b.$parent,r,q)}}}}])});