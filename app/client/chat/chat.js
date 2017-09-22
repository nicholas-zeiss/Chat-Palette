/**
 *   Chat controller for main chat room
 */


function ChatController($window, $location, serverCalls) {
  let vm = this;

  vm.messages = [];
  vm.message = {};
  vm.color = '';

  serverCalls.getMessages()
    .then(function(message) {
      vm.messages = message;
    })
    .catch(function(error) {
      if (error.status == 401) {
        $window.sessionStorage.removeItem('token');
      }

      console.error(error);
    });


  /**
  * Sends a post request with message data then loads up messages again
  */

  vm.sendMessage = function() {
    serverCalls.sendMessage(vm.message)
      .then(function() {
        console.log('succesful post');
        console.log('this is reached');
        vm.messages.push(vm.message);
        vm.message = {};
      })
      .catch(function (error) {
        if (error.status == 401) {
          $window.sessionStorage.removeItem('token');
        }

        console.error(error);
      });
  };

  /**
  * Filters all the messages based on color property and button clicked
  */
  
  vm.allFilter = function() {
    vm.color = '';
  };

  vm.redFilter = function() {
    vm.color = 'red';
  };

  vm.blueFilter = function() {
    vm.color = 'blue';
  };

  vm.greenFilter = function() {
    vm.color = 'green';
  };
  
  vm.yellowFilter = function() {
    vm.color = 'yellow';
  };

  vm.clearSearch = function() {
    vm.searchAll = null;
  };
}


export default ChatController;

