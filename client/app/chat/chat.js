// Chat controller for main chat room

angular.module('app.chat', [])

.controller('ChatController', function ($scope, $window, $location, Chat) {
  $scope.message = {};

  $scope.sendMessage = function() {
    $scope.loading = true;
    Chat.sendMessage($scope.message)
      .then(function() {
        $scope.loading = false;
        $location.path('/chat');
      })
      .catch(function (error) {
        console.error('Hurry up Alexius I\'m dying');
      });
  };

  $scope.getMessage = function() {
    Chat.getMessage()
      .then(function(message) {
        $scope.message.message = message;
      })
      .catch(function (error) {
        console.error('Hurry up Alexius I\'m dying');
      });
  };
  $scope.getMessage();
});

