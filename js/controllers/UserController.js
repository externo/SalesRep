'use strict';
app.controller('UserController',
    function ($scope, $location, authService, notifyService) {
        //LOGOUT
        $scope.authService = authService;

        // Logout function
        $scope.logout = function() {
            notifyService.showInfo("Logout successful");
            console.log('logout');
            authService.logout();
            $location.path("/");
        };
    }
);