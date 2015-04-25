'use strict';

/**
 * @ngdoc function
 * @name svhubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svhubApp
 */
angular.module('svhubApp')
  .controller('ConferenceAdminCtrl', function ($scope, Conference, $location, $routeParams, decodeFilter) {
    // $scope
    console.log($routeParams.id);
    $scope.pendingConference = {};
    Conference.getConference($routeParams.id)
      .then(function (conferenceResults) {
        // console.log(conferenceResults[0]);
        // console.log(conferenceResults[0].get('conf_name'));
        $scope.conference = conferenceResults[0];
        $scope.pendingConference.name = $scope.conference.get('conf_name');
        $scope.pendingConference.year = $scope.conference.get('conf_year');
        $scope.pendingConference.start = $scope.conference.get('conf_start');
        $scope.pendingConference.end = $scope.conference.get('conf_end');
        $scope.pendingConference.svContract = $scope.conference.get('conf_svcontract');
        $scope.pendingConference.svCount = $scope.conference.get('conf_number_of_volunteers');
        $scope.pendingConference.url = window.decodeURIComponent($scope.conference.get('conf_img_url'));
        // console.log($scope.conference.get('conf_name'));
      });

    $scope.update = function () {
      console.log('updateConference');
      Conference.updateConference($scope.pendingConference, $scope.conference);
    };
  });
