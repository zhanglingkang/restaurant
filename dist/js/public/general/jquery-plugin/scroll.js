/*! ppz_website 2015-02-10 10:45:23 AM */
"use strict";define("public/general/jquery-plugin/scroll",[],function(){$.fn.scrollHorizontal=function(a){var b=this;b[0].lastScrollLeft=b[0].scrollLeft,b.scroll(function(){b[0].scrollLeft!==b[0].lastScrollLeft&&(b[0].lastScrollLeft=b[0].scrollLeft,a())})},$.fn.scrollVertical=function(a){var b=this;b[0].lastScrollTop=b[0].scrollTop,b.scroll(function(){b[0].scrollTop!==b[0].lastScrollTop&&(b[0].lastScrollTop=b[0].scrollTop,a())})}});