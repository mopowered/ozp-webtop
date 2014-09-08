'use strict';
angular.module('ozpWebtopApp.general').factory('compareUrl', function () {
  var compareUrl = function (url) {
    var loc = window.location, a = document.createElement('a');
    a.href = url;
    if (!a.port) {
      inferPort(a);
    }
    if (!loc.port) {
      inferPort(loc);
    }
    return false;
  };
  var inferPort = function (obj) {
    if (obj.protocol === 'https:') {
      obj.port = '443';
    } else if (obj.protocol === 'http:') {
      obj.port = '80';
    }
  };
  return compareUrl;
});