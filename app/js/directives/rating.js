'use strict';

foodMeApp.directive('fmRating', function() {
  return {
    restrict: 'E',
    scope: {
      symbol: '@',
      max: '@',
      disabled: '@'
    },
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      var styles;

      scope.$watch('max', function(max) {
        scope.styles = styles = [];

        for(var i = 0; i < max; i ++) {
          styles.push({ 'fm-selected': false, 'fm-hover': false });
        }
      });

      scope.enter = function(index) {
        angular.forEach(styles, function(style, i) {
          style['fm-hover'] = i <= index;
        });
      };

      scope.leave = function(index) {
        angular.forEach(styles, function(style, i) {
          style['fm-hover'] = false;
        });
      };

      scope.select = function(index) {
        angular.forEach(styles, function(style, i) {
          style['fm-selected'] = i <= index;
        });
        if (ngModel) {
          ngModel.$setViewValue(index);
        }
      };

      if (ngModel) {
        ngModel.$render = function() {
          scope.select(ngModel.$viewValue);
        };
      }
    },
    template:
      '<ul class="fm-rating">' +
        '<li ng-repeat="style in styles" ng-class="style" ' +
            'ng-click="select($index)" ng-mouseenter="enter($index)" ng-mouseleave="leave($index)">' +
          '{{symbol}}' +
        '</li>' +
      '</ul>'
  };
});
