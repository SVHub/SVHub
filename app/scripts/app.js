'use strict';

/**
 * @ngdoc overview
 * @name svhubApp
 * @description
 * # svhubApp
 *
 * Main module of the application.
 */
angular
  .module('svhubApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'textAngular'
  ])
  .config(function ($routeProvider, $provide) {
    Parse.initialize("UfPEiaABWyAhkthWHZgEuXWIJan06UqV1B8zFXxV", "N0rlSL6NYn5zH2pf0ANECGM1KQSciZZImxaVqSYE");

    $provide.decorator('taOptions', ['$delegate', function(taOptions) {
      // taOptions.toolbar = [
      //   // ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
      //   // ['insertLink', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'html'],
      //   // ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
      //   //['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
      // ];
      return taOptions;
    }]);

    function requireAuthentication (then) {
      return {
        load: function ($q, $location) {
          console.log('Can user access route?');
          var deferred = $q.defer();
          // deferred.resolve();
           // deferred.promise;
          if (Parse.User.current()) { // fire $routeChangeSuccess
            console.log('Yes they can!', Parse.User.current().get('fullname'));
            deferred.resolve();
            return deferred.promise;
          } else { // fire $routeChangeError
            console.log('No they cant!');
            console.log('redirect to /login'+then)
            $location.path('/login'+then);

            // I don't think this is still necessary:
            // return $q.reject("'/login'");
          }
        }
      };
    }

    $routeProvider
      .when('/', {
        // templateUrl: 'views/main.html',
        templateUrl: 'views/list.html',
        controller: 'MainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'SignupCtrl'
      })
      .when('/login/:then', {
        templateUrl: 'views/login.html',
        controller: 'SignupCtrl'
      })
      .when('/newconference', {
        templateUrl: 'views/new-conference.html',
        controller: 'NewConferenceCtrl',
        resolve: requireAuthentication('/newconference')
      })
      .when('/conference/:id/enroll', {
        templateUrl: 'views/enroll.html',
        controller: 'EnrollmentCtrl',
        resolve: requireAuthentication()
      })
      // .when('/conference/:id/', { //conference home for ... everyone? regular svs?
      // })
      .when('/conference/:id/admin', {
        templateUrl: 'views/conference-admin.html',
        controller: 'ConferenceAdminCtrl',
        resolve: requireAuthentication() //TODO: should also require they have admin for this conf
      })
      .otherwise({
        redirectTo: '/'
      });
  });
