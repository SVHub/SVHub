'use strict';

/**
 * @ngdoc function
 * @name svhubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svhubApp
 */
angular.module('svhubApp')
  .controller('NewConferenceCtrl', function ($scope) {

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

      var Conference = Parse.Object.extend("Conference");
      var newConf = new Conference();

      newConf.set("conf_name", $scope.conference.name);
      newConf.set("conf_start", $scope.conference.start);
      newConf.set("conf_end", $scope.conference.end);

      newConf.save(null, {
       success: function(conference) {
         // Execute any logic that should take place after the object is saved.
         alert('New object created with objectId: ' + conference.id);
       },
       error: function(conference, error) {
         // Execute any logic that should take place if the save fails.
         // error is a Parse.Error with an error code and message.
         alert('Failed to create new object, with error code: ' + error.message);
       }
      });
    };

    // var listScope = $scope;
    // $scope.conferences = [];
    // // Parse

    // var conferences = Parse.Object.extend("Conference");

    // var query = new Parse.Query(conferences);
    // query.find({
    //   success: function(conferences) {
    //     console.log('got conferences from sever', conferences);
    //     console.log(conferences[0].get('conf_name'));
    //     $scope.$apply(function() {
    //       $scope.conferences = conferences;
    //     });
    //   },
    //   error: function(object, error) {
    //     // The object was not retrieved successfully.
    //     // error is a Parse.Error with an error code and message.
    //     console.error('did not get conferences from sever');
    //   }
    // });

  });
