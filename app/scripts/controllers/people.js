'use strict';

angular.module('svhubApp')
  .controller('PeopleCtrl', function ($scope, $routeParams, Conference, User, ngTableParams) {

    $scope.enrollments = [];

    Conference.getConference($routeParams.id).then(function (conferenceResults) {
      // $scope.conference = conferenceResults[0];
      Conference.getConferenceEnrollments(conferenceResults[0]).then(function (enrollments) {
        $scope.enrollments = enrollments;
        console.log('about to reload', $scope.enrollments);
        $scope.tableParams.reload();
      });
    });

    function defaultEnrollmentSort (data) {
      var ENROLLED = 'enrolled';
      var UNENROLLED = 'unenrolled';
      return data.sort(function (a, b) {
        if (a.get('status').get('name') === ENROLLED && b.get('status').get('name') === UNENROLLED) {
          return -1;
        } else if (a.get('status').get('name') === b.get('status').get('name')) {
          return a.get('user').get('fullname') < b.get('user').get('fullname');
        } else {
          return 1;
        }
      });
    }

    function dehydrateParseObj (item) {
      item.fullname = item.get('user').get('fullname');
      item.email = item.get('user').get('email');
      item.status = item.get('status').get('name');
      return item;
    }

    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
        name: 'asc'     // initial sorting
      }
    }, {
      total: $scope.enrollments.length, // length of data
      getData: function($defer, params) {
        // $defer.resolve($scope.enrollments.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        // console
        $defer.resolve(defaultEnrollmentSort($scope.enrollments).map(dehydrateParseObj));
      }
    });
  });
