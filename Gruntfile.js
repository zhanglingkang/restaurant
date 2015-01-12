module.exports = function (grunt) {

    var fs = require("fs");
    // Project configuration.
    grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),
            copy: {
                all: {
                    cwd: "./Restaurant/",
                    src: [ "./**" ],
                    dest: "./dist/",
                    expand: true
                }
            },
            uglify: {
                options: {
                    banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd h:MM:ss TT') %> */\n"
                },
                js: {
                    files: [
                        {
                            expand: true,
                            cwd: 'dist/js',
                            src: '**/*.js',
                            dest: 'dist/js'
                        },
                        {
                            expand: true,
                            cwd: 'dist/bower_components',
                            src: '**/*.js',
                            dest: 'dist/bower_components',
                            filter: function (filepath) {
                                return filepath.indexOf("src") == -1;
                            },
                        }
                    ]
                }
            },
            cssmin: {
                options: {
                    keepSpecialComments: 0
                },
                css: {
                    src: "./dist/css/base.css",
                    dest: "./dist/css/base.css"
                }
            },
            htmlmin: {
                html: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeStyleLinkTypeAttributes: true,
                        minifyJS: true,
                        conservativeCollapse: true,
                        minifyCSS: true
                    },
                    files: [
                        {
                            expand: true,
                            cwd: './dist/partials',
                            src: '**/*.html',
                            dest: './dist/partials'
                        },
                        {
                            src: "./dist/index.html",
                            dest: "./dist/index.html"
                        }
                    ]
                }
            },
            transport: {
                options: {
                    alias: "<%= pkg.spm.alias %>",
                    debug: false
                },
                js: {
                    files: [
                        {
                            expand: true,
                            cwd: "./dist/js/",
                            src: "./**/*.js",
                            filter: function (filepath) {
                                return filepath.indexOf("build.js") == -1;
                            },
                            dest: "./dist/js"
                        }
                    ]
                }
            },
            concat: {
                options: {
                    noncmd: true
                },
                js: {
                    files: [
                        {
                            src: ["./dist/js/**/*.js"],
                            dest: "./dist/js/main.js",
                            filter: function (filepath) {
                                return !/build|seajs-config|seajs-run/.test(filepath)
                            }
                        },
                        {
                            src: ["./dist/js/seajs-config.js", "./dist/js/main.js", "./dist/js/seajs-run.js"],
                            dest: "./dist/js/main.js"
                        }
                    ]
                }
            },
            replace: {
                "index.html": {
                    file: "./dist/index.html",
                    replace: ['js/main.min.js']
                }
            }
        }
    );

    grunt.registerTask("init", "初始化dist目录", function () {
        if (grunt.file.exists("./dist")) {
            grunt.file.delete("./dist");
        }
    });
    grunt.registerMultiTask("replace", "将指定的文件里标记data-romove属性标签删除掉", function () {
        var scriptReg = /<script\s+[^>]*data-remove[^>]*>\s*<\/script>/g;
        var linkReg = /<link\s+[^>]*data-remove[^>]*>/g;
        var fileContent = grunt.file.read(this.data.file);
        var replacePosition = -1;
        var contentToAdd = "";
        var addLinkContent = "";
        //找到添加script标签的位置
        while (scriptReg.exec(fileContent) != null) {
            replacePosition = scriptReg.lastIndex;
        }
        if (replacePosition != -1) {
            this.data.replace.forEach(function (value, index) {
                if (/js$/.test(value)) {
                    contentToAdd += "<script src=\"" + value + "\"></script>";
                }
            });
        }
        fileContent = fileContent.substring(0, replacePosition) + contentToAdd + fileContent.substring(replacePosition, fileContent.length);

        replacePosition = -1;
        contentToAdd = "";
        //找到添加link标签的位置
        while (linkReg.exec(fileContent) != null) {
            replacePosition = linkReg.lastIndex;
        }
        if (replacePosition != -1) {
            this.data.replace.forEach(function (value, index) {
                if (/css$/.test(value)) {
                    contentToAdd += "<link rel='stylesheet' href='" + value + "'/>";
                }
            });
        }
        fileContent = fileContent.substring(0, replacePosition) + contentToAdd + fileContent.substring(replacePosition, fileContent.length);
        fileContent = fileContent.replace(scriptReg, "").replace(linkReg, "");
        grunt.file.write(this.data.file, fileContent);
    });


    grunt.loadNpmTasks("grunt-cmd-transport");
    grunt.loadNpmTasks("grunt-cmd-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-ssh");
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    // 默认被执行的任务列表。
    grunt.registerTask("default", [
        "init",
        "copy",
        "uglify",
        "cssmin",
        "htmlmin",
        "replace",
        "transport:js",
        "concat",
        "replace"
    ]);
}