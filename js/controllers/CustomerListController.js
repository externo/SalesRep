'use strict';
app.controller('CustomerListController',
    function ($scope, authService, customersService, notifyService, $http, baseUrl, headers, $location) {

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

        // Redirect to customer details
        $scope.customerDetails = function(customerId){
            $location.path("/customer/"+customerId);
        };


        // Load statuses
        var statusesUrl = baseUrl + 'classes/Status';
        $http.get(statusesUrl, headers)
            .success(function(data){
                $scope.statuses = data.results;
                notifyService.showInfo("Statuses loaded");
            })
            .error(function(err){
                notifyService.showError("Statuses load problem", err);
            });

        // Add new customer
        var currentUser = authService.getCurrentUser();
        var customerUrl = baseUrl + 'classes/Customer';
        $scope.adCustomer = function(newCustomer) {
            var customer = newCustomer;
            customer.user = {"__type": "Pointer", "className": "_User",  "objectId":currentUser["objectId"]}
            $http.post(customerUrl, customer, headers)
                .success(function (data) {
                    notifyService.showInfo("New customer added");
                })
                .error(function (err) {
                    notifyService.showError("New customer not added", err);
                });
        };
    }
);
