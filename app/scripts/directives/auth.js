angular.module('svhubApp').directive('auth', function(User) {
  return {
    restrict: 'E',
    scope: { 
      formType: '=',
      then: '='
    },
    // transclude: true,
    replace: true,
    templateUrl: 'views/directives/auth.html',
    link: function (scope, iElement, iAttrs, controller) {
      console.log(scope.then);
      console.log(scope, iElement, iAttrs, controller);
      // scope.panelTitle = iAttrs.panelTitle;

      scope.userInfo = {
        fullname: '',
        email: '',
        pw: '',
        pwconfirm: '',
      };

      scope.auth = function (then) {
        console.log('then', then);
        if (scope.formType === 'login') {
          scope.login(then);
        } else {
          scope.register(then);
        }
      };

      scope.register = function (then) {
        User.register({
          fullname: scope.userInfo.fullname,
          email: scope.userInfo.email,
          pw: scope.userInfo.pw,
          then: then
        });
      };

      scope.login = function (then) {
        User.login({
          email: scope.userInfo.email,
          pw: scope.userInfo.pw,
          then: then
        });
      };

      scope.fbLogin = function (then) {
        User.fbLogin({ then:then });
      };

      scope.isValid = function () {
        if (scope.formType === 'login') {
          console.log('validity:', scope.userInfo.email.length > 0 && scope.userInfo.pw.length > 0);
          return scope.userInfo.email.length > 0 && scope.userInfo.pw.length > 0;
        } else {
          return scope.userInfo.fullname.length > 0 
            && scope.userInfo.email && scope.userInfo.email.length > 0 
            && scope.userInfo.pw.length > 0
            && scope.userInfo.pwconfirm === scope.userInfo.pw;
        }
      };
    }
  };
});