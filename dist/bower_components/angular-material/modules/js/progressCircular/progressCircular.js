/*! ppz_website 2015-02-05 3:57:11 PM */
!function(){"use strict";function a(a,b,c){function d(a){return a.attr("aria-valuemin",0),a.attr("aria-valuemax",100),a.attr("role","progressbar"),e}function e(a,d,e){c(d);var i,j,k,l,m=d[0],n=m.querySelectorAll(".md-fill, .md-mask.md-full"),o=m.querySelectorAll(".md-fill.md-fix"),p=e.mdDiameter||48,q=p/48;m.style[b.CSS.TRANSFORM]="scale("+q.toString()+")",e.$observe("value",function(a){for(j=f(a),k=g[j],l=h[j],d.attr("aria-valuenow",j),i=0;i<n.length;i++)n[i].style[b.CSS.TRANSFORM]=k;for(i=0;i<o.length;i++)o[i].style[b.CSS.TRANSFORM]=l})}function f(a){return a>100?100:0>a?0:Math.ceil(a||0)}for(var g=new Array(101),h=new Array(101),i=0;101>i;i++){var j=i/100,k=Math.floor(180*j);g[i]="rotate("+k.toString()+"deg)",h[i]="rotate("+(2*k).toString()+"deg)"}return{restrict:"E",template:'<div class="md-spinner-wrapper"><div class="md-inner"><div class="md-gap"></div><div class="md-left"><div class="md-half-circle"></div></div><div class="md-right"><div class="md-half-circle"></div></div></div></div>',compile:d}}angular.module("material.components.progressCircular",["material.core"]).directive("mdProgressCircular",a),a.$inject=["$$rAF","$mdConstant","$mdTheming"]}();