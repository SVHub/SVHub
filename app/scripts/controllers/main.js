'use strict';

/**
 * @ngdoc function
 * @name svhubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svhubApp
 */
angular.module('svhubApp')
  .controller('MainCtrl', function ($scope, Conference) {
    $scope.conferences = [];
    Conference.getConferences().then(function (conferences) {
        $scope.conferences = conferences;
    });
  });
