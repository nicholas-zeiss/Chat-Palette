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
    .then(function(resp) {
      return resp.data;
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
    .then(function(resp){
      return resp.data;
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
* factory for 
*/

.factory('Chat', function($http) {

  var sendMessage = function(message) {
    return $http({
      method: 'POST',
      url: '/chat',
      data: message
    });
  };

  var getMessages = function() {
    return $http({
      method: 'GET',
      url: '/chat'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {
    sendMessage: sendMessage,
    getMessages: getMessages
  };
});