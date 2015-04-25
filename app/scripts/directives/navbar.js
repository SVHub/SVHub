angular.module('svhubApp').directive('navbar', function(User, $rootScope) {
  return {
    restrict: 'E',
    scope: { 
      // formType: '='
    },
    // transclude: true,
    replace: true,
    templateUrl: 'views/directives/navbar.html',
    link: function (scope, iElement, iAttrs, controller) {
      scope.userService = User;
      User.getConferences().then(function (conferenceEnrollments) {
        scope.conferenceEnrollments = conferenceEnrollments;
      });

      $rootScope.$on('enrolled', function (evt, enrollments) {
        scope.conferenceEnrollments = enrollments;
      });
    }
  };
});