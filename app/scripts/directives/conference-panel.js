angular.module('svhubApp').directive('conferencePanel', function(User, decodeFilter) {
  return {
    restrict: 'E',
    scope: { 
      conference: '='
    },
    replace: true,
    templateUrl: 'views/directives/conference-panel.html',
    link: function (scope, iElement, iAttrs, controller) {
    }
  };
});