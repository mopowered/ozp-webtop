'use strict';
angular.module('ozpWebtopApp.components').controller('ChromeController', [
  '$scope',
  '$rootScope',
  'dashboardApi',
  'dashboardChangeMonitor',
  function ($scope, $rootScope, dashboardApi, dashboardChangeMonitor) {
    dashboardChangeMonitor.run();
    $scope.$on('dashboardChange', function (event, dashboardChange) {
      if (dashboardChange.layout === 'grid') {
        $scope.isGrid = true;
      } else {
        $scope.isGrid = false;
      }
    });
    $scope.isDisabled = function (e) {
      for (var i = 0; i < $rootScope.activeFrames.length; i++) {
        if ($rootScope.activeFrames[i].id.indexOf(e) !== -1) {
          $rootScope.activeFrames.splice(i, 1);
        }
      }
      dashboardApi.removeFrame($scope.frame.id);
    };
    $scope.minimizeFrame = function (e) {
      for (var i = 0; i < $rootScope.activeFrames.length; i++) {
        if ($rootScope.activeFrames[i].id === e.id) {
          if ($rootScope.activeFrames[i].isMinimized === false || !$rootScope.activeFrames[i].isMinimized) {
            $rootScope.activeFrames[i].isMinimized = true;
          } else {
            $rootScope.activeFrames[i].isMinimized = false;
          }
        }
      }
    };
    $scope.maximizeFrame = function () {
      console.log('someone wants to maximize!');
    };
  }
]);