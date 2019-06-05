var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/register',
            templateUrl: '../Templates/Register.html',
            controller: 'controlRegister'

        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('login', {
            // we'll get to this in a bit   
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'controlLogin'
        });

});





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