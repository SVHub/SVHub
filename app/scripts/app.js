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
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
