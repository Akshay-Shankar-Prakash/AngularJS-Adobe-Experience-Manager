;(function() {
    'use strict';

    angular
        .module('dash')
        .factory('ConfirmService', ConfirmService);

    function ConfirmService($q, $http, BACKEND_URL, HttpService) {

        var service = {
            activateProfile: activateProfile
        };

        return service;

        function activateProfile(data) {
            return HttpService.httpPost('/dash/v1/enroll/activateProfile', data)
                .then(function(response) {
                    return response;
                })
                .catch(function(error) {
                    return $q.reject(error);
                });
        }
    }
}());