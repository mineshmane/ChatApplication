
// chatApp.controller('controlResetPassword', function ($scope) {
//     console.log("ctrl forget pswd")
//     $scope.resetPassword = function () {
//         var user = {
//             'password': $scope.password,
//             'rpassword': $scope.rpassword
//         }
//         console.log("reset password ", user);
//         // serviceForgotPassword.forgotPassword(user, $scope);

//     }
// });

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
