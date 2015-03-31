'use strict';
angular.module('ozpWebtop.ozpToolbar', [
  'ozp.common.windowSizeWatcher',
  'ozpWebtop.models',
  'ozpWebtop.settingsModal'
]);
var app = angular.module('ozpWebtop.ozpToolbar').controller('OzpToolbarCtrl', [
    '$scope',
    '$rootScope',
    '$window',
    '$log',
    '$modal',
    'models',
    'windowSizeWatcher',
    'deviceSizeChangedEvent',
    'fullScreenModeToggleEvent',
    function ($scope, $rootScope, $window, $log, $modal, models, windowSizeWatcher, deviceSizeChangedEvent, fullScreenModeToggleEvent) {
      $scope.usernameLength = 0;
      $scope.fullScreenMode = false;
      $scope.user = 'J Smith';
      $scope.messages = {
        'unread': 0,
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
      windowSizeWatcher.run();
      $scope.$on(deviceSizeChangedEvent, function (event, value) {
        handleDeviceSizeChange(value);
      });
      $scope.$on(fullScreenModeToggleEvent, function (event, data) {
        $scope.fullScreenMode = data.fullScreenMode;
      });
      $scope.hudUrl = $window.OzoneConfig.HUD_URL;
      $scope.centerUrl = $window.OzoneConfig.CENTER_URL;
      $scope.webtopUrl = $window.OzoneConfig.WEBTOP_URL;
      $scope.metricsUrl = $window.OzoneConfig.METRICS_URL;
      function handleDeviceSizeChange(value) {
        if (value.deviceSize === 'sm') {
          $scope.usernameLength = 9;
        } else if (value.deviceSize === 'md') {
          $scope.usernameLength = 12;
        } else if (value.deviceSize === 'lg') {
          $scope.usernameLength = 12;
        }
      }
      $scope.helpUser = function () {
        alert('Help functionality coming soon!');
      };
      $scope.openSettingsModal = function (board) {
        $scope.board = board;
        var modalInstance = $modal.open({
            templateUrl: 'settingsModal/settingsModal.tpl.html',
            controller: 'settingsModalInstanceCtrl',
            windowClass: 'app-modal-window',
            scope: $scope,
            resolve: {
              dashboard: function () {
                return $scope.board;
              }
            }
          });
        modalInstance.result.then(function () {
        });
      };
    }
  ]);
app.directive('ozpToolbar', function () {
  return {
    restrict: 'E',
    templateUrl: 'ozpToolbar/ozpToolbar.tpl.html',
    replace: false,
    transclude: false,
    scope: true,
    link: function (scope) {
      scope.$watch('fullScreenMode', function () {
        if (scope.fullScreenMode) {
          $('body').css('margin', '16px 0px');
        } else {
          $('body').css('margin', '57px 0px');
          $('.navbar-fixed-top').css('top', '20px');
        }
      });
    }
  };
});