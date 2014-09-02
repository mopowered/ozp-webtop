'use strict';
angular.module('ozpWebtopApp.dashboardView').controller('GridController', [
  '$scope',
  '$rootScope',
  '$location',
  'dashboardApi',
  'marketplaceApi',
  'dashboardChangeMonitor',
  function ($scope, $rootScope, $location, dashboardApi, marketplaceApi, dashboardChangeMonitor) {
    dashboardChangeMonitor.run();
    $scope.$on('dashboardChange', function (event, data) {
      $scope.dashboardId = data.dashboardId;
    });
    $scope.$watch(function () {
      return $location.path();
    }, function () {
      updateDashboard();
    });
    function updateDashboard() {
      $scope.dashboardId = dashboardChangeMonitor.dashboardId;
      $scope.dashboard = dashboardApi.getDashboardById($scope.dashboardId);
      $scope.frames = $scope.dashboard.frames;
      var allApps = marketplaceApi.getAllApps();
      dashboardApi.mergeApplicationData($scope.frames, allApps);
      for (var j = 0; j < $scope.frames.length; j++) {
        var widgetSize = $scope.updateGridFrameSize($scope.frames[j].id);
        $rootScope.$broadcast('gridSizeChanged', {
          'frameId': $scope.frames[j].id,
          'height': widgetSize.height,
          'width': widgetSize.width
        });
      }
      $scope.customItemMap = {
        sizeX: 'item.gridLayout.sizeX',
        sizeY: 'item.gridLayout.sizeY',
        row: 'item.gridLayout.row',
        col: 'item.gridLayout.col'
      };
      $rootScope.activeFrames = $scope.frames;
    }
    $scope.$watch('frames', function (frames) {
      for (var j = 0; j < frames.length; j++) {
        dashboardApi.updateGridFrame(frames[j].id, frames[j].gridLayout.row, frames[j].gridLayout.col, frames[j].gridLayout.sizeX, frames[j].gridLayout.sizeY);
      }
    }, true);
    $scope.gridOptions = {
      columns: 6,
      pushing: true,
      floating: true,
      width: 'auto',
      colWidth: 'auto',
      rowHeight: 'match',
      margins: [
        20,
        20
      ],
      outerMargin: false,
      isMobile: false,
      minColumns: 1,
      minRows: 1,
      maxRows: 10,
      resizable: {
        enabled: true,
        handles: 'n, e, s, w, ne, se, sw, nw',
        start: function (event, uiWidget) {
          var frameId = uiWidget.element.context.id;
          for (var i = 0; i < $scope.frames.length; i++) {
            if ($scope.frames[i].id === frameId) {
              $scope.frames[i].gridLayout.width = 100;
              $scope.frames[i].gridLayout.height = 100;
              $rootScope.$broadcast('gridSizeChanged', {
                'frameId': frameId,
                'height': 100,
                'width': 100
              });
            }
          }
        },
        resize: function () {
        },
        stop: function (event, uiWidget) {
          var frameId = uiWidget.element.context.id;
          var frameSize = $scope.updateGridFrameSize(frameId);
          dashboardApi.updateFrameSizeOnGrid(frameId, frameSize.width, frameSize.height);
          $rootScope.$broadcast('gridSizeChanged', {
            'frameId': frameId,
            'height': frameSize.height,
            'width': frameSize.width
          });
        }
      },
      draggable: {
        enabled: true,
        handle: 'div.ozp-chrome, div.ozp-chrome > .chrome-icon, div.ozp-chrome > .chrome-name',
        start: function () {
        },
        drag: function () {
        },
        stop: function () {
        }
      }
    };
    $scope.calculateGridFrameSize = function (frameId) {
      var gridsterContainerPadding = 15;
      var cols = $scope.gridOptions.columns;
      var windowWidth = window.innerWidth;
      var colMargin = $scope.gridOptions.margins[0];
      var totalWorkingWidth = windowWidth - 2 * gridsterContainerPadding - (cols - 1) * colMargin;
      var baseWidgetWidth = totalWorkingWidth / cols;
      var baseWidgetHeight = baseWidgetWidth;
      var appInfo = dashboardApi.getFrameById(frameId);
      var sizeX = appInfo.gridLayout.sizeX;
      var sizeY = appInfo.gridLayout.sizeY;
      var widgetWidth = baseWidgetWidth * sizeX + colMargin * (sizeX - 1);
      var widgetHeight = baseWidgetHeight * sizeY + colMargin * (sizeY - 1);
      return {
        'height': widgetHeight,
        'width': widgetWidth
      };
    };
    $scope.updateGridFrameSize = function (frameId) {
      var widgetSize = $scope.calculateGridFrameSize(frameId);
      for (var i = 0; i < $scope.frames.length; i++) {
        if ($scope.frames[i].id === frameId) {
          widgetSize.width -= 10;
          widgetSize.height -= 30;
          $scope.frames[i].gridLayout.width = widgetSize.width;
          $scope.frames[i].gridLayout.height = widgetSize.height;
          dashboardApi.updateFrameSizeOnGrid(frameId, widgetSize.width, widgetSize.height);
          return widgetSize;
        }
      }
    };
  }
]);