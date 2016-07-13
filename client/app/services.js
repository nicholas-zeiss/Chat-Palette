angular.module('app.services', [])

.factory('Auth', function($http, $location, $window) {

  var login = function(user) {
    return $http({
      method: 'POST',
      url: '/localhost:8080',
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
      url: '/localhost:8080',
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

.factory('Chat', function($http) {

  var sendMessage = function(message) {
    return $http({
      method: 'POST',
      url: '/localhost:9001/chat',
      data: message
    });
  };

  // var filter = function() {
  //   filter messages by color
  // };

  return {
    sendMessage: sendMessage
  };
});