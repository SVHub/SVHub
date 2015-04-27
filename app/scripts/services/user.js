'use strict';
angular.module('svhubApp').service('User', function ($rootScope, $http, $cookies, $location, $q) {

  var userService = this;

  this.current = {};
  // this.current
  this.enrollments = [];

  if (Parse.User.current()) {
    this.current = Parse.User.current();
  }

  this.register = function (options) {
    var user = new Parse.User();
    user.set("username", options.email);
    user.set("fullname", options.fullname);
    user.set("password", options.pw);
    user.set("email", options.email);
    console.log('register user:', user);
     
    // other fields can be set just like with Parse.Object
    // user.set("phone", "415-392-0202");
     
    user.signUp(null, {
      success: function(user) {
        console.log('BOO-YOW!', user);
        userService.current = user;
        $rootScope.$apply(function() {
          console.log('redirecting to', options.then);
          $location.path(options.then);
        });
        // Hooray! Let them use the app now.
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        console.error("Error: " + error.code + " " + error.message);
      }
    });
  };

  this.login = function (userInfo) {
    console.log('login', userInfo);
    Parse.User.logIn(userInfo.email, userInfo.pw, {
      success: function(user) {
        // Do stuff after successful login.
        console.log('GREAT success!', user);
        userService.current = user;
        $rootScope.$apply(function() {
          console.log('redirecting to', userInfo.then);
          $location.path(userInfo.then);
        });
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.error('loginerror', user, error);
      }
    });
  };

  $rootScope.$on('enrolled', function (evt, enrollments) {
    console.log("$on enrolled", enrollments);
    userService.enrollments = enrollments;
  });

  this.getConferences = function () {
    var deferred = $q.defer();
    if (this.enrollments.length > 0) {
      deferred.resolve(this.enrollments);
    } else {
      var enrollmentQuery = new Parse.Query("Enrollment");
      enrollmentQuery.equalTo('user', Parse.User.current());
      enrollmentQuery.include('role');
      enrollmentQuery.include('user');
      enrollmentQuery.include('conference');
      enrollmentQuery.include('status');
      enrollmentQuery.find({
        success: function(enrollments) {
          console.log('got enrollments from sever for user', enrollments);
          userService.enrollments = enrollments;
          if (enrollments.length > 0) {
            userService.selectEnrollment(0);
          }
          deferred.resolve(enrollments);
        },
        error: function(object, error) {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
          var errorMessage = 'did not get enrollments from sever for user';
          console.error(errorMessage);
          deferred.reject(errorMessage)
        }
      });
    }
    return deferred.promise;
  };

  this.getEnrollment = function (nameyear) {
    var deferred = $q.defer();
    this.getConferences().then(function (enrollments) {
      var theEnrollment = enrollments.filter(function (enrollment) {
        console.log(nameyear);
        console.log(enrollment.get('conference').get('conf_name')+enrollment.get('conference').get('conf_year'));
        return enrollment.get('conference').get('conf_name')+enrollment.get('conference').get('conf_year') === nameyear;
      });
      if (theEnrollment.length > 0) {
        deferred.resolve(theEnrollment[0]);
      } else {
        deferred.reject('no matching enrollments');
      }
    });
    return deferred.promise;
  };

  this.fbLogin = function (options) {
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          console.log("User signed up and logged in through Facebook!", user);
        } else {
          console.log("User logged in through Facebook!", user);
        }
        userService.current = user;
        $rootScope.$apply(function() {
          console.log('redirecting to', options.then);
          $location.path(options.then);
        });
      },
      error: function(user, error) {
        console.log("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  };

  this.selectEnrollment = function (idx) {
    console.log('selectedEnrollment');
    console.log(this.enrollments.length, this.enrollments[idx].get('conference').get('conf_name'), this.enrollments[idx].get('conference').get('conf_year'));
    this.selectedEnrollment = this.enrollments[idx];
  };

  this.logout = function () {
    Parse.User.logOut();
  };

  this.loggedIn = function () {
    if (Parse.User.current()) {
      return true;
    }
    return false;
  };

});