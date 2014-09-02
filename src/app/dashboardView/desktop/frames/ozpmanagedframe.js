'use strict';
angular.module('ozpWebtopApp.dashboardView').directive('ozpManagedFrame', [
  'compareUrl',
  '$http',
  '$compile',
  '$document',
  'dashboardApi',
  function (compareUrl, $http, $compile, $document, dashboardApi) {
    var getTemplate = function (sameOrigin) {
      var template = '';
      if (!sameOrigin) {
        template = 'dashboardView/templates/managediframe.tpl.html';
      } else {
        template = 'dashboardView/templates/managedframe.tpl.html';
      }
      return template;
    };
    return {
      restrict: 'E',
      template: '<div ng-include="getContentUrl()"></div>',
      link: function (scope, element) {
        var startX = scope.frame.desktopLayout.left;
        var startY = scope.frame.desktopLayout.top;
        var x = startX, y = startY;
        element.on('mousedown', function (event) {
          if (scope.frame.desktopLayout.zIndex <= scope.max.zIndex) {
            scope.frame.desktopLayout.zIndex = scope.max.zIndex + 1;
            scope.max.zIndex = scope.frame.desktopLayout.zIndex;
            element.css({ zIndex: scope.frame.desktopLayout.zIndex });
            dashboardApi.updateDesktopFrame(scope.frame.id, x, y, scope.max.zIndex);
          }
          event.preventDefault();
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });
        function mousemove(event) {
          y = event.pageY - startY;
          x = event.pageX - startX;
          element.css({
            top: y + 'px',
            left: x + 'px'
          });
        }
        function mouseup() {
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
          dashboardApi.updateDesktopFrame(scope.frame.id, x, y, scope.max.zIndex);
        }
        var origin = compareUrl(scope.frame.url);
        scope.getContentUrl = function () {
          return getTemplate(origin);
        };
        scope.styles = {
          'top': scope.frame.desktopLayout.top,
          'left': scope.frame.desktopLayout.left,
          'height': function () {
            console.log(scope.frame.desktopLayout.height);
            return scope.frame.desktopLayout.height;
          },
          'width': scope.frame.desktopLayout.width,
          'z-index': scope.frame.desktopLayout.zIndex
        };
      }
    };
  }
]);