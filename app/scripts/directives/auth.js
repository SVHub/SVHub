angular.module('svhubApp').directive('auth', function() {
  return {
    restrict: 'E',
    scope: { 
      formType: '='
    },
    // transclude: true,
    replace: true,
    templateUrl: 'views/directives/auth.html',
    link: function (scope, iElement, iAttrs, controller) {
      console.log(scope.kind);
      console.log(scope, iElement, iAttrs, controller);
      // scope.panelTitle = iAttrs.panelTitle;

      scope.fullname = '';
      scope.email = '';
      scope.pw = '';
      scope.pwconfirm = '';

      scope.auth = function () {
        if (scope.type === 'login') {
          scope.login();
        } else {
          scope.register();
        }
      };

      scope.register = function () {
        User.register({
          fullname: scope.fullname,
          email: scope.email,
          pw: scope.pw
        });
      };

      scope.login = function () {
        User.login({
          email: scope.email,
          pw: scope.pw
        });
      };

      scope.fbLogin = function () {
        User.fbLogin();
      };
    }
  };
});