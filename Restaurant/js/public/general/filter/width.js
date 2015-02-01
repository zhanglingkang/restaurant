"use strict"
define(function (require, exports, module) {
    var app = require("app")
    app.filter("width", function () {
        /**
         * @param {string} input 如果input的length小于width,则填充指定的字符
         * @param {string} char 默认空格
         * @param {boolean} 默认true 填充右边
         */
        return function (input, width, char, right) {
            char = char || " "
            if (right === undefined) {
                right = true
            }
            var append = []

            if (input.length < width) {
                append.length = width - input.length + 1
                input = right ? input + append.join(char) : append.join(char) + input
            }
            console.log(input, "char", char)
            return input
        }
    })
})