// Chat controller for main chat room

angular.module('app.chat', [])

.controller('ChatController', function ($scope, $window, $location, Chat) {
  $scope.messagU = {};
  $scope.messageObj = {
    username: 'username',
    content: 'content',
    color: 'color'
  };

  $scope.getMessages = function() {
    Chat.getMessages()
      .then(function(message) {
        $scope.messagU = message;
        console.log($scope.messagU);
      })
      .catch(function (error) {
        console.error('Hurry up Alexius I\'m dying');
      });
  };

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

