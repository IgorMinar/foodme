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
        if (scope.disabled) return;
        angular.forEach(styles, function(style, i) {
          style['fm-hover'] = i <= index;
        });
      };

      scope.leave = function(index) {
        if (scope.disabled) return;
        angular.forEach(styles, function(style, i) {
          style['fm-hover'] = false;
        });
      };

      scope.select = function(index) {
        if (scope.disabled) return;
        internalSelect(index);
        if (ngModel) {
          ngModel.$setViewValue(index + 1);
        }
      };

      if (ngModel) {
        ngModel.$render = function() {
          internalSelect(ngModel.$viewValue - 1);
        };
      }

      function internalSelect(index) {
        angular.forEach(styles, function(style, i) {
          style['fm-selected'] = i <= index;
        });
      }
    },
    template:
      '<ul class="fm-rating" ng-class="{pointer:!disabled}">' +
        '<li ng-repeat="style in styles" ng-class="style" ' +
            'ng-click="select($index)" ng-mouseenter="enter($index)" ng-mouseleave="leave($index)">' +
          '{{symbol}}' +
        '</li>' +
      '</ul>'
  };
});
