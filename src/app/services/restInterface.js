'use strict';
angular.module('ozpWebtop.services.restInterface', []);
var app = angular.module('ozpWebtop.services.restInterface');
app.factory('restInterface', [
  '$window',
  '$log',
  '$http',
  '$q',
  '$interval',
  function ($window, $log, $http, $q, $interval) {
    var readyToPut = true;
    var webtopDataToRetrySaving = null;
    var service = {
        setWebtopData: function (webtopData) {
          if (readyToPut) {
            readyToPut = false;
            var url = $window.OzoneConfig.API_URL + '/profile/self/data/dashboard-data';
            var req = {
                method: 'PUT',
                url: url,
                headers: { 'Content-Type': 'application/vnd.ozp-iwc-data-object-v1+json' },
                data: webtopData,
                withCredentials: true
              };
            $http(req).success(function () {
              readyToPut = true;
            }).error(function (data, status) {
              $log.error('Error from PUT at ' + url + ', status: ' + status + ', msg: ' + JSON.stringify(data));
              readyToPut = true;
            });
            webtopDataToRetrySaving = null;
            return true;
          }
          webtopDataToRetrySaving = webtopData;
          return false;
        },
        getWebtopData: function () {
          var deferred = $q.defer();
          $http.get($window.OzoneConfig.API_URL + '/profile/self/data/dashboard-data', {
            withCredentials: true,
            headers: { 'Content-Type': 'application/vnd.ozp-iwc-data-object-v1+json' }
          }).success(function (data, status) {
            if (status !== 200) {
              $log.warn('WARNING: got non 200 status from /profile/self/data/dashboard-data: ' + status);
            }
            deferred.resolve(JSON.parse(data['entity']));
          }).error(function (data, status) {
            if (status === 404) {
            } else {
              $log.error('ERROR getting dashboard data. status: ' + JSON.stringify(status) + ', data: ' + JSON.stringify(data));
              return false;
            }
            deferred.resolve({});
          });
          return deferred.promise;
        },
        getListings: function () {
          var deferred = $q.defer();
          $http.get($window.OzoneConfig.API_URL + '/profile/self/library', {
            withCredentials: true,
            headers: { 'Content-Type': 'application/vnd.ozp-library-v1+json' }
          }).success(function (data, status) {
            if (status !== 200) {
              $log.warn('WARNING: got non 200 status from /profile/self/library: ' + status);
            }
            deferred.resolve(data);
          }).error(function (data, status) {
            $log.error('ERROR getting user library. status: ' + JSON.stringify(status) + ', data: ' + JSON.stringify(data));
            deferred.reject(data);
          });
          return deferred.promise;
        }
      };
    function retryPut() {
      if (webtopDataToRetrySaving) {
        $log.debug('Retrying PUT request');
        service.setWebtopData(webtopDataToRetrySaving);
      }
    }
    $interval(retryPut, 500);
    return service;
  }
]);