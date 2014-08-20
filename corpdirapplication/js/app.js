
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