'use strict';
angular.module('ozpWebtopApp.components').directive('ozpButton', function () {
  return {
    replace: true,
    templateUrl: 'components/button/ozpbutton.tpl.html',
    restrict: 'E'
  };
});