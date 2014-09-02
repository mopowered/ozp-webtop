'use strict';

angular.module( 'ozpWebtopApp', [
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
])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('grid', {
      url: '/grid/{dashboardId}',
      templateUrl: 'dashboardView/grid/grid.tpl.html',
      controller: 'GridController'
    })
    .state('desktop', {
      url: '/desktop/{dashboardId}',
      templateUrl: 'dashboardView/desktop/desktop.tpl.html',
      controller: 'DesktopController'
    });

    $urlRouterProvider.otherwise('/grid/0');
  })

.run( function run (dashboardApi, marketplaceApi, userSettingsApi) {
    // create example marketplace and dashboard resources
    marketplaceApi.createExampleMarketplace();
    dashboardApi.createExampleDashboards();
    // create example user settings
    userSettingsApi.createExampleUserSettings();
});

angular.module('ozpWebtopApp.general', []);
angular.module('ozpWebtopApp.userSettings', ['ozpWebtopApp.apis']);
angular.module('ozpWebtopApp.apis', ['ozpWebtopApp.general']);
angular.module('ozpWebtopApp.components', []);
angular.module('ozpWebtopApp.dashboardToolbar', ['ozpWebtopApp.apis']);
angular.module('ozpWebtopApp.appToolbar', ['ui.router', 'ozpWebtopApp.apis']);
angular.module('ozpWebtopApp.dashboardView', ['ozpWebtopApp.apis']);

