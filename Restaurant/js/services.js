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
                        response.resolve("OK");
                    }).
                    error(
                    function(error){
                        console.log("login failed " + error);
                        $window.sessionStorage.token = null;
                        response.reject(error);
                    });
                return response.promise;
            }
        };

        return loginService;
    }
]);
