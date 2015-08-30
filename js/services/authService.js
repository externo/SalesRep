'use strict';
app.factory('authService',
    function ($http, baseUrl, headers, $location) {
        return {
            login: function(userData, success, error) {
                var url = baseUrl + 'login' + '?username=' + userData.username + '&password=' + userData.password;
                $http.get(url, headers)
                    .success(function(data) {
                        sessionStorage['currentUser'] = JSON.stringify(data);
                        success(data);
                    })
                    .error(error);
            },
            register: function(userData, success, error) {
                var url = baseUrl + 'users';
                $http.post(url, userData, headers)
                    .success(function(data) {
                        sessionStorage['currentUser'] = JSON.stringify(data);
                        success(data);
                    })
                    .error(error);
            },
            logout: function() {
                $location.path("/");
                delete sessionStorage['currentUser'];
            },
            getCurrentUser : function() {
                var userObject = sessionStorage['currentUser'];
                if (userObject) {
                    return JSON.parse(sessionStorage['currentUser']);
                }
            },
            isAnonymous : function() {
                return sessionStorage['currentUser'] == undefined;
            },
            isLoggedIn : function() {
                return sessionStorage['currentUser'] != undefined;
            }
        }
    }
);