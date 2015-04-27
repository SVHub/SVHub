'use strict';

angular.module('svhubApp')
  .controller('EnrollmentCtrl', function ($scope, $routeParams, Conference, User) {
    User.getEnrollment($routeParams.id).then(function (enrollment) {
      console.log(enrollment);
      console.log(enrollment.get('status').get('name'));
      $scope.enrollment = enrollment;
    });

    Conference.getConference($routeParams.id).then(function (conferenceResults) {
      $scope.conference = conferenceResults[0];
    });

    // $scope.submit = function () {
    $scope.setEnrollment = function (enrolling) {
      if (enrolling) {
        console.log('enroll in conference:', $scope.conference, User.current);
        if ($scope.enrollment) {
          Conference.reEnroll($scope.enrollment).then(function (reenrollment) {
            $scope.enrollment = reenrollment;
          });
        } else {
          Conference.enroll($scope.conference, User.current).then(function () {
            console.log('then for enrolling');
            User.getEnrollment($routeParams.id).then(function (enrollment) {
              $scope.enrollment = enrollment;
            });
          });
        }
      } else {
        Conference.unenroll($scope.enrollment).then(function () {
          console.log('then for unenrolling');
          User.getEnrollment($routeParams.id).then(function (enrollment) {
            $scope.enrollment = enrollment;
          });
        });
      }
    };
  });
