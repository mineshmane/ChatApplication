
chatApp.service('serviceForgotPassword', function ($http, $location) {
    this.forgotPassword = function (data, $scope) {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/forget',
            data: data,
        }).then(
            function successCallback(response) {
                alert(" check your registaerd mail to reset password");
                console.log("please check your email addresss for reset passpassword", response);
                // var userid=response.data.message[0]._id ;
                // var name=response.datamessage[0].firstName;
                //  var token=response.data.token;
                // localStorage.setItem("userid",userid);
                // localStorage.setItem("name",name);
                // localStorage.setItem("token",token);   
                // $scope.loginMessage="login Successful"  ;  
                $location.path('/mess');

            },
            function errorCallback(response) {
                console.log("Email  sending unsuccessful");
                console.log(response);
                $scope.loginMessage = "EmailId Incorrect";
                alert(" emial address invalid")
            }
        );
    }
});

