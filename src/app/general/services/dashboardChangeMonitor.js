'use strict';
angular.module('ozpWebtopApp.general').factory('dashboardChangeMonitor', [
  '$rootScope',
  '$location',
  function ($rootScope, $location) {
    var service = {};
    service.layout = '';
    service.dashboardId = '';
    service.run = function () {
      $rootScope.$watch(function () {
        return $location.path();
      }, function () {
        var dashboardChange = {};
        var urlPath = $location.path();
        var pattern = new RegExp('/(?:grid|desktop)/([0-9]+)');
        var res = pattern.exec(urlPath);
        if (res) {
          service.dashboardId = res[1];
        } else {
          return;
        }
        var n = $location.path().indexOf('grid');
        if (n !== -1) {
          service.layout = 'grid';
        } else {
          service.layout = 'desktop';
        }
        dashboardChange.layout = service.layout;
        dashboardChange.dashboardId = service.dashboardId;
        $rootScope.$broadcast('dashboardChange', dashboardChange);
      });
    };
    return service;
  }
]);