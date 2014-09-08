'use strict';
angular.module('ozpWebtopApp.components').directive('ozpIcon', function () {
  return {
    replace: true,
    templateUrl: 'components/icon/ozpicon.tpl.html',
    restrict: 'E',
    controller: [
      '$scope',
      function ($scope) {
        $scope.handleIconClick = function (icon) {
          $scope.$emit('iconClick', icon);
        };
      }
    ]
  };
});