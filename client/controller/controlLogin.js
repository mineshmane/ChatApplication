

chatApp.controller('controlLogin', function ($scope,$location) {

    console.log(" login called ");
    
    $scope.login = function () {
        var data = {
            'email': $scope.email,
            'password': $scope.password
        }
        console.log("data", data)

       // serviceLogin.login(data, $scope);

    }
    $scope.register=function () {
        console.log('in register m');
        
        $location.path('/register')
    }
});