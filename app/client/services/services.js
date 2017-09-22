angular.module('app.services', [])

/**
*  factory for login and signup html/js
*/

.factory('Auth', function($http, $location, $window) {

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
    });
  };

  var signOut = function() {
    $location.path('/login');
  };

  return {
    login: login,
    signUp: signUp,
    signOut: signOut
  };
})

/**
* factory for chat, allows us to send and get messages
*/

.factory('Chat', function($http, $window) {

  var sendMessage = function(message) {
    console.log(message);
    return $http({
      method: 'POST',
      url: '/chat',
			headers: { Authorization: 'Bearer ' + $window.sessionStorage.token },
      data: message
    });
  };

  var getMessages = function() {
    return $http({
      method: 'GET',
      url: '/chat',
      headers: { Authorization: 'Bearer ' + $window.sessionStorage.token }
    })
    .then(function(res) {
      return res.data;
    });
  };

  return {
    sendMessage: sendMessage,
    getMessages: getMessages
  };
});