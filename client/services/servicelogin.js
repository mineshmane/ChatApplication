
chatApp.service('serviceLogin', function ($http, $location) {
    this.login = function (data, $scope) {
        console.log(" login client service called");
        
        console.log("data on service register---", data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: data,
        }).then(
            function successCallback(response) {
                console.log("login successful at servicelogin in client side");
                console.log('response', response)
                console.log('response1', response.data.message._id)
                $scope.message = "loginsuccess successful";
                $location.path('/forget');

            },
            function errorCallback(response) {
                console.log("Login unsuccessful please check your username and password");
                console.log(response);
                $scope.loginMessage = "EmailId or Password Incorrect";
            }
        );
    }
});
