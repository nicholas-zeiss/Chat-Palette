/**
 *   Authorization controller for login and sign up
 */ 
 

function AuthController($window, $location, serverCalls) {
  let vm = this;

  vm.login = () => {
    console.log('logging in')
    serverCalls.login(vm.user)
      .then(res => {
        $window.sessionStorage.setItem('token', res.token);
        $location.path('/chat');
      })
      .catch(err => {
        $window.sessionStorage.removeItem('token');
        console.error(err);
      });
  };


  // signUp() - executes upon submission of the signUp form
  vm.signUp = () => {
    serverCalls.signUp(vm.user)
      .then(res => {
        $window.sessionStorage.setItem('token', res.token);
        $location.path('/chat');
      })
      .catch(err => {
        $window.sessionStorage.removeItem('token');
        console.log(err);
      });
  };
}


export default AuthController;

