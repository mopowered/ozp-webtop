'use strict';
angular.module('ozp.common.iwc.client', [
  'ozpIwcClient',
  'ozpWebtop.constants'
]);
var app = angular.module('ozp.common.iwc.client');
app.factory('iwcConnectedClient', [
  '$q',
  '$location',
  '$window',
  '$log',
  'iwcClient',
  function ($q, $location, $window, $log, iwcClient) {
    $log.debug('creating iwc client using bus: ' + $window.OzoneConfig.IWC_URL);
    var client = new iwcClient.Client({ peerUrl: $window.OzoneConfig.IWC_URL });
    var isConnected = false;
    var initialConnection = true;
    return {
      getClient: function () {
        var deferred = $q.defer();
        if (isConnected) {
          deferred.resolve(client);
        }
        client.on('connected', function () {
          if (initialConnection) {
            $log.debug('OZP client is connected to bus: ' + client.peerUrl);
            initialConnection = false;
          }
          isConnected = true;
          deferred.resolve(client);
        });
        return deferred.promise;
      },
      getIwcBusUrl: function () {
        return $window.OzoneConfig.IWC_URL;
      }
    };
  }
]);