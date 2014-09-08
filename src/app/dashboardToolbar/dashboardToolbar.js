'use strict';
angular.module('ozpWebtopApp.dashboardToolbar').controller('dashboardToolbarCtrl', [
  '$scope',
  '$rootScope',
  'dashboardApi',
  'dashboardChangeMonitor',
  function ($scope, $rootScope, dashboardApi, dashboardChangeMonitor) {
    $scope.dashboards = dashboardApi.getDashboards();
    $scope.currentDashboard = $scope.dashboards[0];
    $scope.layout = 'grid';
    dashboardChangeMonitor.run();
    $scope.$on('dashboardChange', function (event, dashboardChange) {
      $scope.layout = dashboardChange.layout;
      $scope.dashboardId = dashboardChange.dashboardId;
      $scope.currentDashboard.name = dashboardApi.getDashboardById($scope.dashboardId).name;
    });
    $scope.$on('UserSettingsChanged', function () {
      $scope.dashboards = dashboardApi.getDashboards();
      var dashboard = dashboardApi.getDashboardById($scope.dashboardId);
      if (dashboard) {
        $scope.currentDashboard.name = dashboard.name;
      } else {
        console.log('WARNING: Dashboard ' + $scope.dashboardId + ' no longer exists');
      }
    });
    $scope.messages = {
      'unread': 2,
      'messages': [
        {
          'subject': 'Photo Editing Tools',
          'message': 'Daryl just shared a dashboard with you! ' + 'Click to add it to your webtop.'
        },
        {
          'subject': 'Math Tools',
          'message': 'Kay just shared a dashboard with you! It has some great' + ' things!'
        }
      ]
    };
    $scope.user = {
      'name': 'J Smith',
      'username': 'J Smith'
    };
    $scope.setCurrentDashboard = function (board) {
      $scope.currentDashboard = board;
    };
    $scope.useGridLayout = function () {
      $scope.layout = 'grid';
    };
    $scope.useDesktopLayout = function () {
      $scope.layout = 'desktop';
    };
    $scope.launchSettingsModal = function () {
      $rootScope.$broadcast('launchSettingsModal', { launch: 'true' });
    };
  }
]);