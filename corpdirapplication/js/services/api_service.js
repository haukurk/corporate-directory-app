/*global app*/

app.factory('ApiService', ['$http','$q', function ($http, $q) {
    'use strict';
    return {
        getAutoCompleteHelp: function (query) {
            
            var data = { "query": query };
            
            var deferred = $q.defer();
            
            $http({ method: 'POST', url: '/DirectoryAPI.asmx/AutocompleteHelp', headers: { 'Content-Type': 'application/json' } })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject('Error when calling AutocompleteHelp');
                });

            return deferred.promise;

        },
        searchForEmps: function (query) {
            
            var data = { "query": query };
            
            var deferred = $q.defer();
            
            $http({ method: 'POST', url: '/DirectoryAPI.asmx/AutocompleteHelp', headers: { 'Content-Type': 'application/json' } })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject('Error when calling AutocompleteHelp');
                });

            return deferred.promise;

        },
    };
}]);