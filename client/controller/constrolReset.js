


chatApp.controller('controlReset',function($scope,serviceResetPassword){
    console.log("ctrl reset pswd")
    $scope.resetPassword=function(){
        var user ={
            'password':$scope.password,
            'rpassword': $scope.rpassword
        }
        console.log("register calling",user);
        serviceResetPassword.resetPassword(user,$scope);
    }
    
});
