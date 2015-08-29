'use strict';
app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $scope.login = function(userData) {
            authService.login(userData,
                function success() {
                    notifyService.showInfo("Successful login");
                    $location.path("/customer");
                },
                function error(err) {
                    notifyService.showError("User or password do not match", err);
                }
            );
        };
    }
);