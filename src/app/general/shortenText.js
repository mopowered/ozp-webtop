'use strict';
angular.module('ozpWebtopApp.general').filter('elliptical', function () {
  var LENGTH_DEFAULT = 8;
  return function (text, ellipOption, maxLength) {
    maxLength = maxLength || LENGTH_DEFAULT;
    if (text.length < maxLength || !ellipOption) {
      return text;
    } else {
      return text.slice(0, maxLength) + ' ...';
    }
  };
});