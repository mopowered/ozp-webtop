'use strict';

var app = angular.module('ozpWebtopApp.ozpIwcClient');

app.factory('ozpIwcClient', function($q, ozpIwc, iwcOzoneBus) {

  var iwcClient = new ozpIwc.Client({
    peerUrl: iwcOzoneBus
  });

  var isConnected = false;

  var initialConnection = true;

  return {
    getClient: function() {
      var deferred = $q.defer();
      if (isConnected) {
        deferred.resolve(true);
      }

      iwcClient.on('connected', function () {
        if (initialConnection) {
          console.log('OZP client is connected');
          initialConnection = false;
        }
        isConnected = true;
        deferred.resolve(iwcClient);
      });

      return deferred.promise;
      }
  };
});