angular.module('app.services', [])

.factory('Auth', function($http, $location, $window) {

  var login = function(user) {
    return $http({
      method: 'POST',
      url: 'https://polar-springs-84938.herokuapp.com/login',
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
      url: 'https://polar-springs-84938.herokuapp.com/signup',
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
    $location.path('https://polar-springs-84938.herokuapp.com/login');
  };

  return {
    login: login,
    signUp: signUp,
    signOut: signOut
  };
})

.factory('Chat', function($http) {

  var sendMessage = function(message) {
    return $http({
      method: 'POST',
      url: 'https://polar-springs-84938.herokuapp.com/chat',
      data: message
    });
  };

  var getMessages = function() {
    return $http({
      method: 'GET',
      url: 'https://polar-springs-84938.herokuapp.com/chat'
    });
  };

  return {
    sendMessage: sendMessage,
    getMessages: getMessages
  };
});