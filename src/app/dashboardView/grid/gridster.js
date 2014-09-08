'use strict';
angular.module('ozpWebtopApp.dashboardView').directive('ozpGridsterItem', [
  '$compile',
  '$http',
  '$templateCache',
  '$timeout',
  'compareUrl',
  'dashboardApi',
  function ($compile, $http, $templateCache, $timeout, compareUrl, dashboardApi) {
    return {
      replace: true,
      restrict: 'AE',
      scope: { frame: '=' },
      link: function (scope, element) {
        var origin = compareUrl(scope.frame.url);
        var template;
        if (origin === true) {
          template = $templateCache.get('dashboardView/templates/managedframe.tpl.html');
        } else {
          template = $templateCache.get('dashboardView/templates/managediframe.tpl.html');
        }
        element.html($compile(template)(scope));
        element.addClass('ozp-managed-frame');
        scope.$on('gridSizeChanged', function (event, data) {
          if (data.frameId === scope.frameId) {
            scope.styles.height = data.height;
            scope.styles.width = data.width;
          }
        });
        scope.styles = {
          'height': 100,
          'width': 100
        };
        $timeout(function () {
          scope.frameId = element.context.id;
          var frameSize = dashboardApi.getFrameSizeOnGrid(scope.frameId);
          scope.styles = {
            'height': frameSize.height,
            'width': frameSize.width
          };
        });
      }
    };
  }
]);