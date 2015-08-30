'use strict';
app.factory('customerEditService',
    function ($http, baseUrl, headers) {
        var statusesUrl = baseUrl + 'classes/Status';
        var actionsUrl = baseUrl + 'classes/Action';

        return {
            getStatuses: function() {
                return $http.get(statusesUrl, headers);
            },
            getActions: function() {
                return $http.get(actionsUrl, headers);
            }
        }
    }
);