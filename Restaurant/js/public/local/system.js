"use strict"
define(function (require, exports, module) {
    var ROOT_DIR = "//" + location.host + "/partials/"
    return {
        /**
         * @returns {string} 模板文件的绝对路径
         */
        getTplAbsolutePath: function (path) {
            return ROOT_DIR + path
        }
    }
})