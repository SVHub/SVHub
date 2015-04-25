'use strict';

/**
 * @ngdoc function
 * @name svhubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svhubApp
 */
angular.module('svhubApp')
  .controller('SignupCtrl', function ($scope, $routeParams) {
    $scope.then = '/home';
    console.log($routeParams);
    if ($routeParams.hasOwnProperty('then')) {
      $scope.then = $routeParams.then;
    }
  });
