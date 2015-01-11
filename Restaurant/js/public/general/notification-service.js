"use strict"

define(function (require) {
    var app = require("app")
    var notificationService = ["$q", function ($q) {
        return {
            create: function (title, config) {
                var defer = $q.defer();
                if (Notification.permission === "granted") {
                    defer.resolve(new Notification(title, config));
                } else if (Notification.permission !== 'denied') {
                    if (!Notification.requestPermissioning) {
                        Notification.requestPermissioning = true;
                        Notification.requestPermission(function (permission) {
                            Notification.requestPermissioning = false;
                            if (!('permission' in Notification)) {
                                Notification.permission = permission;
                            }
                            if (Notification.permission === "granted") {
                                defer.resolve(new Notification(title, config));
                            } else {
                                defer.reject("权限不足");
                            }
                        });
                    }
                }
                return defer.promise
            }
        }
    }]

    app.service("notificationService", notificationService)
})