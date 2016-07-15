/**
 *   Chat controller for main chat room
 */

angular.module('app.chat', [])

.controller('ChatController', function ($scope, $window, $location, Chat) {
  $scope.messagU = {};
  $scope.messageObj = {
    username: 'username',
    content: 'content',
    color: 'color'
  };

  /**
   *  Use Chat factory getMessages() and sendMessage() functions to handle server response messages
   */

  $scope.getMessages = function() {
    Chat.getMessages()
      .then(function(message) {
        $scope.messagU = message;
        console.log($scope.messagU);
      })
      .catch(function(error) {
        console.error('Hurry up Alexius I\'m dying');
      });
  };

  /**
   *   Sends a post request with message data then loads up messages again
   */

  $scope.sendMessage = function(userInfo, msgInfo, colorChoice) {
    $scope.loading = true;
    $scope.messageObj.content = msgInfo;
    $scope.messageObj.username = userInfo;
    $scope.messageObj.color = colorChoice;
    console.log($scope.messageObj);
    Chat.sendMessage($scope.messageObj)
      .then(function() {
        $scope.loading = false;
        $location.path('/chat');
        $scope.getMessages();
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});

