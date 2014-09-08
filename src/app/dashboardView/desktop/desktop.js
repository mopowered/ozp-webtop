'use strict';
angular.module('ozpWebtopApp.dashboardView').controller('DesktopController', [
  '$scope',
  '$rootScope',
  '$location',
  'dashboardApi',
  'marketplaceApi',
  'dashboardChangeMonitor',
  function ($scope, $rootScope, $location, dashboardApi, marketplaceApi, dashboardChangeMonitor) {
    $scope.dashboards = dashboardApi.getDashboards();
    $scope.frames = $scope.dashboards[0].frames;
    dashboardChangeMonitor.run();
    $scope.$on('dashboardChange', function () {
    });
    $scope.$watch(function () {
      return $location.path();
    }, function () {
      updateDashboard();
    });
    function updateDashboard() {
      var dashboardId = dashboardChangeMonitor.dashboardId;
      for (var i = 0; i < $scope.dashboards.length; i++) {
        if ($scope.dashboards[i].id.toString() === dashboardId) {
          $scope.currentDashboard = $scope.dashboards[i];
          $scope.icons = $scope.currentDashboard.desktopIcons;
          $scope.currentDashboardId = $scope.currentDashboard.id;
          $scope.frames = $scope.currentDashboard.frames;
          var allApps = marketplaceApi.getAllApps();
          dashboardApi.mergeApplicationData($scope.frames, allApps);
          $scope.max = {};
          sortFrames();
          for (var k = 0, len = $scope.frames.length; k < len; k++) {
            $scope.frames[k].desktopLayout.zIndex = k;
          }
          $scope.max.zIndex = $scope.frames.length - 1;
        }
      }
      $rootScope.activeFrames = $scope.currentDashboard.frames;
    }
    $scope.isFrameMinimized = function (e) {
      for (var i = 0; i < $rootScope.activeFrames.length; i++) {
        if ($rootScope.activeFrames[i].id === e.id) {
          return $rootScope.activeFrames[i].isMinimized;
        }
      }
    };
    function sortFrames() {
      $scope.frames.sort(function (a, b) {
        return a.desktopLayout.zIndex < b.desktopLayout.zIndex ? -1 : a.desktopLayout.zIndex > b.desktopLayout.zIndex ? 1 : 0;
      });
    }
  }
]);