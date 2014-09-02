'use strict';
angular.module('ozpWebtopApp', [
  'templates-app',
  'templates-common',
  'ozpWebtopApp.general',
  'ozpWebtopApp.apis',
  'ozpWebtopApp.components',
  'ozpWebtopApp.dashboardToolbar',
  'ozpWebtopApp.appToolbar',
  'ozpWebtopApp.dashboardView',
  'ozpWebtopApp.userSettings',
  'ui.router',
  'ui.bootstrap',
  'gridster',
  'ozpClassification'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('grid', {
      url: '/grid/{dashboardId}',
      templateUrl: 'dashboardView/grid/grid.tpl.html',
      controller: 'GridController'
    }).state('desktop', {
      url: '/desktop/{dashboardId}',
      templateUrl: 'dashboardView/desktop/desktop.tpl.html',
      controller: 'DesktopController'
    });
    $urlRouterProvider.otherwise('/grid/0');
  }
]).run([
  'dashboardApi',
  'marketplaceApi',
  'userSettingsApi',
  function run(dashboardApi, marketplaceApi, userSettingsApi) {
    marketplaceApi.createExampleMarketplace();
    dashboardApi.createExampleDashboards();
    userSettingsApi.createExampleUserSettings();
  }
]);
angular.module('ozpWebtopApp.general', []);
angular.module('ozpWebtopApp.userSettings', ['ozpWebtopApp.apis']);
angular.module('ozpWebtopApp.apis', ['ozpWebtopApp.general']);
angular.module('ozpWebtopApp.components', []);
angular.module('ozpWebtopApp.dashboardToolbar', ['ozpWebtopApp.apis']);
angular.module('ozpWebtopApp.appToolbar', [
  'ui.router',
  'ozpWebtopApp.apis'
]);
angular.module('ozpWebtopApp.dashboardView', ['ozpWebtopApp.apis']);