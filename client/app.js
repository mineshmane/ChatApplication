
var chatApp = angular.module('chatApp', ['ui.router']);
chatApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: 'templates/registration.html',
            controller: 'controlRegister'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'controlLogin'
        })
        .state('forget', {
            url: '/forget',
            templateUrl: 'templates/forgotPassword.html',
            controller: 'controlForgotPassword'
        })

        // .state('reset', {
        //     url: '/reset/:token',
        //     templateUrl: 'templates/resetPassword.html',
        //     controller: 'controlReset'
        // })

    $urlRouterProvider.otherwise('/login');

});