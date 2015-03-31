'use strict';
angular.module('ozpWebtop.dashboardView.chrome', [
  'ozpWebtop.constants',
  'ozpWebtop.models'
]);
var chrome = angular.module('ozpWebtop.dashboardView.chrome');
chrome.controller('ChromeCtrl', [
  '$scope',
  '$rootScope',
  '$log',
  'models',
  'dashboardStateChangedEvent',
  function ($scope, $rootScope, $log, models, dashboardStateChangedEvent) {
    if ($scope.frame) {
      var dashboards = models.getDashboards();
      for (var i = 0; i < dashboards.length; i++) {
        for (var j = 0; j < dashboards[i].frames.length; j++) {
          if (dashboards[i].frames[j].id === $scope.frame.id) {
            $scope.dashboardId = dashboards[i].id;
            $scope.layout = dashboards[i].layout;
          }
        }
      }
    } else {
      $log.warn('WARNING: frame not defined');
    }
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      if (toState.name.indexOf('grid-sticky') > -1) {
        $scope.layout = 'grid';
      } else if (toState.name.indexOf('desktop-sticky') > -1) {
        $scope.layout = 'desktop';
      } else {
        return;
      }
      $scope.dashboardId = toParams.dashboardId;
    });
    $scope.removeFrame = function () {
      models.removeFrame($scope.frame.id);
      $rootScope.$broadcast(dashboardStateChangedEvent, {
        'dashboardId': $scope.dashboardId,
        'layout': $scope.layout
      });
    };
    $scope.minimizeFrame = function () {
      models.toggleFrameKey($scope.frame.id, 'isMinimized');
      $rootScope.$broadcast(dashboardStateChangedEvent, {
        'dashboardId': $scope.dashboardId,
        'layout': $scope.layout
      });
    };
    $scope.maximizeFrame = function () {
      models.toggleFrameKey($scope.frame.id, 'isMaximized');
      $rootScope.$broadcast(dashboardStateChangedEvent, {
        'dashboardId': $scope.dashboardId,
        'layout': $scope.layout
      });
    };
  }
]);
chrome.directive('ozpChrome', function () {
  return {
    templateUrl: 'dashboardView/chrome/ozpchrome.tpl.html',
    restrict: 'E',
    replace: true,
    controller: 'ChromeCtrl',
    scope: { 'frame': '=' }
  };
});