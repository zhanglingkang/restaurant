/**
 * Created by Chris on 2/2/14.
 */

var SERVER_URL = "http://aws.ppzapp.com:34952/BBQueue/API";
var PPZ_ERROR = {None:0, UserNotFound:14};

function createRequest(commandName, payload)
{
    return {"data": JSON.stringify({"command": commandName, "inputs" : payload}), "hash": "pleasedonotcheckmyhashthankyou!!"};
}

var ppzServices = angular.module("ppzServices", ['ngResource']);

ppzServices.factory('Login', ['$http','$q', "$window",
    function($http, $q, $window){
        var loginService = {
            login: function(username, password)
            {
                var response = $q.defer();
                var postData = createRequest("login", {userId:username, password : password}) ;
                $http.post(SERVER_URL, postData).
                    success(
                    function(data, status, headers, config)
                    {
                        var jsonData = JSON.parse(data.data);
                        if(status >= 400 || data.data == null || jsonData.code != PPZ_ERROR.None)
                        {
                            $window.sessionStorage.token = null;
                            response.reject("Login Failed");
                            return;
                        }
                        console.log($window.sessionStorage.token);
                        var token = jsonData.results[0].sessionId;
                        $window.sessionStorage.token = token;
                        $window.sessionStorage.username = username;
                        response.resolve("OK");
                    }).
                    error(
                    function(error){
                        console.log("login failed " + error);
                        $window.sessionStorage.token = null;
                        response.reject(error);
                    });
                return response.promise;
            },
            logout: function(callback) {
                var reqData = createRequest('logout', {sessionId : $window.sessionStorage.token});
                $http.post(SERVER_URL, reqData).
                    success(
                        function(data) {
                            var jsonData = JSON.parse(data.data);
                            if(jsonData.code != PPZ_ERROR.None)
                                callback(jsonData.message);
                            else {
                                $window.sessionStorage.token = null;
                                callback(null, null);
                            }
                        }
                    ).
                    error(
                        function(error) {
                        console.log('encounted error in getMyRestaurantList: ' + error);
                        callback(error);
                    }
                );
            },
        };

        return loginService;
    }
]);

ppzServices.factory('RestaurantService', ['$http', '$window', '$q',
    function($http, $window, $q) {
        return {
            _restaurantList : null,

            getMyRestaurantList: function(callback) {
                var _this = this;
                var reqData = createRequest('getManagingRestaurants', {sessionId : $window.sessionStorage.token});
                $http.post(SERVER_URL, reqData).
                    success(
                        function(data) {
                            var jsonData = JSON.parse(data.data);
                            if(jsonData.code != PPZ_ERROR.None)
                                callback(jsonData.message);
                            else {
                                _this._restaurantList = jsonData.results
                                callback(null, _this._restaurantList);
                            }
                        }
                    ).
                    error(
                        function(error) {
                        console.log('encounted error in getMyRestaurantList: ' + error);
                        callback(error);
                    }
                );
            },

            getRestaurant: function(restaurantId, callback) {
                var _this = this;
                var defer = $q.defer();
                if(!this._restaurantList){
                    this.getMyRestaurantList(function(error, list) {
                        if(error) 
                            defer.reject(error);
                        else
                            defer.resolve();
                    });
                }
                else
                    defer.resolve();
                defer.promise.then(function() {
                    for(var i = 0; i < _this._restaurantList.length; ++i) {
                        if(_this._restaurantList[i].restaurantId === restaurantId) 
                            return callback(null, _this._restaurantList[i]);
                    }
                }, function(error) {
                    callback(error);
                });
            },

            updateRestaurantInfo: function(restaurantId, info, callback) {
                var reqData = createRequest('modifyRestaurantInfo', {sessionId: $window.sessionStorage.token, restaurantId: restaurantId, "phone.number": info.phone.phone, email: info.email, website: info.website,restaurantDescription: info.restaurantDescription, "address.city": info.address.city, "address.location": info.address.location, "address.state": info.address.state, "address.street": info.address.street, "address.zipcode": info.address.zipcode});
                $http.post(SERVER_URL, reqData).
                success(function(data) {
                    var jsonData = JSON.parse(data.data);
                    if(jsonData.code != PPZ_ERROR.None)
                        callback(jsonData.message);
                    else
                        callback(null, jsonData.results[0]);
                }).error(function(error) {
                    console.log('encounted error in updateRestaurantInfo: ' + error);
                    callback(error);
                });
            },

            getWaitingList: function(restaurantId, callback) {
                var reqData = createRequest('allUnitInfo', {sessionId : $window.sessionStorage.token, restaurantId : restaurantId});
                $http.post(SERVER_URL, reqData).
                    success(
                        function(data) {
                            var jsonData = JSON.parse(data.data);
                            if(jsonData.code != PPZ_ERROR.None)
                                callback(jsonData.message);
                            else
                                callback(null, jsonData.results[0]);
                        }
                    ).
                    error(
                        function(error) {
                        console.log('encounted error in queryRestaurantQueue: ' + error);
                        callback(error);
                    }
                );
            }
        }
    }
]);

ppzServices.factory('WaitingListService', ['$http', '$window', function($http, $window){
    return {
        lastCalledNumber : 0,
        callUser: function(restaurantId, unitId, callback) {
            this.lastCalledNumber = unitId;
            var reqData = createRequest('callUser', {sessionId: $window.sessionStorage.token, restaurantId: restaurantId, unitId: unitId});
            $http.post(SERVER_URL, reqData).
            success(function(data) {
                var jsonData = JSON.parse(data.data);
                if(jsonData.code != PPZ_ERROR.None)
                    callback(jsonData.message);
                else
                    callback(null, jsonData.results[0]);
            }).error(function(error) {
                console.log('encounted error in callUser: ' + error);
                callback(error);
            });
        },
        removeUser: function(restaurantId, unitId, type, callback) {
            var command = 'waitingToComplete';
            if(type === 'reservation')
                command = 'reservationToComplete';
            var reqData = createRequest(command, {sessionId: $window.sessionStorage.token, restaurantId: restaurantId, unitId: unitId});
            $http.post(SERVER_URL, reqData).
            success(function(data) {
                var jsonData = JSON.parse(data.data);
                if(jsonData.code != PPZ_ERROR.None)
                    callback(jsonData.message);
                else
                    callback(null, jsonData.results[0]);
            }).error(function(error) {
                console.log('encounted error in removeUser: ' + error);
                callback(error);
            });
        },
        addUser: function(restaurantId, name, partyTypeId, phone, reservationTime, callback) {
            if(reservationTime !== null)
                reservationTime = Math.round(reservationTime.getTime() / 1000);
            var reqData = createRequest('addAdhocUserToQueue', {sessionId: $window.sessionStorage.token, restaurantId: restaurantId, name: name, partyTypeId: parseInt(partyTypeId), 'phone.number': phone, "reservationTime": reservationTime});
            $http.post(SERVER_URL, reqData).
            success(function(data) {
                var jsonData = JSON.parse(data.data);
                if(jsonData.code != PPZ_ERROR.None)
                    callback(jsonData.message);
                else
                    callback(null, jsonData.results[0]);
            }).error(function(error) {
                console.log('encounted error in addUser: ' + error);
                callback(error);
            });
        }
    };
}]);

ppzServices.factory('MenuService', ['$http', '$window', function($http, $window){
    return {
        _menu: null,
        getMenu: function(restaurantId, callback) {
            var _this = this;
            var reqData = createRequest('getRestaurantMenu', {sessionId: $window.sessionStorage.token, restaurantId: restaurantId});
            $http.post(SERVER_URL, reqData).
            success(function(data) {
                var jsonData = JSON.parse(data.data);
                if(jsonData.code != PPZ_ERROR.None)
                    callback(jsonData.message);
                else {
                    _this._menu = jsonData.results[0];
                    callback(null, _this._menu);
                }
            }).error(function(error) {
                console.log('encounted error in getRestaurantMenu: ' + error);
                callback(error);
            });
        },
        updateMenu: function(menu, callback) {
            var reqData = createRequest('upsertRestaurantMenu', {sessionId: $window.sessionStorage.token, restaurantId: menu.restaurantId, menuCategories: menu.menuCategories});
            $http.post(SERVER_URL, reqData).
            success(function(data) {
                var jsonData = JSON.parse(data.data);
                if(jsonData.code != PPZ_ERROR.None)
                    callback(jsonData.message);
                else
                    callback(null, jsonData.results[0]);
            }).error(function(error) {
                console.log('encounted error in getRestaurantMenu: ' + error);
                callback(error);
            });
        },
    };
}]);

ppzServices.factory('ReviewService', ['$http', '$window', function($http, $window){
    return {
        getReviewList: function(restaurantId, pageNum, callback) {
            var reqData = createRequest('getRestaurantReviewList', {sessionId: $window.sessionStorage.token, restaurantId: restaurantId, startIndex: pageNum * 10 + 1, size: 10});
            $http.post(SERVER_URL, reqData).
            success(function(data) {
                var jsonData = JSON.parse(data.data);
                if(jsonData.code != PPZ_ERROR.None)
                    callback(jsonData.message);
                else {
                    callback(null, jsonData.results);
                }
            }).error(function(error) {
                console.log('encounted error in getReviews: ' + error);
                callback(error);
            });
        },
        replyReview: function(restaurantId, reviewId, message, callback) {
            var reqData = createRequest('replyRestaurantReview', {sessionId: $window.sessionStorage.token, restaurantId: restaurantId, reviewId: Number(reviewId), replyMessage: message});
            $http.post(SERVER_URL, reqData).
            success(function(data) {
                var jsonData = JSON.parse(data.data);
                if(jsonData.code != PPZ_ERROR.None)
                    callback(jsonData.message);
                else {
                    callback(null, jsonData.results);
                }
            }).error(function(error) {
                console.log('encounted error in getReviews: ' + error);
                callback(error);
            });
        },
    };
}]);

