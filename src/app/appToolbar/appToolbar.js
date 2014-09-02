'use strict';
angular.module('ozpWebtopApp.appToolbar').controller('appToolbarCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'marketplaceApi',
  'dashboardApi',
  'dashboardChangeMonitor',
  function ($scope, $rootScope, $state, marketplaceApi, dashboardApi, dashboardChangeMonitor) {
    $scope.currentDashboardId = '0';
    $rootScope.$watch('activeFrames', function () {
      if ($rootScope.activeFrames) {
        $scope.myPinnedApps = $rootScope.activeFrames;
      }
    });
    dashboardChangeMonitor.run();
    $scope.$on('dashboardChange', function (event, dashboardChange) {
      $scope.currentDashboardId = dashboardChange.dashboardId;
      $rootScope.currentDashboardId = dashboardChange.dashboardId;
    });
    $scope.maximizeFrame = function (e) {
      if (e.isMinimized === true) {
        e.isMinimized = false;
      }
    };
    $scope.myApps = marketplaceApi.getAllApps();
    $scope.appClicked = function (app) {
      var isOnDashboard = dashboardApi.isAppOnDashboard($scope.currentDashboardId, app.id);
      if (isOnDashboard) {
        alert('This application is already on your dashboard');
      } else {
        dashboardApi.createFrame($scope.currentDashboardId, app.id, 10);
        $state.go($state.$current, null, { reload: true });
      }
    };
  }
]);