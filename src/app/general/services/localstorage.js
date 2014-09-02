'use strict';
angular.module('ozpWebtopApp.general').factory('LocalStorage', function () {
  var localCache = function (nativeStorage, objSerializer) {
    var storage = nativeStorage || localStorage;
    var serializer = objSerializer || JSON;
    return {
      clear: function () {
        storage.clear();
        return this;
      },
      getItem: function (key, defaultValue) {
        var value = storage.getItem(key);
        if (value === null) {
          return typeof defaultValue !== 'undefined' ? defaultValue : null;
        } else {
          return serializer.parse(value);
        }
      },
      hasItem: function (key) {
        return storage.getItem(key) !== null;
      },
      removeItem: function (key) {
        storage.removeItem(key);
        return this;
      },
      setItem: function (key, value) {
        storage.setItem(key, serializer.stringify(value));
        return this;
      }
    };
  };
  return localCache;
});