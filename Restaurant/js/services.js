/**
 * Created by Chris on 2/2/14.
 */
;
(function () {
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
        payload = payload || {};
        return {"data": JSON.stringify({"command": commandName, "inputs": payload}), "hash": "pleasedonotcheckmyhashthankyou!!"};
    }

    var ppzServices = angular.module("ppzServices", ['ngResource']);
    var dataService = [function () {
        var result = {
            reservationStatus: {
                waitConfirm: 1,
                accept: 2,
                refuse: 3
            }
        };
        var API = {
            getText: function (value) {
                var result;
                util.getArray(this).some(function (item) {
                    if (item.value === value) {
                        result = item.text;
                        return true;
                    }
                });
                return result;
            }
        }
        angular.forEach(result, function (value) {
            value.__proto__ = API;
        });
        return result;
    }];
    var pubSubService = [function () {
        /**
         * 这里topics作为map使用,key为topic的Type。value为topic的详情
         * @type {Object}
         */
        var topics = {};
        /**
         * 作为map使用,key为topic的type。value为订阅者列表
         * @type {Object}
         */
        var subList = {};

        return {
            publish: function (topicType, topic) {
                topics[topicType] = topic;
                subList[topicType] = subList[topicType] || [];
                subList[topicType].forEach(function (sub) {
                    sub(topic);
                });
            },
            subscribe: function (topic, fn) {
                subList[topic] = subList[topic] || [];
                subList[topic].push(fn);
            },
            unSubscribe: function (topic, fn) {
                subList[topic] = subList[topic] || [];
                subList[topic] = subList[topic].filter(function (sub) {
                    return sub !== fn;
                });
            }

        };
    }];
    var audioService = ['$document', function ($document) {

        return {
            /**
             *
             * @param {Object} config
             * @param {Object} config.src 视频地址
             * @returns {{play: play, pause: pause}}
             */
            create: function (config) {
                var $audio = $("<audio></audio>");
                config = config || {};
                angular.forEach(config, function (value, key) {
                    $audio.attr(key, value);
                });
                var audio = $audio[0];
                $(document.documentElement).append(audio);
                return {
                    play: function () {
                        audio.play();
                    },
                    pause: function () {
                        audio.pause();
                    }
                }
            }
        }
    }];
    var reservationService = ["http", "utilService", "$cookies", "$mdBottomSheet", "pubSubService", function (http, utilService, $cookies, $mdBottomSheet, pubSubService) {
        var eventSource;
        /**
         * key为restaurantId,
         * value为{waitingList:[],completeList:[],reservationList:[]}
         * @type {{}}
         */
        var queueMap = {

        };
        queueMap.__proto__ = {
            /**
             *
             * @param restaurantId
             * @param {Object} queue
             */
            addQueue: function (restaurantId, queue) {
                if (!queueMap[restaurantId]) {
                    queueMap[restaurantId] = queue;
                    return;
                }
                queue.reservationList.forEach(function (newItem) {
                    if (!contain(queueMap[restaurantId].reservationList, newItem)) {
                        queueMap[restaurantId].reservationList.push(newItem);
                    } else {
                        queueMap[restaurantId].reservationList.forEach(function (oldItem, index) {
                                if (equal(newItem, oldItem)) {
                                    queueMap[restaurantId].reservationList[index] = newItem;
                                }
                            }
                        )
                    }
                });
                angular.forEach(queueMap[restaurantId].waitingList, function (value, key) {
                    queueMap[restaurantId].waitingList[key] = queueMap[restaurantId].waitingList[key].concat(queue.waitingList[key]);
                });
                queueMap[restaurantId].completeList = queueMap[restaurantId].completeList.concat(queue.completeList);
            }
        };
        /**
         * 某个预约列表是否有某条预约信息
         * @param {Array} reservationList
         * @param {Object} reservation
         */
        function contain(reservationList, reservation) {
            var map = {};
            reservationList.forEach(function (item) {
                map[item.createTime] = item;
            });
            return !!map[reservation.createTime];
        }

        /**
         * 比较两条预约信息是否为同一条
         * @param {Object} reservation1
         * @param {Object} reservation2
         * @return {boolean}如果是，返回true
         */
        function equal(reservation1, reservation2) {
            return reservation1.createTime === reservation2.createTime;
        }

        return {
//                /**
//                 * 接受餐厅列表中包含的餐厅的推送消息
//                 * @param {Array} restaurantList
//                 */
//                receiveReservationInfo: function (self, restaurantList) {
//                    restaurantList.forEach(function (restaurant) {
//                        self.connect();
//                    });
//                }.curryThis(),
            /**
             * 与服务器建立一条EventSource连接，如果连接已经建立，不重复建立,同一个餐厅id可以多次调用没有副作用
             */
            connect: function () {
                if (!eventSource) {
                    eventSource = new EventSource(utilService.getUrl("/bbqueue", {
                        command: "pullQueueUnit",
                        sessionId: $cookies.token
                    }));
                    eventSource.addEventListener("open", function (event) {
                        console.log("open:" + new Date());
                    });
                    eventSource.addEventListener("error", function (event) {
                        console.log("error:" + new Date());
                    });
                    eventSource.addEventListener("message", function (event) {
                        var data = JSON.parse(event.data);
                        queueMap.addQueue(data.restaurantId, data.queues);
                        pubSubService.publish("newReservation", queueMap);
                        console.log("message:");
                    });
                }
            },
            getQueueMap: function () {
                return queueMap;
            },
            getQueue: function (restaurantId) {
                return queueMap[restaurantId];
            },
            /**
             *
             * @param {Object} reservationForm
             * @param reservationForm.restaurantId
             * @param reservationForm.unitId,
             * @param reservationForm.comment
             */
            accept: function (reservationForm) {
                return this.acceptOrDeclineReservation(angular.extend({
                    accept: true
                }, reservationForm));
            },
            refuse: function (reservationForm) {
                return this.acceptOrDeclineReservation(angular.extend({
                    accept: false
                }, reservationForm));
            },
            acceptOrDeclineReservation: function (data) {
                data.sessionId = $cookies.token;
                var reqData = createRequest('acceptOrDeclineReservation', data);
                return http.post(reqData);
            }
        }
    }
    ];
    var notificationService = ["$q", function ($q) {
        return {
            create: function (title, config) {
                var defer = $q.defer();
                if (Notification.permission === "granted") {
                    defer.resolve(new Notification(title, config));
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission(function (permission) {
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
                return defer.promise;
            }
        }

    }]

    ppzServices.factory('http', ['$http', '$q', '$location', '$cookies', function ($http, $q, $location, $cookies) {
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
                            deferred.reject(jsonData);
                            if (jsonData.code == PPZ_ERROR.SESSION_TIMEOUT) {
                                delete $cookies.token;
                                delete $cookies.username;
                                $location.path("/login");
                            }
                        }
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                deferred.promise.success = function (callback) {
                    deferred.promise.then(callback);
                    return deferred.promise;
                };
                deferred.promise.error = function (callback) {
                    deferred.promise.then(null, callback);
                    return deferred.promise;
                };
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
                if (angular.isObject(url)) {
                    config = data;
                    data = url;
                    url = SERVER_URL;
                }
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
                getMyRestaurantList: function () {
                    var _this = this;
                    var reqData = createRequest('getManagingRestaurants', {sessionId: $cookies.token});
                    if (!getRestaurantListDefered) {
                        getRestaurantListDefered = http.post(SERVER_URL, reqData);
                        getRestaurantListDefered.then(function (data) {
                        }, function (error) {
                            console.log('businessError:getManagingRestaurants: ' + error);
                            getRestaurantListDefered = null;
                        });
                    }
                    return getRestaurantListDefered;
                },

                getRestaurant: function (restaurantId) {
                    var defer = $q.defer();
                    this.getMyRestaurantList().then(function (data) {
                        for (var i = 0; i < data.results.length; ++i) {
                            if (data.results[i].restaurantId === restaurantId) {
                                defer.resolve(data.results[i]);
                                break;
                            }
                        }
                        if (i == data.results.length) {
                            defer.reject("没找到对应餐厅");
                        }
                    }, function (error) {
                        defer.reject(error);
                    });
                    return defer.promise;
                },
                /**
                 *
                 * @param {Boolean} enable
                 */
                acceptReservation: function (restaurantId, enable) {
                    var reqData = createRequest('modifyRestaurantInfo', {
                        sessionId: $cookies.token,
                        restaurantId: restaurantId,
                        acceptReservation: enable
                    });
                    return http.post(reqData);
                },
                enableQueue: function (restaurantId, enable) {
                    var reqData = createRequest('modifyRestaurantInfo', {
                        sessionId: $cookies.token,
                        restaurantId: restaurantId,
                        enableQueue: enable
                    });
                    return http.post(reqData);
                },
                /**
                 *
                 * @param restaurantId
                 * @param {Number} length
                 */
                setMaxQueue: function (restaurantId, length) {
                    var reqData = createRequest('modifyRestaurantInfo', {
                        sessionId: $cookies.token,
                        restaurantId: restaurantId,
                        maxQueueLength: length
                    });
                    return http.post(reqData);
                },
                updateRestaurantInfo: function (restaurantId, info, callback) {
                    var reqData = createRequest('modifyRestaurantInfo', {sessionId: $cookies.token, restaurantId: restaurantId, "phone.number": info.phone.phone, email: info.email, website: info.website, restaurantDescription: info.restaurantDescription, "address.city": info.address.city, "address.location": info.address.location, "address.state": info.address.state, "address.street": info.address.street, "address.zipcode": info.address.zipcode});
                    return http.post(reqData);
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

    ppzServices.service('MenuService', ['$http', '$window', '$cookies', 'http', function ($http, $window, $cookies, http) {
        var getMenuDefered;
        return {
            _menu: null,
            getMenu: function (restaurantId) {
                var _this = this;
                var reqData = createRequest('getRestaurantMenu', {sessionId: $cookies.token, restaurantId: restaurantId});
                if (!getMenuDefered) {
                    getMenuDefered = http.post(SERVER_URL, reqData);
                    getMenuDefered.
                        then(function (data) {
                            _this._menu = data.results[0];
                        }, function (error) {
                            console.log('encounted error in getRestaurantMenu: ' + error);
                            getMenuDefered = null;
                        });
                }
                return getMenuDefered;
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
            /**
             *
             * @param {Object} menuCategoryForm
             * @param {String} menuCategoryForm.categoryName;
             * @param {String} menuCategoryForm.categoryDescription
             * @param {String} restaurantId
             */
            addMenuCategory: function (menuCategoryForm, restaurantId) {
                var reqData = createRequest('createMenuCategory', angular.extend(menuCategoryForm, {
                    sessionId: $cookies.token,
                    restaurantId: restaurantId
                }));
                return http.post(reqData);
            },
            /**
             *
             * @param {Object} menuCategoryForm
             * @param {String} menuCategoryForm.categoryName;
             * @param {String} menuCategoryForm.categoryDescription
             * @param {String} menuCategoryForm.categoryId
             * @param {String} restaurantId
             */
            modifyMenuCategory: function (menuCategoryForm, restaurantId) {
                var reqData = createRequest('modifyMenuCategory', angular.extend(menuCategoryForm, {
                    sessionId: $cookies.token,
                    restaurantId: restaurantId
                }));
                return http.post(reqData);
            },
            /**
             *
             * @param {String} categoryId
             * @param {String} restaurantId
             */
            removeMenuCategory: function (categoryId, restaurantId) {
                var reqData = createRequest('deleteMenuCategory', {
                    sessionId: $cookies.token,
                    restaurantId: restaurantId,
                    categoryId: categoryId
                });
                return http.post(reqData);
            },
            /**
             *
             * @param {Object} menuItemForm
             * @param {String} menuItemForm.categoryId
             * @param {String} menuItemForm.itemName
             * @param {String} menuItemForm.itemDescription
             * @param {String} menuItemForm.price
             * @param restaurantId
             */
            addMenuItem: function (menuItemForm, restaurantId) {
                var reqData = createRequest('createMenuItem', angular.extend(menuItemForm, {
                    sessionId: $cookies.token,
                    restaurantId: restaurantId
                }));
                return http.post(reqData);
            },
            /**
             *
             * @param {Object} menuItemForm
             * @param {String} menuItemForm.itemId
             * @param {String} menuItemForm.categoryId
             * @param {String} menuItemForm.itemName
             * @param {String} menuItemForm.itemDescription
             * @param {String} menuItemForm.price
             * @param restaurantId
             */
            modifyMenuItem: function (menuItemForm, restaurantId) {
                var reqData = createRequest('modifyMenuItem', angular.extend(menuItemForm, {
                    sessionId: $cookies.token,
                    restaurantId: restaurantId
                }));
                return http.post(reqData);
            },
            removeMenuItem: function (menuItemForm, restaurantId) {
                var reqData = createRequest('deleteMenuItem', angular.extend(menuItemForm, {
                    sessionId: $cookies.token,
                    restaurantId: restaurantId
                }));
                return http.post(reqData);
            },
            /**
             *
             * @param {Object} sortForm
             * @param {String} sortForm.categoryId
             * @param {String} sortForm.previousCategoryId
             * @param restaurantId
             */
            sortMenuCategory: function (sortForm, restaurantId) {
                var reqData = createRequest('pivotMenuCategory', angular.extend(sortForm, {
                    sessionId: $cookies.token,
                    restaurantId: restaurantId
                }));
                return http.post(reqData);
            },
            /**
             *
             * @param {Object} sortForm
             * @param {String} sortForm.itemId
             * @param {String} sortForm.previousItemId
             * @param {String} sortForm.categoryId
             * @param restaurantId
             */
            sortMenuItem: function (sortForm, restaurantId) {
                var reqData = createRequest('pivotMenuItem', angular.extend(sortForm, {
                    sessionId: $cookies.token,
                    restaurantId: restaurantId
                }));
                return http.post(reqData);
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
    }])
    ;

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

    ppzServices.factory('FileUploadService', ['$http', '$window', '$cookies', 'http', function ($http, $window, $cookies, http) {
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
            },
            getPictures: function (restaurantId) {
                var reqData = createRequest("getRestaurantPicture", {
                    sessionId: $cookies.token,
                    restaurantId: restaurantId
                });
                return http.post(reqData);
            },
            /**
             *
             * @param {Object} removeForm
             * @param {String} removeForm.pictureId
             * @param {String} removeForm.restaurantId
             */
            removePicture: function (removeForm) {
                var reqData = createRequest("removeRestaurantPicture", angular.extend(removeForm, {
                    sessionId: $cookies.token
                }));
                return http.post(reqData);
            },
            /**
             * @param {Object} pictureCommentForm
             * @param {String} pictureCommentForm.pictureId
             * @param {String} pictureCommentForm.pictureComment
             * @param {String} pictureCommentForm.restaurantId
             */
            modifyIntroduce: function (pictureCommentForm) {
                var reqData = createRequest("modifyRestaurantPictureComment", angular.extend(pictureCommentForm, {
                    sessionId: $cookies.token
                }));
                return http.post(reqData);
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
                    getUserInfoDefered = http.post(SERVER_URL, data).catch(function () {
                        getUserInfoDefered = null;
                    });
                }
                return getUserInfoDefered;
            }
        };
    }]);
    ppzServices.service("reservationService", reservationService).service("dataService", dataService).service("pubSubService", pubSubService).service("audioService", audioService).service("notificationService", notificationService);
}
())