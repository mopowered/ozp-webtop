'use strict';
angular.module('ozpWebtop.addApplicationsModal', ['ui.bootstrap']);
angular.module('ozpWebtop.addApplicationsModal').controller('AddApplicationsModalInstanceCtrl', [
  '$scope',
  '$modalInstance',
  '$log',
  '$window',
  'apps',
  function ($scope, $modalInstance, $log, $window, apps) {
    function sortApps(apps) {
      return apps.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    $scope.applications = sortApps(apps);
    $scope.selectedApps = [];
    $scope.centerUrl = $window.OzoneConfig.CENTER_URL;
    $scope.appSelected = function (app) {
      updateSelectedApps(app);
    };
    $scope.areAnyAppsSelected = function () {
      return $scope.selectedApps.length !== 0;
    };
    function updateSelectedApps(app) {
      for (var i = 0; i < $scope.selectedApps.length; i++) {
        if ($scope.selectedApps[i].id === app.id) {
          $scope.selectedApps.splice(i, 1);
          return;
        }
      }
      $scope.selectedApps.push(app);
    }
    $scope.isAppSelected = function (app) {
      for (var i = 0; i < $scope.selectedApps.length; i++) {
        if ($scope.selectedApps[i].id === app.id) {
          return true;
        }
      }
      return false;
    };
    $scope.openApps = function () {
      var response = {
          'useNewDashboard': false,
          'appsToOpen': $scope.selectedApps
        };
      $modalInstance.close(response);
    };
    $scope.openAppsInNewDashboard = function () {
      var response = {
          'useNewDashboard': true,
          'appsToOpen': $scope.selectedApps
        };
      $modalInstance.close(response);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);