/**
 *   Chat controller for main chat room
 */

angular.module('app.chat', [])

.controller('ChatController', function ($scope, $window, $location, Chat) {

  // Chat.getMessages();
  $scope.messagU = {};
  $scope.messageObj = {
    username: 'username',
    content: 'content',
    color: 'color'
  };

  /**
   *  Use Chat factory getMessages() and sendMessage() functions to handle server response messages
   */
  $scope.color = '';
  // $scope.buttons = ['Red', 'Blue', 'Green', 'Yellow'];

  /**
  * Use Chat factory getMessages() and sendMessage() functions to handle server response messages
  */

  $scope.getMessages = function() {
    Chat.getMessages()
      .then(function(messages) {
        $scope.messagU = messages;
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  /**
<<<<<<< HEAD
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
        $scope.getMessages();
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
    $scope.getMessages();
  };
  $scope.redFilter = function() {
    $scope.color = 'red';
    $scope.getMessages();
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
});
