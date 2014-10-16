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
            }
        }
    );

    grunt.registerTask("init", "初始化dist目录", function () {
        if (grunt.file.exists("./dist")) {
            grunt.file.delete("./dist");
        }
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
        "htmlmin"
    ]);
}