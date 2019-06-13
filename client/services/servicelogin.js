
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
                console.log('response1', response.data.message)


                var userid = response.data.message._id;
                var name = response.data.message.firstname;
                var token = response.data.token;
                console.log("15 ls", userid);
                localStorage.setItem("userid", userid);
                localStorage.setItem("name", name);
                localStorage.setItem("token", token);
                $scope.message = "login success successful";
                $location.path('/chat');

            },
            function errorCallback(error) {
                console.log("Login unsuccessful please check your username and password");
                console.log(error);
                $scope.errorMessage = "EmailId or Password Incorrect";
                alert("incorrect email or password")
                $location.path('/login');
            }
        );
    }
});
