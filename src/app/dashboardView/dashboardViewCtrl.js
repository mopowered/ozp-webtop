'use strict';
angular.module('ozpWebtop.dashboardView', ['ozpWebtop.models']);
angular.module('ozpWebtop.dashboardView').controller('DashboardViewCtrl', [
  '$scope',
  '$state',
  '$interval',
  '$log',
  'models',
  function ($scope, $state, $interval, $log, models) {
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      stateChangeHandler(event, toState, toParams);
    });
    function stateChangeHandler(event, toState, toParams) {
      if (!models.dataCached()) {
        $log.warn('DashboardViewCtrl: delaying call to handleStateChange by 500ms - no data yet');
        $scope.readyPromise = $interval(function () {
          stateChangeHandler(event, toState, toParams);
        }, 500, 1);
        return;
      }
      if ($scope.readyPromise) {
        $interval.cancel($scope.readyPromise);
      }
      if (!toParams.dashboardId) {
        var dashboards = models.getDashboards();
        var state = 'dashboardview.' + dashboards[0].layout + '-sticky-' + dashboards[0].stickyIndex;
        $log.info('DashboardViewCtrl: $state.go for board ' + state + ', id: ' + dashboards[0].id);
        $state.go(state, { dashboardId: dashboards[0].id });
        return;
      }
      if (toState.name.indexOf('grid-sticky') > -1) {
        $scope.layout = 'grid';
      } else if (toState.name.indexOf('desktop-sticky') > -1) {
        $scope.layout = 'desktop';
      } else {
        $log.warn('DashboardViewCtrl received state change for neither grid nor desktop: loading default dashboard. toState.name: ' + toState.name);
        var dashboard = models.getCurrentDashboard();
        var newState = 'dashboardview.' + dashboard.layout + '-sticky-' + dashboard.stickyIndex;
        $log.info('DashboardViewCtrl: $state.go for board ' + newState + ', id: ' + dashboard.id);
        $state.go(newState, { dashboardId: dashboard.id });
      }
    }
  }
]);