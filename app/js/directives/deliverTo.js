'use strict';

foodMeApp.directive('fmDeliverTo', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/deliverTo.html',
    scope: {},
    controller: function FmDeliverToController($scope, userInfo) {
      $scope.userInfo = userInfo;
    }
  }
});
