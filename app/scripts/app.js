'use strict';

/**
 * @ngdoc overview
 * @name svhubApp
 * @description
 * # svhubApp
 *
 * Main module of the application.
 */
angular
  .module('svhubApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    Parse.initialize("UfPEiaABWyAhkthWHZgEuXWIJan06UqV1B8zFXxV", "N0rlSL6NYn5zH2pf0ANECGM1KQSciZZImxaVqSYE");

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
