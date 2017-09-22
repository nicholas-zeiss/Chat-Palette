



import angular from 'angular';


(() => {
  angular.module('app.serverCalls', [])
  .factory('serverCalls', [ '$http', '$location', '$window', ($http, $location, $window) => {

    var login = function(user) {
      return $http({
        method: 'POST',
        url: '/login',
        data: user
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(error) {
        console.error(error);
        return error;
      });
    };

    var signUp = function(user) {
      return $http({
        method: 'POST',
        url: '/signup',
        data: user
      })
      .then(function(res){
        return res.data;
      })
      .catch(function(error){
        console.error(error);
        return error;
      });
    };

    var signOut = function() {
      $location.path('/login');
    };

	  var sendMessage = function(message) {
	    console.log(message);
	    return $http({
	      method: 'POST',
	      url: '/chat',
				headers: { Authorization: 'Bearer ' + $window.sessionStorage.token },
	      data: message
	    })
	    .then(function(res) {
	      return res.data;
	    }).catch(err => err);
	  };

	  var getMessages = function() {
	    return $http({
	      method: 'GET',
	      url: '/chat',
	      headers: { Authorization: 'Bearer ' + $window.sessionStorage.token }
	    })
	    .then(function(res) {
	      return res.data;
	    }).catch(err => err);
	  };

	  
    return {
      login: login,
	    getMessages: getMessages,
	    sendMessage: sendMessage,
      signUp: signUp,
      signOut: signOut
    };
  }]);
})();

