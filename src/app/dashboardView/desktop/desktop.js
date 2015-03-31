'use strict';
angular.module('ozpWebtop.dashboardView.desktop', [
  'ozpWebtop.constants',
  'ozpWebtop.models'
]);
angular.module('ozpWebtop.dashboardView.desktop').controller('DesktopCtrl', [
  '$scope',
  '$rootScope',
  '$interval',
  '$log',
  'models',
  'dashboardStateChangedEvent',
  'fullScreenModeToggleEvent',
  function ($scope, $rootScope, $interval, $log, models, dashboardStateChangedEvent, fullScreenModeToggleEvent) {
    $scope.dashboards = [];
    $scope.frames = [];
    $scope.fullScreenMode = false;
    $scope.apps = [];
    $scope.currentDashboard = '';
    $scope.currentDashboardId = '';
    $scope.max = {};
    var initialized = false;
    $scope.$on(fullScreenModeToggleEvent, function (event, data) {
      $scope.fullScreenMode = data.fullScreenMode;
    });
    $scope.$on(dashboardStateChangedEvent, function (event, value) {
      if (value.dashboardId === $scope.currentDashboardId && value.layout === 'desktop') {
        dashboardChangeHandler();
      }
    });
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      stateChangeSuccessHandler(event, toState, toParams);
    });
    function initializeData() {
      if (!models.dataCached()) {
        $log.warn('GridCtrl: delaying initialization by 500ms - no data yet');
        $scope.initInterval = $interval(function () {
          initializeData();
        }, 500, 1);
        return;
      }
      $scope.apps = models.getApplicationData();
      var dashboardData = models.getWebtopData();
      $scope.dashboards = dashboardData.dashboards;
      $scope.frames = $scope.dashboards[0].frames;
    }
    initializeData();
    function stateChangeSuccessHandler(event, toState, toParams) {
      if (!models.dataCached()) {
        $log.warn('DesktopCtrl: delaying call to stateChangeSuccessHandler by 500ms - no data yet');
        $scope.handleStateChangeSuccessInterval = $interval(function () {
          stateChangeSuccessHandler(event, toState, toParams);
        }, 500, 1);
        return;
      }
      if ($scope.handleStateChangeSuccessInterval) {
        $interval.cancel($scope.handleStateChangeSuccessInterval);
      }
      var layoutType = '';
      if (toState.name.indexOf('grid-sticky') > -1) {
        layoutType = 'grid';
      } else if (toState.name.indexOf('desktop-sticky') > -1) {
        layoutType = 'desktop';
      } else {
        return;
      }
      if (layoutType !== 'desktop') {
        return;
      }
      if (initialized && toParams.dashboardId === $scope.currentDashboardId) {
        dashboardChangeHandler();
        return;
      }
      if (initialized && toParams.dashboardId !== $scope.currentDashboardId) {
        return;
      }
      $scope.currentDashboardId = toParams.dashboardId;
      reloadDashboard();
      initialized = true;
    }
    function dashboardChangeHandler() {
      if (!models.dataCached()) {
        $log.warn('DesktopCtrl: delaying call to dashboardChangeHandler by 500ms - no data yet');
        $scope.dashboardChangeHandlerInterval = $interval(function () {
          dashboardChangeHandler();
        }, 500, 1);
        return;
      }
      if ($scope.dashboardChangeHandlerInterval) {
        $interval.cancel($scope.dashboardChangeHandlerInterval);
      }
      var updatedDashboard = models.getDashboardById($scope.currentDashboardId);
      for (var ii = 0; ii < updatedDashboard.frames.length; ii++) {
        for (var jj = 0; jj < $scope.frames.length; jj++) {
          if (updatedDashboard.frames[ii].id === $scope.frames[jj].id) {
            $scope.frames[jj].isMinimized = updatedDashboard.frames[ii].isMinimized;
            $scope.frames[jj].isMaximized = updatedDashboard.frames[ii].isMaximized;
            if ($scope.frames[jj].desktopLayout.top !== updatedDashboard.frames[ii].desktopLayout.top) {
              $scope.frames[jj].desktopLayout.top = updatedDashboard.frames[ii].desktopLayout.top;
            } else {
              $scope.frames[jj].desktopLayout.top = updatedDashboard.frames[ii].desktopLayout.top + 1;
            }
            $scope.frames[jj].desktopLayout.zIndex = updatedDashboard.frames[ii].desktopLayout.zIndex;
            $scope.frames[jj].desktopLayout.left = updatedDashboard.frames[ii].desktopLayout.left;
            $scope.frames[jj].desktopLayout.width = updatedDashboard.frames[ii].desktopLayout.width;
            $scope.frames[jj].desktopLayout.height = updatedDashboard.frames[ii].desktopLayout.height;
            $scope.frames[jj].desktopLayout.style = {
              width: $scope.frames[jj].desktopLayout.width + 'px',
              height: $scope.frames[jj].desktopLayout.height + 'px',
              top: $scope.frames[jj].desktopLayout.top + 'px',
              left: $scope.frames[jj].desktopLayout.left + 'px',
              'z-index': $scope.frames[jj].desktopLayout.zIndex
            };
          }
        }
      }
      if ($scope.frames.length === updatedDashboard.frames.length) {
        return;
      }
      var originalFrames = $scope.frames.slice();
      var originalFramesCopy = originalFrames.slice();
      for (var i = 0; i < originalFramesCopy.length; i++) {
        var removeFrame = true;
        for (var j = 0; j < updatedDashboard.frames.length; j++) {
          if (originalFramesCopy[i].id === updatedDashboard.frames[j].id) {
            removeFrame = false;
          }
        }
        if (removeFrame) {
          $scope.frames.splice(i, 1);
        }
      }
      for (var k = 0; k < updatedDashboard.frames.length; k++) {
        var addFrame = true;
        for (var l = 0; l < originalFrames.length; l++) {
          if (updatedDashboard.frames[k].id === originalFrames[l].id) {
            addFrame = false;
          }
        }
        if (addFrame) {
          $scope.frames.push(updatedDashboard.frames[k]);
        }
      }
      models.mergeApplicationData($scope.frames);
    }
    function reloadDashboard() {
      if (!models.dataCached()) {
        $log.warn('DesktopCtrl: delaying call to reloadDashboard by 500ms - no data yet');
        $scope.reloadDashboardInterval = $interval(function () {
          reloadDashboard();
        }, 500, 1);
        return;
      }
      if ($scope.reloadDashboardInterval) {
        $interval.cancel($scope.reloadDashboardInterval);
      }
      if (!$scope.dashboards) {
        $log.warn('Dashboard changed, but no dashboards exist');
        return;
      }
      for (var i = 0; i < $scope.dashboards.length; i++) {
        if ($scope.dashboards[i].id.toString() === $scope.currentDashboardId) {
          $scope.currentDashboard = $scope.dashboards[i];
          $scope.currentDashboardId = $scope.currentDashboard.id;
          $scope.frames = $scope.currentDashboard.frames;
          models.mergeApplicationData($scope.frames);
          $scope.max = {};
          sortFrames();
          for (var k = 0, len = $scope.frames.length; k < len; k++) {
            $scope.frames[k].desktopLayout.zIndex = k;
          }
          $scope.max.zIndex = $scope.frames.length - 1;
        }
      }
      $rootScope.$broadcast(dashboardStateChangedEvent, {
        'dashboardId': $scope.currentDashboardId,
        'layout': 'desktop'
      });
    }
    $scope.isFrameMinimized = function (e) {
      for (var i = 0; i < $scope.frames.length; i++) {
        if ($scope.frames[i].id === e.id) {
          return $scope.frames[i].isMinimized;
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