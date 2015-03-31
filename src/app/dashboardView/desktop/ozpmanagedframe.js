'use strict';
angular.module('ozpWebtop.dashboardView.desktop.managedFrame', ['ozpWebtop.models']);
angular.module('ozpWebtop.dashboardView.desktop.managedFrame').directive('ozpManagedFrame', [
  '$log',
  'models',
  function ($log, models) {
    return {
      restrict: 'E',
      templateUrl: 'dashboardView/desktop/managediframe.tpl.html',
      scope: { 'myframe': '=' },
      link: function (scope, element) {
        var resizableConfig = {
            handles: 'nw, sw, se, ne',
            aspectRatio: false,
            ghost: true,
            minWidth: 210,
            minHeight: 210,
            containment: '.desktop-view',
            start: function (event, ui) {
              angular.element('body').css('pointer-events', 'none');
              start(event, ui);
            },
            stop: function (event, ui) {
              angular.element('body').css('pointer-events', 'auto');
              stop(event, ui);
            }
          };
        var draggableConfig = {
            addClasses: true,
            scrollSensitivity: 100,
            scrollSpeed: 100,
            iframeFix: true,
            containment: '.desktop-view',
            start: function (event, ui) {
              start(event, ui);
            },
            stop: function (event, ui) {
              stop(event, ui);
            }
          };
        if (!scope.myframe) {
          $log.error('ERROR, scope.myframe is not defined');
          return;
        }
        scope.zIndexMax = 0;
        element.draggable(draggableConfig);
        element.resizable(resizableConfig);
        var startX = scope.myframe.desktopLayout.left;
        var startY = scope.myframe.desktopLayout.top;
        var x = startX, y = startY;
        function start(event) {
          var className = event.target ? event.target.className : event.srcElement.className;
          if (className.indexOf('icons') > -1) {
            $log.debug('preventDefault on mousedown event and returning');
            event.preventDefault();
            return;
          }
          bringToFront();
          startX = event.pageX - x;
          startY = event.pageY - y;
        }
        function stop(event) {
          y = event.pageY - startY;
          x = event.pageX - startX;
          var className = event.target ? event.target.className : event.srcElement.className;
          if (className.indexOf('icons') > -1) {
            $log.debug('stop() prevent default on mouseup and returning');
            event.preventDefault();
            return;
          }
          saveFramePosition();
        }
        function bringToFront() {
          var dashboard = models.getDashboardById(scope.dashboardId);
          for (var i = 0; i < dashboard.frames.length; i++) {
            if (dashboard.frames[i].desktopLayout.zIndex > scope.zIndexMax) {
              scope.zIndexMax = dashboard.frames[i].desktopLayout.zIndex;
            }
          }
          scope.zIndexMax += 1;
          element.css({ zIndex: scope.zIndexMax });
          saveFramePosition();
        }
        function onMouseDown(event) {
          var className = event.target ? event.target.className : event.srcElement.className;
          if (className.indexOf('icons') > -1) {
            event.preventDefault();
            return;
          }
          bringToFront();
        }
        function saveFramePosition() {
          models.updateDesktopFrame(scope.myframe.id, element[0].offsetLeft, element[0].offsetTop, element[0].offsetWidth, element[0].offsetHeight, scope.zIndexMax);
        }
        element.on('mousedown', onMouseDown);
        var dashboards = models.getDashboards();
        for (var i = 0; i < dashboards.length; i++) {
          for (var j = 0; j < dashboards[i].frames.length; j++) {
            if (dashboards[i].frames[j].id === scope.myframe.id) {
              scope.dashboardId = dashboards[i].id;
            }
          }
        }
      }
    };
  }
]);