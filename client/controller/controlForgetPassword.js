
chatApp.controller('controlForgotPassword', function ($scope ,serviceForgotPassword) {
    console.log("ctrl forget pswd")
    $scope.forgotPassword = function () {
        var user = {
            'email': $scope.email
        }
        console.log("forget password ", user);
         serviceForgotPassword.forgotPassword(user, $scope);

    }
});