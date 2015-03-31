'use strict';
angular.module('ozpWebtop.urlWidgetLauncher', []);
var app = angular.module('ozpWebtop.urlWidgetLauncher');
app.controller('UrlWidgetLauncherCtrl', [
  '$scope',
  '$state',
  '$log',
  '$interval',
  'models',
  function ($scope, $state, $log, $interval, models) {
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      if (toState.name === 'url-launch-app') {
        $scope.handleStateChange(toParams);
      }
    });
    $scope.handleStateChange = function (toParams) {
      if (!models.dataCached()) {
        $log.warn('UrlWidgetLauncherCtrl: delaying call to handleStateChange by 500ms - no data yet');
        $scope.handleStateChangeInterval = $interval(function () {
          $scope.handleStateChange(toParams);
        }, 500, 1);
        return;
      }
      if ($scope.handleStateChangeInterval) {
        $interval.cancel($scope.handleStateChangeInterval);
      }
      $log.debug('Opening app ' + toParams.appId);
      var dashboard = models.getCurrentDashboard();
      if (!dashboard) {
        $log.error('Error: cannot open widget - no current dashboard');
      } else {
        models.createFrame(dashboard.id, toParams.appId, 25);
        $log.debug('Adding app ' + toParams.appId + ' to existing dashboard ' + dashboard.id + ' and redirecting ...');
        $state.go('dashboardview.' + dashboard.layout + '-sticky-' + dashboard.stickyIndex, { dashboardId: dashboard.id });
      }
    };
  }
]);