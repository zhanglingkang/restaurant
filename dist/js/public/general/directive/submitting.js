/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";define("public/general/directive/submitting",["app"],function(a){var b=a("app");b.directive("submitting",function(){return{restrict:"A",scope:{isSubmitting:"="},link:function(a,b,c){var d,e=$(b),f=c.submitting||"提交中...",g=e.val()||e.html();"BUTTON"===e[0].nodeName?d="html":"INPUT"===e[0].nodeName&&(d="val"),a.$watch("isSubmitting",function(){a.isSubmitting?(e[d](f),e.attr("disabled","disabled")):(e[d](g),e.removeAttr("disabled"))})}}})});