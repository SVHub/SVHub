angular.module('svhubApp').filter('decode', function() {
  return window.decodeURIComponent;
});