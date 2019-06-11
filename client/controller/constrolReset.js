chatApp.controller('controlReset', function ($scope, serviceResetPassword, $stateParams) {
     console.log("ctrl reset in controlller pswd", $stateParams.token)
  //  var token = $stateParams.token;
    $scope.resetPassword = function () {
        

        var user = {
            'password': $scope.password,
            'rpassword': $scope.rpassword,
          
        }
        var token = {
            'token': $stateParams.token
        }
        console.log("register calling", user);
        serviceResetPassword.resetPassword(user, token, $scope);
    }

});
