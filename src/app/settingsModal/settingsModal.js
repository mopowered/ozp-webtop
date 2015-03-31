'use strict';
angular.module('ozpWebtop.settingsModal', [
  'ui.bootstrap',
  'ozpWebtop.models'
]);
angular.module('ozpWebtop.settingsModal').controller('settingsModalInstanceCtrl', [
  '$scope',
  '$modalInstance',
  function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);