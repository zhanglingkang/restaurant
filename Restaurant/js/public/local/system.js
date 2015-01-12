"use strict";

define(function (require, exports, module) {
    var ROOT_DIR = seajs.data.cwd + "tpl/";
    return {
        /**
         * @param path {String} tpl相对路径
         * @returns {string} tpl在php服务器的绝对路径 如：http://ipadbms.kuaiyong.com/protected/views/template/index.html
         */
        getTplAbsolutePath: function (path) {
            if (/^\//.test(path)) {
                path = path.substring(1);
            }
            if (/^tpl\//.test(path)) {
                path = path.substring(4);
            }
            return ROOT_DIR + path;
        }
    };
});