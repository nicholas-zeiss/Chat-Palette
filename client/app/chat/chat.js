// Chat controller for main chat room

angular.module('app.chat', [])

.controller('ChatController', function ($scope, $window, $location, Chat) {

  $scope.sendMessage = function() {
    Chat.sendMessage(/*message*/)
      .then(function() {
        //reload page
      })
      .catch(function (error) {
        console.error('Hurry up Alexius I\'m dying');
      });
  };

  // Maybe we don't need this function because we can just use ng-filter
  
  // $scope.filter = function() {
  //   Chat.filter();
  // };

});

