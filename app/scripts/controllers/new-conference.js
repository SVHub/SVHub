'use strict';

/**
 * @ngdoc function
 * @name svhubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svhubApp
 */
angular.module('svhubApp')
  .controller('NewConferenceCtrl', function ($scope, Conference, $location) {

    $scope.conference = {};

    $scope.openStart = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.startOpened = true;
    };

    $scope.openEnd = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.endOpened = true;
    };

    $scope.submit = function () {
      console.log('new conference', $scope.conference);
      Conference.addConference($scope.conference)
        .then(function (conference) {
          // $scope.$apply(function () {
            $location.path('/conference/' + conference.id + '/admin');
          // });
        });
      
    };

  });
