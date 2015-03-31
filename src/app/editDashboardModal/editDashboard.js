'use strict';
angular.module('ozpWebtop.editDashboardModal', [
  'ui.bootstrap',
  'ozpWebtop.models'
]);
angular.module('ozpWebtop.editDashboardModal').controller('EditDashboardModalInstanceCtrl', [
  '$scope',
  '$modalInstance',
  'models',
  'dashboard',
  function ($scope, $modalInstance, models, dashboard) {
    $scope.dashboard = angular.copy(dashboard);
    $scope.originalLayout = dashboard.layout;
    $scope.layoutChanged = function () {
      return $scope.dashboard.layout !== $scope.originalLayout;
    };
    $scope.createDashboard = function () {
      var response = {
          'layout': $scope.dashboard.layout,
          'name': $scope.dashboard.name
        };
      $modalInstance.close(response);
    };
    $scope.ok = function () {
      models.saveDashboard($scope.board);
      var response = {
          'layout': $scope.dashboard.layout,
          'stickyIndex': $scope.dashboard.stickyIndex,
          'id': $scope.dashboard.id,
          'name': $scope.dashboard.name
        };
      $modalInstance.close(response);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);