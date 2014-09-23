/*global app*/

/* NHaukssonote: Naming convention for controllers are UpperCamelCase. */

app.controller('MainCtrl', ['$http', '$scope', 'localize', '$timeout', '$filter', function ($http, $scope, localize, $timeout, $filter) {

    'use strict';

    /*
     *   Localization Logic
     */

    // TODO: Set this from a URI param.
    localize.setLanguage('is-IS');

    $scope.toggleLanguage = function() {
        (localize.getLanguage() == 'is-IS') ? localize.setLanguage('en-US', function () { console.log("Locale: en-US");})
            : localize.setLanguage('is-IS', function () { console.log("Locale: is-IS"); });
    };

    /*
     * Pagination Settings
     */

    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 10;
    

    $scope.getNumPages = function () {
        return Math.ceil($scope.FilteredSearchData.length / $scope.numPerPage);
    };

    $scope.getFilteredDataLength = function() {
        return $scope.FilteredSearchData.length;
    };

    /* 
     * Filters, populate and initialization.
     */

    /* Show or Hidden Properties */
    $scope.FilterShow = false,
    $scope.toggleFilterControls = function () {
        $scope.filterShow = ($scope.filterShow) ? false : true;
    },
    
    /* 
     Search update when you type in a query string.
    */
    $scope.FilteredSearchData = [];
    $scope.updateSearchData = function ()
    {

        $scope.FilteredSearchData = [];
        
        if ($scope.CompanyFilter != "*") {
            console.log("Filtering Company");
            angular.forEach($scope.SearchData, function(item) {
                if (item.COMPANY == $scope.CompanyFilter)
                    $scope.FilteredSearchData.push(item);
            });
        }
        
        if ($scope.CountryFilter != "*") {
            console.log("Filtering Country");
            angular.forEach($scope.SearchData, function (item) {
                if (item.COUNTRY == $scope.CountryFilter)
                    $scope.FilteredSearchData.push(item);
            });
        }
        if ($scope.OfficeFilter != "*") {
            console.log("Filtering Office");
            angular.forEach($scope.SearchData, function (item) {
                if (item.OFFICE == $scope.OfficeFilter)
                    $scope.FilteredSearchData.push(item);
            });
        }
        

        if($scope.OfficeFilter == "*" && $scope.CountryFilter == "*" && $scope.CompanyFilter == "*")
            $scope.FilteredSearchData = $scope.SearchData;
        
        // Apply filter on the data.
        $scope.FilteredSearchData = $filter('filter')($scope.FilteredSearchData, $scope.searchEmp);



    },
    



    //TODO: Simplify and remove boilerplate code.

    $scope.OfficeItems = [{ name: "", value: "*" }],
    $scope.CompanyItems = [{ name: "", value: "*" }],
    $scope.CountryItems = [{ name: "", value: "*" }];

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
            $scope.CompanyFilter = $scope.CompanyItems[0].value;
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
        $scope.CountryFilter = $scope.CountryItems[0].value;
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
        $scope.OfficeFilter = $scope.OfficeItems[0].value;
    });








    $scope.ShowAutocomplete = false;
    
    $scope.changeSearchModel = function (value) {
        $scope.searchEmp = value;
        $scope.searchDirectory();
        $scope.ShowAutocomplete = false;
    },

    $scope.searchDirectory = function () {

        $scope.ResultVisible = ($scope.searchEmp == "") ? $scope.ResultVisible = false : $scope.ResultVisible = true;
        
        // Apply filter on the help.
        $scope.HelpListFiltered = $filter('filter')($scope.HelpList, $scope.searchEmp);
        if ($scope.HelpListFiltered.length > 0 && $scope.searchEmp != "") {
            $scope.ShowAutocomplete = true;
        }
        else
            $scope.ShowAutocomplete = false;
        //$timeout.cancel($scope.AutoCompleteTimer);
        //$scope.AutoCompleteTimer = $timeout(function () {
        //    $scope.ShowAutocomplete = false;
        //}, 15000);

        // TODO: Add Timeout to search DATA.
        if (!$scope.SearchData) {
            $http.post("/DirectoryAPI.asmx/GetAllEmployees",
            {
                data: {  },
                headers:
                    {
                        'Content-Type': 'application/json'
                    }
            }).then(function (res) {
                $scope.SearchData = res.data.d;
                $scope.bigTotalItems = $scope.SearchData.length;
                $scope.updateSearchData();
            });
        } else {
            $scope.updateSearchData();
        }
        

        
    };













    /*
     *  Autocomplete Help.
     *  Note that we load everything at once.
     */
    
    function getHelp() {
        if ($scope.HelpList == null) {
            $scope.HelpList = [{ type: "loading", value: "loading autocomplete help." }];
            var data = { "query": "*" };
            $http.post('/DirectoryAPI.asmx/AutocompleteHelp', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                var emps = [];
                angular.forEach(res.data.d, function (item) {
                    emps.push({ "type": item.Type, "value": item.Value });
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

    $scope.HelpRandomizer = function() {
        return 0.5 - Math.random();
    };

    // Load the autocomplete list.
    $scope.HelpList = getHelp();
    
    
}]);