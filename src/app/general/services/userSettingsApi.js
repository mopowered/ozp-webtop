'use strict';
var app = angular.module('ozpWebtopApp.apis');
app.service('localStorageUserSettingsApiImpl', [
  '$http',
  'LocalStorage',
  function ($http, LocalStorage) {
    var cache = new LocalStorage(localStorage, JSON);
    this.getUserSettings = function () {
      var userSettings = cache.getItem('userSettings');
      return userSettings;
    };
    this.updateAllUserSettings = function (userSettings) {
      cache.setItem('userSettings', userSettings);
    };
    this.createExampleUserSettings = function () {
      var userSettings = {
          'theme': 'dark',
          'autohideToolbars': false
        };
      this.updateAllUserSettings(userSettings);
    };
  }
]);
app.service('iwcUserSettingsApiImpl', function () {
  this.getUserSettings = function () {
  };
  this.updateAllUserSettings = function () {
  };
});
app.factory('userSettingsApi', [
  '$window',
  '$injector',
  function ($window, $injector) {
    if ($window.iwc) {
      return $injector.get('iwcUserSettingsApiImpl');
    } else {
      return $injector.get('localStorageUserSettingsApiImpl');
    }
  }
]);