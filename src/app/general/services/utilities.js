'use strict';
angular.module('ozpWebtopApp.general').factory('Utilities', function () {
  var utilities = function () {
    return {
      generateUuid: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : r & 7 | 8).toString(16);
          });
        return uuid;
      },
      eliminateDuplicates: function (arr) {
        var i, len = arr.length, out = [], obj = {};
        for (i = 0; i < len; i++) {
          obj[arr[i]] = 0;
        }
        for (i in obj) {
          out.push(i);
        }
        return out;
      }
    };
  };
  return utilities;
});