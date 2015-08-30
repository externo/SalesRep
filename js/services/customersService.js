'use strict';
app.factory('customersService',
    function ($http, baseUrl, headers, authService) {
        var currentUser = authService.getCurrentUser();
        var customersUrl =
            baseUrl + 'classes/Customer/'
            + '?where={"user": {"__type": "Pointer", "className": "_User",  "objectId":"' + currentUser['objectId'] + '"}}'
            +'&keys=customername,objectId,productname,status';

        return {
            getCustomers: function() {
                return $http.get(customersUrl, headers);
            }
        }
    }
);