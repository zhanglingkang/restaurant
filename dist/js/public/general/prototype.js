/*! ppz_website 2015-01-27 4:31:55 PM */
Function.prototype.curryThis=function(){var a=this;return function(){return[].unshift.call(arguments,this),a.apply(null,arguments)}},Function.prototype.unCurryThis=function(){var a=this;return function(){return a.apply(arguments[0],arguments.slice(1))}},Function.prototype.before=function(a,b){return function(){if(b.apply(this,arguments))var c=a.apply(this,arguments);return c}}.curryThis(),Function.prototype.after=function(a,b){return function(){var c=a.apply(this,arguments);return b.lastResult=c,b.apply(this,arguments),c}}.curryThis(),Function.prototype.setRequestStatus=function(a,b,c){return a.before(function(){return b[c]=b.REQUEST_STATUS.ING,!0}).after(function(){return arguments.callee.lastResult.then(function(){b[c]=b.REQUEST_STATUS.SUCCESSFUL},function(){b[c]=b.REQUEST_STATUS.FAILED}),arguments[arguments.length-1]})}.curryThis(),Date.prototype.toString=function(){return this.format("yyyy-MM-dd")},Date.prototype.format=function(a){var b={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var c in b)new RegExp("("+c+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?b[c]:("00"+b[c]).substr((""+b[c]).length)));return a};