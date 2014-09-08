'use strict';
angular.module('ozpWebtopApp.dashboardView').controller('IframeController', [
  '$scope',
  '$sce',
  function ($scope, $sce) {
    $scope.frame.trustedUrl = $sce.trustAsResourceUrl($scope.frame.url);
  }
]);