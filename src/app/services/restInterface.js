'use strict';

/**
 * Interface for working with the ozp-rest API
 *
 * @module ozpWebtop.services.restInterface
 */
angular.module('ozpWebtop.services.restInterface', []);

var app = angular.module('ozpWebtop.services.restInterface');

/**
 * Interface for working with ozp-rest
 *
 * ngtype: factory
 *
 * @class restInterface
 * @constructor
 * @param $window ng $window service
 * @param $log ng $log service
 * @param $http ng $http service
 * * @param $q ng $q service
 * @namespace services
 */
app.factory('restInterface', function($window, $log, $http, $q) {

  // flag to ensure multiple PUT requests are not made concurrently
  var readyToPut = true;

  return {
    /**
     * Set all webtop data
     *
     * This method uses HTTP requests directly on the api/profile/self/data
     * endpoint intented for use exclusively by IWC
     *
     * If another PUT request is already processing, this method will simply
     * return. Even if the request does go through, it will return immediately
     * and ignore the response - this is by design.
     *
     * @method setWebtopData
     * @returns true if request was made, false otherwise
     */
    setWebtopData: function (webtopData) {
      if (readyToPut) {
        readyToPut = false;
        // TODO: change dashboard-data to ozp-webtop-data
        var url = $window.OzoneConfig.API_URL + '/profile/self/data/dashboard-data';
        var req = {
          method: 'PUT',
          url: url,
          headers: {
            'Content-Type': 'application/vnd.ozp-iwc-data-object-v1+json'
          },
          data: webtopData,
          withCredentials: true,
        };

        $http(req).success(function() {
          readyToPut = true;
        }).error(function(data, status) {
          $log.error('Error from PUT at ' + url + ', status: ' + status + ', msg: ' + JSON.stringify(data));
          readyToPut = true;
        });

        return true;
      }
      return false;
    },
    /**
     * Get all webtop data
     *
     * This method uses HTTP requests directly on the api/profile/self/data
     * endpoint intented for use exclusively by IWC
     *
     * @method getWebtopData
     * @returns {promise}
     */
    getWebtopData: function () {
      var deferred = $q.defer();
      $http.get(
        // TODO: change dashboard-data to ozp-webtop-data
        $window.OzoneConfig.API_URL + '/profile/self/data/dashboard-data', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/vnd.ozp-iwc-data-object-v1+json'
          }
        }).success(function(data, status) {
          if (status !== 200) {
            $log.warn('WARNING: got non 200 status from /profile/self/data/dashboard-data: ' + status);
          }
          deferred.resolve(JSON.parse(data['entity']));  // jshint ignore:line
      }).error(function(data, status) {
          if (status === 404) {
          } else {
           $log.error('ERROR getting dashboard data. status: ' + JSON.stringify(status) + ', data: ' + JSON.stringify(data));
            return false;
          }
          deferred.resolve({});
      });
      return deferred.promise;
    },
    /**
     * Get all Listings (applications/widgets) for user
     * @method getListings
     * @returns {promise} (null if not found or error)
     */
    getListings: function() {
      var deferred = $q.defer();
      $http.get($window.OzoneConfig.API_URL + '/profile/self/library', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/vnd.ozp-library-v1+json'
        }
      }).success(function(data, status) {
        if (status !== 200) {
          $log.warn('WARNING: got non 200 status from /profile/self/library: ' +
            status);
        }
        deferred.resolve(data);
      }).error(function(data, status) {
        $log.error('ERROR getting user library. status: ' + JSON.stringify(status) +
          ', data: ' + JSON.stringify(data));
        deferred.reject(data);
      });
      return deferred.promise;
    }
  };
});