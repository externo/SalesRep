'use strict';
var app = angular.module('app', ['ngRoute', 'ngResource']);
app.constant('baseUrl', 'https://api.parse.com/1/');
app.constant('headers', {
    headers: {
            'X-Parse-Application-Id': 'ga4gcqI9h3qOGMulFbHohR5Bp0gfS2HjOXjB7cbD',
            'X-Parse-REST-API-Key': '80ClitYf3IevU46WeXJSvU9PLg1DW8HtaJ7A4Kpx',
            "Content-Type" : "application/json"
        }
    }
);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'RegisterController'
        })
        .when('/customer', {
            templateUrl: 'templates/list-customers.html',
            controller: 'CustomerListController'
        })
        .when('/customer/:id', {
            templateUrl: 'templates/customer-detail.html',
            controller: 'CustomerDetailsController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }
);

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function () {
        if ($location.path().indexOf("/customer") != -1 && !authService.isLoggedIn()) {
            // Authorization check: anonymous site visitors cannot access user routes
            $location.path("/");
        }
    });
});
