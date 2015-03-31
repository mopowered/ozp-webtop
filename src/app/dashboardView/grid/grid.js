'use strict';
angular.module('ozpWebtop.dashboardView.grid', [
  'ozp.common.windowSizeWatcher',
  'ozpWebtop.constants',
  'ozpWebtop.models'
]);
angular.module('ozpWebtop.dashboardView.grid').controller('GridCtrl', [
  '$scope',
  '$rootScope',
  '$interval',
  '$q',
  '$timeout',
  '$log',
  '$sce',
  'models',
  'windowSizeWatcher',
  'deviceSizeChangedEvent',
  'windowSizeChangedEvent',
  'dashboardStateChangedEvent',
  'fullScreenModeToggleEvent',
  'highlightFrameOnGridLayoutEvent',
  'initialDataReceivedEvent',
  'removeFramesOnDeleteEvent',
  function ($scope, $rootScope, $interval, $q, $timeout, $log, $sce, models, windowSizeWatcher, deviceSizeChangedEvent, windowSizeChangedEvent, dashboardStateChangedEvent, fullScreenModeToggleEvent, highlightFrameOnGridLayoutEvent, initialDataReceivedEvent, removeFramesOnDeleteEvent) {
    $scope.deviceSize = '';
    $scope.frames = [];
    $scope.apps = [];
    $scope.fullScreenMode = false;
    $scope.dashboard = {};
    $scope.dashboardId = '';
    var intervalPromise;
    var initialized = false;
    $scope.gridOptions = {
      columns: 6,
      pushing: true,
      floating: true,
      width: 'auto',
      colWidth: 'auto',
      rowHeight: 'match',
      margins: [
        5,
        5
      ],
      outerMargin: true,
      isMobile: false,
      minColumns: 1,
      minRows: 1,
      maxRows: 25,
      resizable: {
        enabled: true,
        handles: 'n, e, s, w, ne, se, sw, nw',
        start: function (event, uiWidget) {
          handleGridsterResizeStart(uiWidget);
        },
        resize: function () {
        },
        stop: function (event, uiWidget) {
          handleGridsterResizeStop(uiWidget);
        }
      },
      draggable: {
        enabled: true,
        handle: 'div.ozp-chrome, div.ozp-chrome > .chrome-icon, ' + 'div.ozp-chrome > .chrome-name',
        start: function () {
        },
        drag: function () {
        },
        stop: function () {
          $scope.updateAllFramesAfterChange();
        }
      }
    };
    windowSizeWatcher.run();
    $scope.deviceSize = windowSizeWatcher.getCurrentSize();
    if ($scope.deviceSize === 'lg') {
      $scope.deviceSize = 'md';
      $log.debug('size changed from lg to md');
    }
    if (windowSizeWatcher.getCurrentSize() === 'sm') {
      $scope.gridOptions.columns = 3;
    }
    $scope.$on(windowSizeChangedEvent, function () {
      handleWindowPxSizeChange();
    });
    $scope.$on(deviceSizeChangedEvent, function (event, value) {
      handleDeviceSizeChange(value);
    });
    $scope.$on(dashboardStateChangedEvent, function (event, value) {
      if (value.dashboardId === $scope.dashboardId && value.layout === 'grid') {
        $scope.handleDashboardChange();
      }
    });
    $scope.$on(fullScreenModeToggleEvent, function (event, data) {
      $scope.fullScreenMode = data.fullScreenMode;
    });
    $scope.$on(highlightFrameOnGridLayoutEvent, function (event, data) {
      for (var i = 0; i < $scope.frames.length; i++) {
        if ($scope.frames[i].id === data.frameId) {
          if (!$scope.frames[i].highlighted) {
            $scope.frames[i].highlighted = true;
            var top = angular.element('#' + data.frameId).offset().top;
            $(window).scrollTop(top - 70);
            $timeout(removeFrameHighlight, 500);
            $scope.frameIndexToUnhighlight = i;
          } else {
            $scope.frames[i].highlighted = false;
          }
        }
      }
    });
    $scope.$on(removeFramesOnDeleteEvent, function (event, data) {
      if ($scope.dashboardId === data.dashboardId) {
        for (var i = 0; i < $scope.frames.length; i++) {
          $scope.frames[i].trustedUrl = $sce.trustAsResourceUrl('about:blank');
        }
        $timeout(function () {
          $scope.frames = [];
        }, 25);
      }
    });
    function removeFrameHighlight() {
      $scope.frames[$scope.frameIndexToUnhighlight].highlighted = false;
    }
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      $scope.handleStateChangeSuccess(event, toState, toParams);
    });
    $scope.handleStateChangeSuccess = function (event, toState, toParams) {
      if (!models.dataCached()) {
        $log.warn('GridCtrl: delaying call to handleStateChangeSuccess by 500ms - no data yet');
        $scope.handleStateChangeSuccessInterval = $interval(function () {
          $scope.handleStateChangeSuccess(event, toState, toParams);
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
      if (layoutType !== 'grid') {
        return;
      }
      if (initialized && toParams.dashboardId === $scope.dashboardId) {
        $scope.handleDashboardChange();
        return;
      }
      if (initialized && toParams.dashboardId !== $scope.dashboardId) {
        return;
      }
      $scope.dashboardId = toParams.dashboardId;
      $scope.reloadDashboard();
    };
    function initializeData() {
      if (!models.dataCached()) {
        $log.warn('GridCtrl: delaying initialization by 500ms - no data yet');
        $scope.initInterval = $interval(function () {
          initializeData();
        }, 500, 1);
        return;
      }
      $scope.apps = models.getApplicationData();
    }
    initializeData();
    function handleGridsterResizeStart(uiWidget) {
      uiWidget.element.css('pointer-events', 'none');
    }
    function handleGridsterResizeStop(uiWidget) {
      uiWidget.element.css('pointer-events', 'auto');
      $scope.updateAllFramesAfterChange();
    }
    function handleWindowPxSizeChange() {
      $interval.cancel(intervalPromise);
      intervalPromise = $interval($scope.updateAllFramesAfterChange, 200, 1);
    }
    function handleDeviceSizeChange(value) {
      if (value.deviceSize === 'sm') {
        $scope.deviceSize = value.deviceSize;
        $scope.gridOptions.columns = 3;
        $scope.updateAllFramesAfterChange();
      } else if (value.deviceSize === 'md') {
        $scope.deviceSize = value.deviceSize;
        $scope.gridOptions.columns = 6;
        $scope.updateAllFramesAfterChange();
      } else if (value.deviceSize === 'lg') {
        $scope.deviceSize = 'md';
        $scope.gridOptions.columns = 6;
        $scope.updateAllFramesAfterChange();
      }
    }
    $scope.handleDashboardChange = function () {
      if (!models.dataCached()) {
        $log.warn('GridCtrl: delaying call to handleDashboardChange by 500ms - no data yet');
        $scope.handleDashboardChangeInterval = $interval(function () {
          $scope.handleDashboardChange();
        }, 500, 1);
        return;
      }
      if ($scope.handleDashboardChangeInterval) {
        $interval.cancel($scope.handleDashboardChangeInterval);
      }
      var dashboard = models.getDashboardById($scope.dashboardId);
      if ($scope.frames === dashboard.frames) {
        return;
      }
      var originalFrames = $scope.frames.slice();
      var originalFramesCopy = originalFrames.slice();
      var asyncRemoveFrame = function (i) {
        $scope.frames[i].trustedUrl = $sce.trustAsResourceUrl('about:blank');
        $timeout(function () {
          $scope.frames.splice(i, 1);
        }, 25);
      };
      for (var i = 0; i < originalFramesCopy.length; i++) {
        var removeFrame = true;
        for (var j = 0; j < dashboard.frames.length; j++) {
          if (originalFramesCopy[i].id === dashboard.frames[j].id) {
            removeFrame = false;
          }
        }
        if (removeFrame) {
          asyncRemoveFrame(i);
        }
      }
      var framesToAdd = [];
      for (var k = 0; k < dashboard.frames.length; k++) {
        var addFrame = true;
        for (var l = 0; l < originalFrames.length; l++) {
          if (dashboard.frames[k].id === originalFrames[l].id) {
            addFrame = false;
          }
        }
        if (addFrame) {
          framesToAdd.push(dashboard.frames[k]);
        }
      }
      if (framesToAdd.length > 0) {
        var updateNewFrames = function (frame) {
          $scope.frames.push(frame);
          models.mergeApplicationData($scope.frames);
        };
        for (var m = 0; m < framesToAdd.length; m++) {
          updateNewFrames(framesToAdd[m]);
        }
        $timeout(function () {
          $log.debug('$timeout to apply scope');
        }, 50);
      }
    };
    $scope.reloadDashboard = function () {
      var dashboard = models.getDashboardById($scope.dashboardId);
      if (!dashboard) {
        $log.warn('Dashboard changed, but dashboard does not exist');
        return;
      }
      $scope.dashboard = dashboard;
      $scope.frames = $scope.dashboard.frames;
      models.mergeApplicationData($scope.frames);
      initialized = true;
    };
    $scope.updateFrameAfterChange = function (frame) {
      var frameId = models.updateGridFrame(frame.id, frame.gridLayout);
      if (!frameId) {
        $log.error('ERROR: could not update grid frame');
        return;
      }
      return frameId;
    };
    $scope.updateAllFramesAfterChange = function () {
      var frames = $scope.frames;
      for (var i = 0; i < frames.length; i++) {
        $scope.updateFrameAfterChange(frames[i]);
      }
    };
  }
]);