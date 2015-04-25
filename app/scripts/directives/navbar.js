angular.module('svhubApp').directive('navbar', function(User) {
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
    }
  };
});