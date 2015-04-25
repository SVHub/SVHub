'use strict';

/**
 * @ngdoc function
 * @name svhubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svhubApp
 */
angular.module('svhubApp')
  .controller('EnrollmentCtrl', function ($scope, $routeParams, Conference, User) {
    Conference.getConference($routeParams.id).then(function (conferenceResults) {
      $scope.conference = conferenceResults[0];
    });

    $scope.submit = function () {
      console.log('enroll in conference:', $scope.conference, User.current);
      Conference.enroll($scope.conference, User.current);
    };
  });
