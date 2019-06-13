
var chatApp = angular.module('chatApp', ['ui.router', 'btford.socket-io']);
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

        .state('reset', {
            url: '/reset/:token',
            templateUrl: 'templates/resetPassword.html',
            controller: 'controlReset'
        })



        .state('chat', {
            url: '/chat',
            templateUrl: 'templates/newdash.html',
            controller: 'controlChat'
        })

        .state('mess', {
            url: '/message',
            templateUrl: 'templates/message.html',
         
        })




    $urlRouterProvider.otherwise('/login');

});

chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    console.log(" chat connected");
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
    });
    
}]);































// chatApp.config(['$qProvider', function ($qProvider) {
//     $qProvider.errorOnUnhandledRejections(false);
// }]);