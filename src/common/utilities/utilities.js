'use strict';
angular.module('ozp.common.utilities', []);
angular.module('ozp.common.utilities').factory('Utilities', function () {
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
      },
      updateQueryString: function (key, value, url) {
        if (!url) {
          url = window.location.href;
        }
        var re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi'), hash;
        if (re.test(url)) {
          if (typeof value !== 'undefined' && value !== null) {
            return url.replace(re, '$1' + key + '=' + value + '$2$3');
          } else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
              url += '#' + hash[1];
            }
            return url;
          }
        } else {
          if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
              url += '#' + hash[1];
            }
            return url;
          } else {
            return url;
          }
        }
      }
    };
  };
  return utilities;
});