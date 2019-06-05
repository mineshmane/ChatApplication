var chatApp = angular.module('chatApp', ['ui.router']);

chatApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

        $stateProvider.state('home',{
            url:'/home',
            templateUrl: './Templates/Register.html',
            controller:'controlRegister'
        })
        $stateProvider.state('login',{
            url:'/login',
            templateUrl:'Templates/login.html',
            controller:'controlLogin'
        })
        // $stateProvider.state('forget',{
        //     url:'/forget',
        //     templateUrl:'Templates/ForgotPassword.html',
        //     controller:'controlForgotPassword'
        // })
    
        // $stateProvider.state('reset',{
        //     url:'/reset/:token',
        //     templateUrl:'Templates/resetPassword.html',
        //     controller:'controlReset'
        // })
});







 // $stateProvider
    //     // HOME STATES AND NESTED VIEWS ========================================
    //     .state('home', {
    //         url: '/register',
    //         templateUrl: '../Templates/Register.html',
    //         controller: 'controlRegister'
    //     })
    //     // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    //     .state('login', {
    //         // we'll get to this in a bit   
    //         url: '/login',
    //         templateUrl: 'Templates/login.html',
    //         controller: 'controlLogin'
    //     });



// var app=angular.module('chatApp',['ui.router']);
// app.config(function($stateProvider,$urlRouterProvider){
//     $stateProvider.state('Register',{
//         url:'/register',
//         templateUrl:'templates/registration.html',
//         controller:'controlRegister'
//     })
//     $stateProvider.state('login',{
//         url:'/login',
//         templateUrl:'templates/login.html',
//         controller:'controlLogin'
//     })
//     $stateProvider.state('forget',{
//         url:'/forget',
//         templateUrl:'templates/forgotPassword.html',
//         controller:'controlForgotPassword'
//     })

//     $stateProvider.state('reset',{
//         url:'/reset/:token',
//         templateUrl:'templates/resetPassword.html',
//         controller:'controlReset'
//     })

// $urlRouterProvider.otherwise('/login');

// });