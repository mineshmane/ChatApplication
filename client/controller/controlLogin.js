

chatApp.controller('controlLogin', function ($scope) {
    $scope.login = function () {
        var data = {
            'email': $scope.email,
            'password': $scope.password
        }
        console.log("data", data)

       // serviceLogin.login(data, $scope);

    }
});