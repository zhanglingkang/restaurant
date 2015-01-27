Function.prototype.curryThis = function () {
    var self = this
    return function () {
        [].unshift.call(arguments, this)
        return self.apply(null, arguments)
    }
}
Function.prototype.unCurryThis = function () {
    var self = this
    return function () {
        return self.apply(arguments[0], arguments.slice(1))
    }
}
Function.prototype.before = function (self, fun) {
    return function () {
        if (fun.apply(this, arguments)) {
            var result = self.apply(this, arguments)
        }
        return result
    }
}.curryThis()
Function.prototype.after = function (self, fun) {
    return function () {
        var result = self.apply(this, arguments)
        fun.lastResult = result
        fun.apply(this, arguments)
        return result
    }
}.curryThis()
Function.prototype.setRequestStatus = function (self, $scope, prototype) {
    return self.before(function () {
        $scope[prototype] = $scope.REQUEST_STATUS.ING
        return true
    }).after(function () {
        arguments.callee.lastResult.then(function () {
            $scope[prototype] = $scope.REQUEST_STATUS.SUCCESSFUL
        }, function () {
            $scope[prototype] = $scope.REQUEST_STATUS.FAILED
        })
        return arguments[arguments.length - 1]
    })
}.curryThis()
Date.prototype.toString = function () {
    return this.format("yyyy-MM-dd")
}
/*
 //使用方法
 var now = new Date()
 var nowStr = now.format("yyyy-MM-dd hh:mm:ss")
 //使用方法2:
 var testDate = new Date()
 var testStr = testDate.format("YYYY年MM月dd日hh小时mm分ss秒")
 alert(testStr)
 //示例：
 alert(new Date().Format("yyyy年MM月dd日"))
 alert(new Date().Format("MM/dd/yyyy"))
 alert(new Date().Format("yyyyMMdd"))
 alert(new Date().Format("yyyy-MM-dd hh:mm:ss"))
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
        }
    }
    return format
}