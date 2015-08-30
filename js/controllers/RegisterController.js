'use strict';
app.controller('RegisterController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $scope.register = function(userData) {
            authService.register(userData,
                function success() {
                    notifyService.showInfo("Successful register");
                    $location.path("/customer");
                },
                function error(err) {
                    notifyService.showError("Registration failed", err);
                }
            );
        };
    }
);