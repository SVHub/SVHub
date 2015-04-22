'use strict';
angular.module('svhubApp').service('User', function ($rootScope, $http, $cookies) {

  var userService = this;

  this.current = {};
  
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
        // Hooray! Let them use the app now.
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };

  this.fbLogin = function () {
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          console.log("User signed up and logged in through Facebook!", user);
        } else {
          console.log("User logged in through Facebook!", user);
        }
        userService.current = user;
      },
      error: function(user, error) {
        console.log("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  };


});