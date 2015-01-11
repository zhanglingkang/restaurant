Function.prototype.curryThis = function () {
    var self = this
    return function () {
        [].unshift.call(arguments, this)
        self.apply(null, arguments)
    }
}
Function.prototype.unCurryThis = function () {
    var self = this
    return function () {
        self.apply(arguments[0], arguments.slice(1));
    }
}