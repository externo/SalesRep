'use strict';
app.controller('CustomerListController',
    function ($scope, authService, customersService, notifyService, $http, baseUrl, headers, $location) {

    //LOGOUT
        $scope.authService = authService;

        // Logout function
        $scope.logout = function() {
            notifyService.showInfo("Logout successful");
            console.log('logout');
            authService.logout();
            $location.path("/");
        };

        // Load customers
        $scope.reloadCustomers = function() {
            return customersService.getCustomers()
                .success(function (data) {
                    $scope.customers = data.results;
                    notifyService.showInfo("Customers loaded");
                })
                .error(function (err) {
                    notifyService.showError("Customers load problem", err);
                }
            );
        };
        $scope.reloadCustomers();

        $scope.customerDetails = function(customerId){
            $location.path("/customer/"+customerId);
        };

        //$scope.editAd = function(objectId, newAd) {
        //    var request = {
        //        method: 'PUT',
        //        url: baseUrl + 'classes/Part/' + objectId,
        //        headers: headers.headers,
        //        data: newAd
        //    };
        //    $http(request)
        //        .success(function (data) {
        //            notifyService.showInfo("Обявата е редактирана.");
        //            $location.path("/manipulateAds");
        //            $scope.reloadAds();
        //            $scope.newAd = {};
        //        })
        //        .error(function (err) {
        //            notifyService.showError("Неуспешен опит да редактирате обявата!", err);
        //            $location.path("/editAd");
        //        });
        //};
        //
        //$scope.deleteAd = function(objectId) {
        //    var request = {
        //        method: 'DELETE',
        //        url: baseUrl + 'classes/Part/' + objectId,
        //        headers: headers.headers
        //    };
        //    $http(request)
        //        .success(function (data) {
        //            notifyService.showInfo("Обявата е изтрита.");
        //            $location.path("/manipulateAds");
        //            //$scope.reloadAds(); //hide element, not reload(very big data reload)
        //        })
        //        .error(function (err) {
        //            notifyService.showError("Неуспешен опит да изтриете обявата!", err);
        //            $location.path("/manipulateAds");
        //        });
        //};
    }
);
