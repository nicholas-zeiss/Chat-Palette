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
  $scope.color = '';
  $scope.clearAll = '';

  /**
  * Use Chat factory getMessages() and sendMessage() functions to handle server response messages
  */

  $scope.getMessages = function() {
    Chat.getMessages()
      .then(function(message) {
        $scope.messagU = message;
      })
      .catch(function(error) {
        console.error('Hurry up Alexius I\'m dying');
      });
  };

  /**
  * Sends a post request with message data then loads up messages again
  */

  $scope.sendMessage = function(userInfo, msgInfo, colorChoice) {
    $scope.loading = true;
    $scope.messageObj.content = msgInfo;
    $scope.messageObj.username = userInfo;
    $scope.messageObj.color = colorChoice;
    console.log('asdf', $scope.messageObj);
    Chat.sendMessage($scope.messageObj)
      .then(function() {
        console.log('succesful post');
        $scope.loading = false;
        $location.path('/chat');
        console.log('this is reached');
        Chat.getMessages()
          .then(function(message) {
            $scope.messagU = message;
          })
          .catch(function(error) {
            console.error('Hurry up Alexius I\'m dying');
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  /**
  * Filters all the messages based on color property and button clicked
  */
  
  $scope.allFilter = function() {
    $scope.color = '';
  };

  $scope.redFilter = function() {
    $scope.color = 'red';
  };

  $scope.blueFilter = function() {
    $scope.color = 'blue';
  };

  $scope.greenFilter = function() {
    $scope.color = 'green';
  };
  
  $scope.yellowFilter = function() {
    $scope.color = 'yellow';
  };

  $scope.clearSearch = function() {
    $scope.searchAll = null;
  };
});