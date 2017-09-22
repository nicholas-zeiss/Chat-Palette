/**
 *
 *  Here we create our root level module, app, and configure the router
 *
**/


angular.module('app', [
	'app.auth',
	'app.services',
	'app.chat',
	'ngRoute'
])
	.config( $routeProvider => {
		$routeProvider
			.when('/', {
				templateUrl: 'auth/login.html',
				controller: 'AuthController'
			})
			.when('/signup', {
				templateUrl: 'auth/signup.html',
				controller: 'AuthController'
			})
			.when('/chat', {
				templateUrl: 'chat/chat.html',
				controller: 'ChatController'
			})
			.otherwise({
				redirectTo:'/'
			});
	});

