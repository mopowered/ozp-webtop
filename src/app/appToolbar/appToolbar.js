'use strict';
angular.module('ozpWebtop.appToolbar', [
  'ui.router',
  'ui.bootstrap',
  'ozpWebtop.models',
  'ozpWebtop.addApplicationsModal',
  'ozpWebtop.editDashboardModal',
  'ozp.common.windowSizeWatcher'
]);
angular.module('ozpWebtop.appToolbar').controller('ApplicationToolbarCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$modal',
  '$interval',
  '$window',
  '$log',
  'models',
  'windowSizeWatcher',
  'maxStickyBoards',
  'deviceSizeChangedEvent',
  'dashboardStateChangedEvent',
  'fullScreenModeToggleEvent',
  'highlightFrameOnGridLayoutEvent',
  'removeFramesOnDeleteEvent',
  function ($scope, $rootScope, $state, $modal, $interval, $window, $log, models, windowSizeWatcher, maxStickyBoards, deviceSizeChangedEvent, dashboardStateChangedEvent, fullScreenModeToggleEvent, highlightFrameOnGridLayoutEvent, removeFramesOnDeleteEvent) {
    $scope.dashboards = [];
    $scope.currentDashboard = '';
    $scope.frames = [];
    $scope.myPinnedApps = [];
    $scope.apps = [];
    $scope.dashboardNameLength = 0;
    $scope.maxAppsDisplayed = '';
    $scope.fullScreenMode = false;
    $scope.myPinnedAppsFirstDisplayedIndex = 0;
    $scope.nextAppsVisible = false;
    $scope.previousAppsVisible = false;
    windowSizeWatcher.run();
    $scope.fullScreenMode = false;
    $scope.$on(deviceSizeChangedEvent, function (event, value) {
      $scope.handleWindowSizeChange(value);
    });
    $scope.$on(dashboardStateChangedEvent, function () {
      $scope.updateApps();
    });
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      var layoutType = '';
      if (toState.name.indexOf('grid-sticky') > -1) {
        layoutType = 'grid';
      } else if (toState.name.indexOf('desktop-sticky') > -1) {
        layoutType = 'desktop';
      } else {
        return;
      }
      $scope.handleStateChange(toParams.dashboardId, layoutType);
    });
    function initializeData() {
      if (!models.dataCached()) {
        $log.warn('ApplicationToolbarCtrl: delaying initialization by 500ms - no data yet');
        $scope.initInterval = $interval(function () {
          initializeData();
        }, 500, 1);
        return;
      }
      $scope.apps = models.getApplicationData();
    }
    initializeData();
    $scope.handleWindowSizeChange = function (value) {
      if (value.deviceSize === 'sm') {
        $scope.maxAppsDisplayed = 6;
        $scope.setPinnedApps();
      } else if (value.deviceSize === 'md') {
        $scope.maxAppsDisplayed = 10;
        $scope.setPinnedApps();
      } else if (value.deviceSize === 'lg') {
        $scope.maxAppsDisplayed = 15;
        $scope.setPinnedApps();
      }
      if (value.deviceSize === 'sm') {
        $scope.dashboardNameLength = 9;
      } else if (value.deviceSize === 'md') {
        $scope.dashboardNameLength = 28;
      } else if (value.deviceSize === 'lg') {
        $scope.dashboardNameLength = 48;
      }
    };
    $scope.handleStateChange = function (dashboardId, dashboardLayout) {
      if (!models.dataCached()) {
        $log.warn('ApplicationToolbarCtrl: delaying call to handleStateChange by 500ms - no data yet');
        $scope.handleStateChangeInterval = $interval(function () {
          $scope.handleStateChange(dashboardId, dashboardLayout);
        }, 500, 1);
        return;
      }
      if ($scope.handleStateChangeInterval) {
        $interval.cancel($scope.handleStateChangeInterval);
      }
      var dashboards = models.getDashboards();
      $scope.dashboards = dashboards;
      for (var i = 0; i < dashboards.length; i++) {
        if (dashboards[i].id === dashboardId) {
          $scope.currentDashboard = dashboards[i];
        }
      }
      if (!$scope.currentDashboard) {
        $log.warn('WARNING: No dashboards found');
      }
      if ($scope.currentDashboard.layout !== dashboardLayout) {
        $log.debug('dashboard layout mismatch, changing state');
        $state.go('dashboardview.' + $scope.currentDashboard.layout + '-sticky-' + $scope.currentDashboard.stickyIndex, { 'dashboardId': $scope.currentDashboard.id });
      }
      $scope.updateApps();
    };
    $scope.loadDashboard = function (board) {
      $state.go('dashboardview.' + board.layout + '-sticky-' + board.stickyIndex, { dashboardId: board.id });
    };
    $scope.isCurrentBoard = function (board) {
      return $scope.currentDashboard.id === board.id;
    };
    $scope.setPinnedApps = function () {
      if (!$scope.frames) {
        return;
      }
      var totalFrames = $scope.frames.length;
      if (totalFrames > $scope.maxAppsDisplayed) {
        $scope.myPinnedApps = $scope.frames.slice(0, $scope.maxAppsDisplayed);
        $scope.myPinnedAppsFirstDisplayedIndex = 0;
        $scope.nextAppsVisible = true;
        $scope.previousAppsVisible = false;
      } else {
        $scope.myPinnedApps = $scope.frames;
        $scope.nextAppsVisible = false;
        $scope.previousAppsVisible = false;
      }
    };
    $scope.updateApps = function () {
      if (!models.dataCached()) {
        $log.warn('ApplicationToolbarCtrl: delaying call to updateApps by 500ms - no data yet');
        $scope.updateAppsInterval = $interval($scope.updateApps, 500, 1);
        return;
      }
      if ($scope.updateAppsInterval) {
        $interval.cancel($scope.updateAppsInterval);
      }
      var dashboards = models.getDashboards();
      $scope.dashboards = dashboards;
      for (var i = 0; i < dashboards.length; i++) {
        if (dashboards[i].id === $scope.currentDashboard.id) {
          $scope.currentDashboard = dashboards[i];
          $scope.frames = angular.copy(dashboards[i].frames);
          models.mergeApplicationData($scope.frames);
          $scope.setPinnedApps();
        }
      }
    };
    $scope.maximizeFrame = function (e) {
      if ($scope.currentDashboard.layout === 'grid') {
        $log.debug('sending highlight msg for frame ' + e.id);
        $rootScope.$broadcast(highlightFrameOnGridLayoutEvent, { 'frameId': e.id });
      } else {
        models.toggleFrameKey(e.id, 'isMinimized');
        $rootScope.$broadcast(dashboardStateChangedEvent, {
          'dashboardId': $scope.currentDashboard.id,
          'layout': 'desktop'
        });
      }
    };
    $scope.toggleFullScreenMode = function () {
      var fullScreenVal = false;
      if (!$scope.fullScreenMode || ($scope.fullScreenMode = false)) {
        fullScreenVal = true;
      }
      $scope.fullScreenMode = fullScreenVal;
      $rootScope.$broadcast(fullScreenModeToggleEvent, { 'fullScreenMode': fullScreenVal });
      var resp = models.updateUserSettingByKey('fullScreenMode', fullScreenVal);
      if (resp) {
      } else {
        $log.error('ERROR failed to update fullScreenMode in user ' + 'settings');
      }
    };
    $scope.previousApps = function () {
      var start = $scope.myPinnedAppsFirstDisplayedIndex - $scope.maxAppsDisplayed;
      var end = start + $scope.maxAppsDisplayed;
      $scope.myPinnedApps = $scope.frames.slice(start, end);
      $scope.myPinnedAppsFirstDisplayedIndex = start;
      if (start > 0) {
        $scope.previousAppsVisible = true;
      } else {
        $scope.previousAppsVisible = false;
      }
      $scope.nextAppsVisible = true;
    };
    $scope.nextApps = function () {
      var start = $scope.myPinnedAppsFirstDisplayedIndex + $scope.maxAppsDisplayed;
      var end = start + $scope.maxAppsDisplayed;
      $scope.myPinnedApps = $scope.frames.slice(start, end);
      $scope.myPinnedAppsFirstDisplayedIndex = start;
      if ($scope.frames.length > end) {
        $scope.nextAppsVisible = true;
      } else {
        $scope.nextAppsVisible = false;
      }
      $scope.previousAppsVisible = true;
    };
    $scope.cascadeWindows = function () {
      var origin = {
          'x': 50,
          'y': 80
        };
      var frameSize = {
          'x': 800,
          'y': 400
        };
      models.cascadeWindows($scope.currentDashboard.id, origin, frameSize);
      $rootScope.$broadcast(dashboardStateChangedEvent, {
        'dashboardId': $scope.currentDashboard.id,
        'layout': 'desktop'
      });
    };
    $scope.openApplicationsModal = function () {
      var modalInstance = $modal.open({
          templateUrl: 'addApplicationsModal/addApplicationsModal.tpl.html',
          controller: 'AddApplicationsModalInstanceCtrl',
          windowClass: 'app-modal-window',
          scope: $rootScope,
          resolve: {
            apps: function () {
              return $scope.apps;
            }
          }
        });
      function addAppToDashboard(app, dashboardId) {
        var isOnDashboard = models.isAppOnDashboard(dashboardId, app.id);
        if (isOnDashboard && app.singleton) {
          $log.warn('WARNING: Only one instance of ' + app.name + ' may be on your dashboard');
        } else {
          return models.createFrame(dashboardId, app.id, 25);
        }
      }
      modalInstance.result.then(function (response) {
        var dashboardId;
        var stickyIndex;
        if (response.useNewDashboard) {
          if ($scope.dashboards.length >= maxStickyBoards) {
            var msg = 'ERROR: Max number of dashboards reached';
            $log.error(msg);
            alert(msg);
            return;
          }
          var random_integer = Math.floor((Math.random() + 0.1) * 101);
          var newDashboard = {};
          newDashboard.name = 'Dashboard ' + random_integer.toString();
          models.createDashboard(newDashboard);
          var dashboards = models.getDashboards();
          for (var i = 0; i < dashboards.length; i++) {
            if (dashboards[i].name === newDashboard.name) {
              dashboardId = dashboards[i].id;
              stickyIndex = dashboards[i].stickyIndex;
            }
          }
          for (var a = 0; a < response.appsToOpen.length; a++) {
            addAppToDashboard(response.appsToOpen[a], dashboardId);
          }
          $state.go('dashboardview.grid-sticky-' + stickyIndex, { 'dashboardId': dashboardId });
        } else {
          for (var b = 0; b < response.appsToOpen.length; b++) {
            addAppToDashboard(response.appsToOpen[b], $scope.currentDashboard.id);
          }
          $log.debug('issuing dashboardStateChangedEvent');
          $rootScope.$broadcast(dashboardStateChangedEvent, {
            'dashboardId': $scope.currentDashboard.id,
            'layout': $scope.currentDashboard.layout
          });
        }
      });
    };
    $scope.openEditDashboardModal = function (board) {
      $scope.board = board;
      $scope.modalInstanceType = 'edit';
      var modalInstance = $modal.open({
          templateUrl: 'editDashboardModal/editDashboardModal.tpl.html',
          controller: 'EditDashboardModalInstanceCtrl',
          windowClass: 'app-modal-window',
          scope: $scope,
          resolve: {
            dashboard: function () {
              return $scope.board;
            }
          }
        });
      modalInstance.result.then(function (response) {
        var updatedDashboardData = {};
        for (var i = 0; i < $scope.dashboards.length; i++) {
          if ($scope.dashboards[i].id === response.id) {
            $scope.dashboards[i].name = response.name;
            $scope.dashboards[i].layout = response.layout;
            updatedDashboardData = $scope.dashboards[i];
          }
        }
        var dashboard = models.updateDashboard(updatedDashboardData);
        for (var j = 0; j < $scope.dashboards.length; j++) {
          if ($scope.dashboards[j].id === dashboard.id) {
            $scope.dashboards[j].stickyIndex = dashboard.stickyIndex;
          }
        }
        if ($scope.currentDashboard.id === dashboard.id) {
          $rootScope.$broadcast(dashboardStateChangedEvent, {
            'dashboardId': dashboard.id,
            'layout': dashboard.layout
          });
          $state.go('dashboardview.' + dashboard.layout + '-sticky-' + dashboard.stickyIndex, { dashboardId: dashboard.id });
        }
      });
    };
    $scope.openNewDashboardModal = function () {
      $scope.modalInstanceType = 'new';
      var modalInstance = $modal.open({
          templateUrl: 'editDashboardModal/editDashboardModal.tpl.html',
          controller: 'EditDashboardModalInstanceCtrl',
          windowClass: 'app-modal-window',
          scope: $scope,
          resolve: {
            dashboard: function () {
              return $scope.currentDashboard;
            }
          }
        });
      modalInstance.result.then(function (response) {
        var dashboardId, stickyIndex;
        models.createDashboard(response);
        var dashboards = models.getDashboards();
        for (var i = 0; i < dashboards.length; i++) {
          if (dashboards[i].name === response.name) {
            dashboardId = dashboards[i].id;
            stickyIndex = dashboards[i].stickyIndex;
          }
        }
        $state.go('dashboardview.' + response.layout + '-sticky-' + stickyIndex, { dashboardId: dashboardId });
        $rootScope.$broadcast(dashboardStateChangedEvent, {
          'dashboardId': dashboardId,
          'layout': response.layout
        });
      });
    };
    $scope.openDeleteDashboardModal = function (board) {
      if ($scope.dashboards.length === 1) {
        $log.error('ERROR: You may not delete your last dashboard');
        return;
      } else {
        $log.debug('dashboards remaining: ' + $scope.dashboards.length);
      }
      var msg = 'Are you sure you want to delete dashboard ' + board.name + '? This action cannot be undone';
      if ($window.confirm(msg)) {
        $rootScope.$broadcast(removeFramesOnDeleteEvent, { 'dashboardId': board.id });
        models.removeDashboard(board.id);
        $scope.dashboards = models.getDashboards();
        $state.go('dashboardview.' + $scope.dashboards[0].layout + '-sticky-' + $scope.dashboards[0].stickyIndex, { 'dashboardId': $scope.dashboards[0].id });
      }
    };
  }
]);
angular.module('ozpWebtop.appToolbar').directive('appToolbar', function () {
  return {
    restrict: 'E',
    templateUrl: 'appToolbar/appToolbar.tpl.html'
  };
});