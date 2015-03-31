'use strict';
angular.module('ozpWebtop.dashboardView.button', ['ozp.common.ellipticalFilter']);
angular.module('ozpWebtop.dashboardView.button').directive('ozpButton', function () {
  return {
    replace: true,
    templateUrl: 'dashboardView/button/ozpbutton.tpl.html',
    restrict: 'E'
  };
});