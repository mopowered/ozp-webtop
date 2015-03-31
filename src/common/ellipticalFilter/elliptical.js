'use strict';
angular.module('ozp.common.ellipticalFilter', []);
angular.module('ozp.common.ellipticalFilter').filter('elliptical', function () {
  var LENGTH_DEFAULT = 8;
  return function (text, ellipOption, maxLength) {
    maxLength = maxLength || LENGTH_DEFAULT;
    var shortenedText = text.slice(0, maxLength);
    if (ellipOption && shortenedText !== text) {
      shortenedText += ' ...';
    }
    return shortenedText;
  };
});