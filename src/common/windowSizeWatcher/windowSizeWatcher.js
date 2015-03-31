'use strict';
angular.module('ozp.common.windowSizeWatcher', ['ozpWebtop.constants']);
angular.module('ozp.common.windowSizeWatcher').factory('windowSizeWatcher', [
  '$rootScope',
  '$window',
  'deviceSizeChangedEvent',
  'windowSizeChangedEvent',
  function ($rootScope, $window, deviceSizeChangedEvent, windowSizeChangedEvent) {
    var previousDeviceSize = '';
    var deviceSize = '';
    function processWindowSizeChange(newWidth) {
      if (newWidth < 768) {
        deviceSize = 'xs';
      } else if (newWidth < 992) {
        deviceSize = 'sm';
      } else if (newWidth < 1200) {
        deviceSize = 'md';
      } else {
        deviceSize = 'lg';
      }
      if (previousDeviceSize !== deviceSize) {
        previousDeviceSize = deviceSize;
        $rootScope.$broadcast(deviceSizeChangedEvent, { deviceSize: deviceSize });
      }
      $rootScope.$broadcast(windowSizeChangedEvent);
    }
    return {
      run: function () {
        $rootScope.$watch(function () {
          return $window.innerWidth;
        }, function (value) {
          processWindowSizeChange(value);
        });
      },
      getCurrentSize: function () {
        return deviceSize;
      }
    };
  }
]);