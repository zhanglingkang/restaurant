/**
 * Created by Chris on 2/2/14.
 */
var SERVER = "http://awsjp.ppzapp.com:34952";
var SERVER = "http://ali.ppzapp.cn:34952";
var SERVER_URL = SERVER + "/BBQueue/API";
var AUTH_SERVER_URL = SERVER + "/BBQueue/CredentialService";
var FILE_SERVER_URL = SERVER + "/FileUploader/upload";
var MENU_IMPORT_URL = SERVER + "/FileUploader/menuUpload";
var PPZ_ERROR = {
    None: 0,//code为0表示请求成功
    UserNotFound: 14,
    SESSION_TIMEOUT: 16
};

function createRequest(commandName, payload) {
    return {"data": JSON.stringify({"command": commandName, "inputs": payload}), "hash": "pleasedonotcheckmyhashthankyou!!"};
}

var ppzServices = angular.module("ppzServices", ['ngResource']);
ppzServices.factory('http', ['$http', '$q', '$location', function ($http, $q, $location) {
    return {
        /**
         *
         * @param {Object} config
         * @param {Object} config.method
         */
        request: function (config) {
            var deferred = $q.defer();
            $http(config).
                success(function (data, status, headers, config) {
                    var jsonData = JSON.parse(data.data);
                    if (jsonData.code == PPZ_ERROR.None) {
                        deferred.resolve(jsonData);
                    } else {
                        if (jsonData.code == PPZ_ERROR.SESSION_TIMEOUT) {
                            $location.path("/login");
                        } else {
                            deferred.reject(jsonData);
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        get: function (url, config) {
            config = config || {};
            return this.request(angular.extend(config, {
                method: "GET",
                url: url
            }));
        },
        post: function (url, data, config) {
            config = config || {};
            return this.request(angular.extend(config, {
                method: "POST",
                url: url,
                data: data
            }));
        }
    };
}]);
/**
 * 提供公共服务
 */
ppzServices.factory("public", [function () {
    var buffer = {
        /**
         * @method store 以键值对的形式存储到本地，如果key已经存在，覆盖原先的值
         * @param {String} key
         * @param {Any} value
         */
        store: function (key, value) {
            var valueStr = JSON.stringify(value);
            sessionStorage.setItem(key, valueStr);
        },
        /**
         * @method remove 从本地存储中删除键为key的信息。
         * @param {String} key
         */
        remove: function (key) {
            sessionStorage.removeItem(key);
        },
        /**
         * @method has 检索本地存储中是否存在键为key的值
         * @param key
         * @return {Boolean}
         */
        has: function (key) {
            return !!sessionStorage.getItem(key);
        },
        /**
         * @method get 返回key对应的值，返回的数据类型与存储一致
         * @param {String} key
         * @return {Any}
         */
        get: function (key) {
            var valueStr = sessionStorage.getItem(key);
            return JSON.parse(valueStr);
        }

    };
    return {
        buffer: buffer
    }
}]);
ppzServices.factory('Login', ['$http', '$q', "$window", "$cookies", "http",
    function ($http, $q, $window, $cookies, http) {
        var loginService = {
            login: function (username, password) {
                var response = $q.defer();
                var postData = createRequest("login", {userId: username, password: password});
                var promise = http.post(SERVER_URL, postData);
                promise.then(function (jsonData) {
                    var token = jsonData.results[0].sessionId;
                    $cookies.token = token;
                    $cookies.username = username;
                }, function () {
                    $cookies.token = null;
                });
                return promise;
            },
            /**
             *
             * @param callback 成功之后的回调
             */
            logout: function (callback) {
                var reqData = createRequest('logout', {sessionId: $cookies.token});
                var promise = http.post(SERVER_URL, reqData);
                promise.then(function () {
                    $cookies.token = null;
                    callback();
                }, function (error) {
                    console.log('encounted error in getMyRestaurantList: ' + error);
                });
                return promise;
            },
            resetPassword: function (userName, callback, error) {
                var reqData = createRequest('requestUserPasswordReset', {userId: userName});
                var promise = http.post(AUTH_SERVER_URL, reqData);
                promise.then(function (data) {
                    callback(data);
                }, function (data) {
                    error(data);
                });
                return promise;
            }
        };
        return loginService;
    }
]);

ppzServices.service('RestaurantService', ['$http', '$window', '$q', '$cookies', 'http',
    function ($http, $window, $q, $cookies, http) {
        var getRestaurantListDefered;
        return {
            _restaurantList: null,

            getMyRestaurantList: function (callback) {
                var _this = this;
                var reqData = createRequest('getManagingRestaurants', {sessionId: $cookies.token});
                if (!getRestaurantListDefered) {
                    getRestaurantListDefered = http.post(SERVER_URL, reqData);
                    getRestaurantListDefered.then(function (data) {
                        _this._restaurantList = data.results;
                        callback(null, data.results);
                    }, function () {
                        console.log('encounted error in getMyRestaurantList: ' + error);
                    });
                }
                return getRestaurantListDefered;
            },

            getRestaurant: function (restaurantId, callback) {
                var _this = this;
                var defer = $q.defer();
                if (!this._restaurantList) {
                    this.getMyRestaurantList(function (error, list) {
                        if (error)
                            defer.reject(error);
                        else
                            defer.resolve();
                    });
                }
                else {
                    defer.resolve();
                }
                defer.promise.then(function () {
                    for (var i = 0; i < _this._restaurantList.length; ++i) {
                        if (_this._restaurantList[i].restaurantId === restaurantId)
                            return callback(null, _this._restaurantList[i]);
                    }
                }, function (error) {
                    callback(error);
                });
            },

            updateRestaurantInfo: function (restaurantId, info, callback) {
                var reqData = createRequest('modifyRestaurantInfo', {sessionId: $cookies.token, restaurantId: restaurantId, "phone.number": info.phone.phone, email: info.email, website: info.website, restaurantDescription: info.restaurantDescription, "address.city": info.address.city, "address.location": info.address.location, "address.state": info.address.state, "address.street": info.address.street, "address.zipcode": info.address.zipcode});
                return http.post(SERVER_URL, reqData);
            },

            getWaitingList: function (restaurantId, callback) {
                var reqData = createRequest('allUnitInfo', {sessionId: $cookies.token, restaurantId: restaurantId});
                var promise = http.post(SERVER_URL, reqData);
                promise.then(function (data) {
                    callback(null, data.results[0]);
                }, function (error) {
                    console.log('encounted error in queryRestaurantQueue: ' + error);
                    callback(error);
                });
                return promise;
            }
        }
    }
]);

ppzServices.factory('WaitingListService', ['$http', '$window', '$cookies', function ($http, $window, $cookies) {
    return {
        lastCalledNumber: 0,
        callUser: function (restaurantId, unitId, callback) {
            this.lastCalledNumber = unitId;
            var reqData = createRequest('callUser', {sessionId: $cookies.token, restaurantId: restaurantId, unitId: unitId});
            $http.post(SERVER_URL, reqData).
                success(function (data) {
                    var jsonData = JSON.parse(data.data);
                    if (jsonData.code != PPZ_ERROR.None)
                        callback(jsonData.message);
                    else
                        callback(null, jsonData.results[0]);
                }).error(function (error) {
                    console.log('encounted error in callUser: ' + error);
                    callback(error);
                });
        },
        removeUser: function (restaurantId, unitId, type, callback) {
            var command = 'waitingToComplete';
            if (type === 'reservation')
                command = 'reservationToComplete';
            var reqData = createRequest(command, {sessionId: $cookies.token, restaurantId: restaurantId, unitId: unitId});
            $http.post(SERVER_URL, reqData).
                success(function (data) {
                    var jsonData = JSON.parse(data.data);
                    if (jsonData.code != PPZ_ERROR.None)
                        callback(jsonData.message);
                    else
                        callback(null, jsonData.results[0]);
                }).error(function (error) {
                    console.log('encounted error in removeUser: ' + error);
                    callback(error);
                });
        },
        addUser: function (restaurantId, name, partyTypeId, phone, reservationTime, callback) {
            if (reservationTime !== null)
                reservationTime = Math.round(reservationTime.getTime() / 1000);
            var reqData = createRequest('addAdhocUserToQueue', {sessionId: $cookies.token, restaurantId: restaurantId, name: name, partyTypeId: parseInt(partyTypeId), 'phone.number': phone, "reservationTime": reservationTime});
            $http.post(SERVER_URL, reqData).
                success(function (data) {
                    var jsonData = JSON.parse(data.data);
                    if (jsonData.code != PPZ_ERROR.None)
                        callback(jsonData.message);
                    else
                        callback(null, jsonData.results[0]);
                }).error(function (error) {
                    console.log('encounted error in addUser: ' + error);
                    callback(error);
                });
        }
    };
}]);

ppzServices.factory('MenuService', ['$http', '$window', '$cookies', 'http', function ($http, $window, $cookies, http) {
    return {
        _menu: null,
        getMenu: function (restaurantId, callback) {
            var _this = this;
            var reqData = createRequest('getRestaurantMenu', {sessionId: $cookies.token, restaurantId: restaurantId});
            var promise = http.post(SERVER_URL, reqData);
            promise.
                then(function (data) {
                    _this._menu = data.results[0];
                    callback(null, _this._menu);
                }, function (error) {
                    console.log('encounted error in getRestaurantMenu: ' + error);
                    callback(error);
                });
            return promise;
        },
        importMenu: function (file, restaurantId) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('sessionId', $cookies.token);
            fd.append('restaurantId', restaurantId);
            return http.post(MENU_IMPORT_URL, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
        },
        updateMenu: function (menu, callback) {
            var reqData = createRequest('upsertRestaurantMenu', {sessionId: $cookies.token, restaurantId: menu.restaurantId, menuCategories: menu.menuCategories});
            $http.post(SERVER_URL, reqData).
                success(function (data) {
                    var jsonData = JSON.parse(data.data);
                    if (jsonData.code != PPZ_ERROR.None)
                        callback(jsonData.message);
                    else
                        callback(null, jsonData.results[0]);
                }).error(function (error) {
                    console.log('encounted error in getRestaurantMenu: ' + error);
                    callback(error);
                });
        }
    };
}]);

ppzServices.factory('ReviewService', ['$http', '$window', '$cookies', function ($http, $window, $cookies) {
    return {
        getReviewList: function (restaurantId, pageNum, callback) {
            var reqData = createRequest('getRestaurantReviewList', {sessionId: $cookies.token, restaurantId: restaurantId, startIndex: pageNum * 10 + 1, size: 10});
            $http.post(SERVER_URL, reqData).
                success(function (data) {
                    var jsonData = JSON.parse(data.data);
                    if (jsonData.code != PPZ_ERROR.None)
                        callback(jsonData.message);
                    else {
                        callback(null, jsonData.results);
                    }
                }).error(function (error) {
                    console.log('encounted error in getReviews: ' + error);
                    callback(error);
                });
        },
        replyReview: function (restaurantId, reviewId, message, callback) {
            var reqData = createRequest('replyRestaurantReview', {sessionId: $cookies.token, restaurantId: restaurantId, reviewId: Number(reviewId), replyMessage: message});
            $http.post(SERVER_URL, reqData).
                success(function (data) {
                    var jsonData = JSON.parse(data.data);
                    if (jsonData.code != PPZ_ERROR.None)
                        callback(jsonData.message);
                    else {
                        callback(null, jsonData.results);
                    }
                }).error(function (error) {
                    console.log('encounted error in getReviews: ' + error);
                    callback(error);
                });
        }
    };
}]);

ppzServices.factory('FileUploadService', ['$http', '$window', '$cookies', function ($http, $window, $cookies) {
    return {
        FILE_SERVER_URL: FILE_SERVER_URL,
        upload: function (files, restaurantId) {
            var fd = new FormData()
            angular.forEach(files, function (file) {
                fd.append('file', file)
            })
            fd.append('sessionId', $cookies.token);
            fd.append('restaurantId', restaurantId);
            $http.post(FILE_SERVER_URL, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).
                success(function (data) {
                    var jsonData = JSON.parse(data.data);
                });
        }
    };
}]);
ppzServices.service('manageAccountService', ['$http', '$window', '$cookies', 'http', function ($http, $window, $cookies, http) {
    var modifyAccountInfo = function (data, success, error) {
        var reqData = createRequest('updateUserInfo', data);
        $http.post(SERVER_URL, reqData).
            success(function (data) {
                var jsonData = JSON.parse(data.data);
                if (jsonData.code != PPZ_ERROR.None)
                    error(jsonData);
                else {
                    success(jsonData.results);
                }
            }).error(function (data) {
                console.log('encounted error in getReviews: ' + data);
                error(data);
            });
    };
    var getUserInfoDefered;
    return {
        modifyPassword: function (oldPassword, newPassword, success, error) {
            var data = {
                sessionId: $cookies.token,
                userId: $cookies.username,
                password: newPassword,
                oldPassword: oldPassword
            };
            modifyAccountInfo(data, success, error);
        },
        modifyEmail: function (email, success, error) {
            var data = {
                sessionId: $cookies.token,
                userId: $cookies.username,
                email: email
            };
            modifyAccountInfo(data, success, error);
        },
        getUserInfo: function () {
            var data = createRequest("getUserInfo", {
                sessionId: $cookies.token
            });
            if (!getUserInfoDefered) {
                getUserInfoDefered = http.post(SERVER_URL, data);
            }
            return getUserInfoDefered;
        }
    };
}]);

