'use strict';
angular.module('ozpWebtop.services.iwcInterface', ['ozp.common.iwc.client']);
var app = angular.module('ozpWebtop.services.iwcInterface');
app.factory('iwcInterface', [
  '$q',
  '$log',
  'iwcConnectedClient',
  function ($q, $log, iwcConnectedClient) {
    var readyToSet = true;
    function _getData(dst, resource) {
      $log.debug('iwcClient.api(' + dst + ').get(' + resource + ')');
      return iwcConnectedClient.getClient().then(function (client) {
        return client.api(dst).get(resource).then(function (reply) {
          return reply.entity;
        });
      }).catch(function (error) {
        $log.error('Error getting IWC data: ' + error);
      });
    }
    function _setData(dst, resource, setData) {
      if (readyToSet) {
        readyToSet = false;
        $log.debug('iwcClient.api(' + dst + ').set(' + resource + ')');
        iwcConnectedClient.getClient().then(function (client) {
          client.api(dst).set(resource, setData).then(function (response) {
            if (response.response === 'ok') {
              readyToSet = true;
            } else {
              $log.error('ERROR: setting data for ' + resource + ' in ' + dst + ', response: ' + response);
              readyToSet = true;
            }
          });
        }).catch(function (error) {
          $log.error('ERROR setting IWC data: ' + error);
        });
        return true;
      }
      return false;
    }
    function _appendApplicationData(appResource, appListings) {
      return _getData('system.api', appResource).then(function (appData) {
        appListings.push(appData);
      });
    }
    return {
      getWebtopData: function () {
        return _getData('data.api', '/dashboard-data');
      },
      setWebtopData: function (webtopData) {
        webtopData.persist = true;
        return _setData('data.api', '/dashboard-data', {
          entity: webtopData,
          contentType: 'application/dashboard-data+json'
        });
      },
      getListings: function () {
        var appListings = [];
        return _getData('system.api', '/application').then(function (myApps) {
          return myApps.reduce(function (previous, current) {
            return previous.then(function () {
              var promise = _appendApplicationData(current, appListings);
              return promise;
            }).catch(function (error) {
              $log.error('Error getting Listings: ' + error);
            });
          }, Promise.resolve()).then(function () {
            return { 'apps': appListings };
          });
        });
      }
    };
  }
]);