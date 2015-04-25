'use strict';
angular.module('svhubApp').service('Conference', function ($rootScope, $http, $cookies, $q) {

  var conferenceService = this;

  this.current = {};
  this.all = [];

  var conferences = Parse.Object.extend("Conference");

  function fetchConferences () {
    var deferred = $q.defer();
    var query = new Parse.Query(conferences);
    query.find({
      success: function(conferences) {
        console.log('got conferences from sever', conferences);
        console.log(conferences[0]);
        deferred.resolve(conferences);
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        var errorMessage = 'did not get conferences from sever';
        console.error(errorMessage);
        deferred.reject(errorMessage)
      }
    });
    return deferred.promise;
  }

  this.getConferences = function() {
    var deferred = $q.defer();

    if (this.all.length === 0) {
      fetchConferences()
        .then(function (conferences) {
          conferenceService.all = conferences;
          deferred.resolve(conferenceService.all);
        });
    } else {
      deferred.resolve(conferenceService.all);
    }
    return deferred.promise;
  };

  this.getConference = function(id) {
    var deferred = $q.defer();
    this.getConferences().then(function (conferences) {
      deferred.resolve(conferences.filter(function (conference) {
        return conference.id == id;
      }));
    });
    return deferred.promise;
  };

  function getAdminRole () {
    var deferred = $q.defer();
    var Role = Parse.Object.extend("_Role");
    // var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(Role);
    query.equalTo("name", "admin");
    query.find({
      success: function(results) {
        // alert("Successfully retrieved " + results.length + " scores.");
        // // Do something with the returned Parse.Object values
        // for (var i = 0; i < results.length; i++) { 
        //   var object = results[i];
        //   alert(object.id + ' - ' + object.get('playerName'));
        // }
        if (results.length > 0) {
          console.log('success getting admin role', results);
          deferred.resolve(results[0]);
        } else {
          console.error('no such admin roles', results);
          deferred.reject('cannot find admin role');
        }
      },
      error: function(error) {
        console.error('error getting admin role');
        deferred.reject('cannot find admin role');
        // alert("Error: " + error.code + " " + error.message);
      }
    });
    return deferred.promise;
  }

  this.addConference = function (conference) {
    var deferred = $q.defer();
    var Conference = Parse.Object.extend("Conference");
    var Enrollment = Parse.Object.extend("Enrollment");
    
    var newConf = new Conference();

    newConf.set("conf_name", conference.name);
    newConf.set("conf_start", conference.start);
    newConf.set("conf_end", conference.end);
    newConf.set("conf_img_url", conference.url);
    newConf.set("conf_year", parseInt(conference.year));

    return getAdminRole()
      .then(function (adminRole) {
        newConf.save(null, {
         success: function(conference) {
          console.log('saved conf');
           // Execute any logic that should take place after the object is saved.
           // alert('New object created with objectId: ' + conference.id);
           var newEnrollment = new Enrollment();
           newEnrollment.set('conference', conference);
           newEnrollment.set('user', Parse.User.current());
           newEnrollment.set('role', adminRole);
           newEnrollment.save(null, {
            success: function (newEnrollment) {
              console.log('saved newEnrollment');
              deferred.resolve(conference);
            },
            error: function (newEnrollment, error) {
              console.error('error saving newEnrollment', error);
              deferred.reject(error);
            }
           });
         },
         error: function(conference, error) {
          console.error('error saving conf', error);
           // Execute any logic that should take place if the save fails.
           // error is a Parse.Error with an error code and message.
           // alert('Failed to create new object, with error code: ' + error.message);
           deferred.reject(error);
         }
        });      
        return deferred.promise;
      });
    // .then(function () {

    // });
  };

  this.updateConference = function (newConferenceValues, staleConf) {
    var deferred = $q.defer();
    staleConf.set("conf_name", newConferenceValues.name);
    staleConf.set("conf_start", newConferenceValues.start);
    staleConf.set("conf_end", newConferenceValues.end);
    staleConf.set("conf_img_url", newConferenceValues.url);
    staleConf.set("conf_year", parseInt(newConferenceValues.year));
    staleConf.set("conf_number_of_volunteers", newConferenceValues.svCount);
    staleConf.set("conf_svcontract", newConferenceValues.svContract);
    staleConf.save(null, {
      success: function (updatedConf) {
        console.log('saved updatedConf');
        deferred.resolve(updatedConf);
      },
      error: function (updatedConf, error) {
        console.error('error saving updatedConf', error);
        deferred.reject(error);
      }
     });
    return deferred.promise;
  };

  this.enroll = function (conference) {
    var Enrollment = Parse.Object.extend("Enrollment");
    var e = new Enrollment();
    e.set('user', Parse.User.current());
    e.set('conference', conference);
    e.save(null, {
      success: function (enrollment) {
        console.log('success enrolling')
        var enrollmentsQuery = new Parse.Query(Enrollment);
        enrollmentsQuery.equalTo('user', Parse.User.current());
        enrollmentsQuery.include('role');
        enrollmentsQuery.include('user');
        enrollmentsQuery.include('conference');
        // enrollmentsQuery.include('user');
        enrollmentsQuery.find({
          success: function(enrollments) {
            console.log('got enrollments from sever', enrollments);
            console.log(enrollments[0]);
            $rootScope.$emit('enrolled', enrollments);
            // deferred.resolve(enrollments);
          },
          error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            var errorMessage = 'did not get enrollments from sever';
            console.error(errorMessage);
            // deferred.reject(errorMessage)
          }
        });
      },
      error: function (enrollment, error) {
        console.error('error enrolling, please try again');
      }
    });
  };

});