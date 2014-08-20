/*global app*/

/* NHaukssonote: Naming convention for controllers are UpperCamelCase. */

app.controller('MainCtrl', ['$http', '$scope', 'localize', function ($http, $scope, localize) {

    'use strict';

    /*
     *   Localization Logic
     */ 

    // TODO: Set this from a URI param.
    localize.setLanguage('is-IS');

    $scope.setEnglishLanguage = function () { localize.setLanguage('en-US'); },
    $scope.setIcelandicLanguage = function () { localize.setLanguage('is-IS'); };

    $scope.toggleLanguage = function () {
        (localize.getLanguage() == 'is-IS') ? localize.setLanguage('en-US')
            : localize.setLanguage('is-IS');
    };
    
    /* 
     * Filters, populate and initialization.
     */
    
    //TODO: Simplify and remove boilerplate code.

    $scope.OfficeFilter = [], $scope.CompanyFilter = [], $scope.CountryFilter = [];
    $scope.OfficeItems = [], $scope.CompanyItems = [], $scope.CountryItems = [];

    $http.post("/DirectoryAPI.asmx/GetAllCompanies",
        { data: {},
            headers:
                {
                    'Content-Type': 'application/json'
                }
        }).then(function (res) {
            angular.forEach(res.data.d, function (item) {
                $scope.CompanyItems.push({ name: item, value: item });
            });
            $scope.CompanyFilter = $scope.CompanyItems[0];
        });

    $http.post("/DirectoryAPI.asmx/GetAllCountries",
    {
        data: {},
        headers:
            {
                'Content-Type': 'application/json'
            }
    }).then(function (res) {
        angular.forEach(res.data.d, function (item) {
            $scope.CountryItems.push({ name: item, value: item });
        });
        $scope.CountryFilter = $scope.CountryItems[0];
    });
    
    $http.post("/DirectoryAPI.asmx/GetAllOffices",
    {
        data: {},
        headers:
            {
                'Content-Type': 'application/json'
            }
    }).then(function (res) {
        angular.forEach(res.data.d, function (item) {
            $scope.OfficeItems.push({ name: item, value: item });
        });
        $scope.OfficeFilter = $scope.OfficeItems[0];
    });













    $scope.Searches = 0;
    $scope.searchDirectory = function(delay) {

    };













    /*
     *  Autocomplete Help.
     *  Note that we load everything at once.
     */
    
    function getHelp() {
        if ($scope.HelpList == null) {
            var data = { "query": "*" };
            $http.post('/DirectoryAPI.asmx/AutocompleteHelp', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                var emps = [];
                angular.forEach(res.data.d, function (item) {
                    emps.push(item);
                });
                $scope.HelpList = emps;
                return $scope.HelpList;
            });
        }
        else {
            return $scope.HelpList;
        }
        return null;
    }

    // Load the autocomplete list.
    $scope.HelpList = getHelp();
    
}]);