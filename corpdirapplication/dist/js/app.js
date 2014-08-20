
/*================================================================
=>                  App = myapp
==================================================================*/
/* global angular */

var app = angular.module('corpdir', ['ngRoute', 'ui.bootstrap', 'angularMoment']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider, localize) {
	'use strict';

	$routeProvider
		.when('/', {
			templateUrl: 'corpdirapplication/templates/home.htm'
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.hashPrefix('!');
   

	// This is required for Browser Sync to work poperly
    //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
	// CSRF token from meta - If needed
	// $httpProvider.defaults.headers.post['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);


/*================================================================
=>                  myapp App Run()  
==================================================================*/

app.run(['$rootScope', function ($rootScope) {
	
	'use strict';

	console.log('Corporate Directory, Running...');
    
}]);


/* ---> Do not delete this comment (Values) <--- */

/* ---> Do not delete this comment (Constants) <--- */


/*
 * An AngularJS Localization Service
 *
 * Thanks to Jim Lavin.
 * Maintained by Haukur Kristinsson 2014.
 *
 */

app
    // localization service responsible for retrieving resource files from the server and
    // managing the translation dictionary
    .factory('localize', ['$http', '$rootScope', '$window', '$filter', function ($http, $rootScope, $window, $filter) {
        'use strict';
        var localize = {
            // use the $window service to get the language of the user's browser
            language: '',
            // array to hold the localized resource string entries
            dictionary: [],
            // location of the resource file
            url: undefined,
            // flag to indicate if the service hs loaded the resource file
            resourceFileLoaded: false,

            // success handler for all server communication
            successCallback: function (data) {
                // store the returned array in the dictionary
                localize.dictionary = data;
                // set the flag that the resource are loaded
                localize.resourceFileLoaded = true;
                // broadcast that the file has been loaded
                $rootScope.$broadcast('localizeResourcesUpdated');
            },

            // allows setting of language on the fly
            setLanguage: function (value) {
                localize.language = value;
                localize.initLocalizedResources();
            },

            // allows getting the current language settingsy
            getLanguage: function (value) {
                return localize.language;
            },
                        

            // allows setting of resource url on the fly
            setUrl: function (value) {
                localize.url = value;
                localize.initLocalizedResources();
            },

            // builds the url for locating the resource file
            buildUrl: function () {
                if (!localize.language) {
                    var lang, androidLang;
                    // works for earlier version of Android (2.3.x)
                    if ($window.navigator && $window.navigator.userAgent && (androidLang = $window.navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
                        lang = androidLang[1];
                    } else {
                        // works for iOS, Android 4.x and other devices
                        lang = $window.navigator.userLanguage || $window.navigator.language;
                    }
                    // set language
                    localize.language = lang;
                }
                return 'i18n/resources-locale_' + localize.language + '.json';
            },

            // loads the language resource file from the server
            initLocalizedResources: function () {
                // build the url to retrieve the localized resource file
                var url = localize.url || localize.buildUrl();
                // request the resource file
                $http({ method: "GET", url: url, cache: false }).success(localize.successCallback).error(function () {
                    // the request failed set the url to the default resource file
                    var url = '/i18n/resources-locale_default.json';
                    // request the default resource file
                    $http({ method: "GET", url: url, cache: false }).success(localize.successCallback);
                });
            },

            // checks the dictionary for a localized resource string
            getLocalizedString: function (value) {
                // default the result to an empty string
                var result = '';

                // make sure the dictionary has valid data
                if ((localize.dictionary !== []) && (localize.dictionary.length > 0)) {
                    // use the filter service to only return those entries which match the value
                    // and only take the first result
                    var entry = $filter('filter')(localize.dictionary, function (element) {
                        return element.key === value;
                    }
                    )[0];

                    // set the result
                    result = entry.value;
                }
                // return the value to the call
                return result;
            }
        };

        // force the load of the resource file
        localize.initLocalizedResources();

        // return the local instance when called
        return localize;
    }])
    // simple translation filter
    // usage {{ TOKEN | i18n }}
    .filter('i18n', ['localize', function (localize) {
        return function (input) {
            return localize.getLocalizedString(input);
        };
    }])
    // translation directive that can handle dynamic strings
    // updates the text value of the attached element
    // usage <span data-i18n="TOKEN" ></span>
    // or
    // <span data-i18n="TOKEN|VALUE1|VALUE2" ></span>
    .directive('i18n', ['localize', function (localize) {
        var i18nDirective = {
            restrict: "EAC",
            updateText: function (elm, token) {
                var values = token.split('|');
                if (values.length >= 1) {
                    // construct the tag to insert into the element
                    var tag = localize.getLocalizedString(values[0]);
                    // update the element only if data was returned
                    if ((tag !== null) && (tag !== undefined) && (tag !== '')) {
                        if (values.length > 1) {
                            for (var index = 1; index < values.length; index++) {
                                var target = '{' + (index - 1) + '}';
                                tag = tag.replace(target, values[index]);
                            }
                        }
                        // insert the text into the element
                        elm.text(tag);
                    };
                }
            },

            link: function (scope, elm, attrs) {
                scope.$on('localizeResourcesUpdated', function () {
                    i18nDirective.updateText(elm, attrs.i18n);
                });

                attrs.$observe('i18n', function (value) {
                    i18nDirective.updateText(elm, attrs.i18n);
                });
            }
        };

        return i18nDirective;
    }])
    // translation directive that can handle dynamic strings
    // updates the attribute value of the attached element
    // usage <span data-i18n-attr="TOKEN|ATTRIBUTE" ></span>
    // or
    // <span data-i18n-attr="TOKEN|ATTRIBUTE|VALUE1|VALUE2" ></span>
    .directive('i18nAttr', ['localize', function (localize) {
        var i18NAttrDirective = {
            restrict: "EAC",
            updateText: function (elm, token) {
                var values = token.split('|');
                // construct the tag to insert into the element
                var tag = localize.getLocalizedString(values[0]);
                // update the element only if data was returned
                if ((tag !== null) && (tag !== undefined) && (tag !== '')) {
                    if (values.length > 2) {
                        for (var index = 2; index < values.length; index++) {
                            var target = '{' + (index - 2) + '}';
                            tag = tag.replace(target, values[index]);
                        }
                    }
                    // insert the text into the element
                    elm.attr(values[1], tag);
                }
            },
            link: function (scope, elm, attrs) {
                scope.$on('localizeResourcesUpdated', function () {
                    i18NAttrDirective.updateText(elm, attrs.i18nAttr);
                });

                attrs.$observe('i18nAttr', function (value) {
                    i18NAttrDirective.updateText(elm, value);
                });
            }
        };

        return i18NAttrDirective;
    }]);
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

        }
    };
}]);