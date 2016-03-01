'use strict';

// Declare app level module which depends on views, and components
angular.module('glNewsApp', [
    'ngRoute', 'ngDraggable','dndLists','ngAnimate', 'ui.bootstrap'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'veiws/login.html',
                controller: 'loginController'
            })
            .when('/login', {
                templateUrl: 'veiws/login.html',
                controller: 'loginController'
            })
            .when('/dashboard', {
                templateUrl: 'veiws/dashboard.html',
                controller: 'dashboardController'
            })
            .otherwise({redirectTo: '/'});
    }]);
