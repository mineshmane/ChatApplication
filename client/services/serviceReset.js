chatApp.service('serviceResetPassword',function($http,$location){

    
    this.resetPassword=function(data,headers,$scope){
    console.log(" service register reset",data);

    console.log(" headers tonen:::",headers.token);
    $http({
    method:'POST',
    url:'http://localhost:3000/reset',
    data:data,
    headers:{
        token : headers.token
    }
    }).then(

    function successCallback(response){
    console.log("reset password successful");
    console.log(response);
    $scope.message="password reset successful";
    $location.path('/login');
    },
    function errorCallback(response){
    console.log("reset password unsuccessful");
    $scope.message=response.data.message;
    }
    )
    }
    });