'use strict';
app.controller('CustomerDetailsController',
    function ($scope, authService, notifyService, $http, baseUrl, headers, $location) {

        var url=($location.absUrl());
        var customerId = url.substr(url.lastIndexOf('/') + 1);
        //console.log(customerId);

        var customerUrl = baseUrl + 'classes/Customer/' + customerId;
        var statusesUrl = baseUrl + 'classes/Status';
        var actionsUrl = baseUrl + 'classes/Action';

        // Delete customer
        $scope.deleteCustomer = function() {
            $http.delete(customerUrl, headers)
                .success(function (data) {
                    notifyService.showInfo("Customer deleted");
                    $location.path("/customer");
                })
                .error(function (err) {
                    notifyService.showError("Customer delete fail", err);
                });
        };

        // Edit customer
        $scope.editCustomer = function(customer) {
            $http.put(customerUrl, customer, headers)
                .success(function (data) {
                    notifyService.showInfo("Customer edited");
                    $location.path("/customer");
                })
                .error(function (err) {
                    notifyService.showError("Customer edit fail", err);
                });
        };

        // Load customer details
        $http.get(customerUrl, headers)
            .success(function(data){
                $scope.customerDetails = data;
                notifyService.showInfo("Customer details loaded");
            })
            .error(function(err){
                notifyService.showError("Customer details load problem", err);
            });

        // Load statuses
        $http.get(statusesUrl, headers)
            .success(function(data){
                $scope.statuses = data.results;
                //notifyService.showInfo("Statuses loaded");
            })
            .error(function(err){
                notifyService.showError("Statuses load problem", err);
            });

        // Load actions
        $http.get(actionsUrl, headers)
            .success(function(data){
                $scope.actions = data.results;
                //notifyService.showInfo("Actions loaded");
            })
            .error(function(err){
                notifyService.showError("Actions load problem", err);
            });
    }
);
