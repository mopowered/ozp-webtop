'use strict';
angular.module('ozpWebtop', [
  'ozp.common.ellipticalFilter',
  'ozp.common.iwc.client',
  'ozp.common.utilities',
  'ozp.common.windowSizeWatcher',
  'templates-app',
  'templates-common',
  'ozpWebtop.constants',
  'ozpWebtop.services.iwcInterface',
  'ozpWebtop.services.restInterface',
  'ozpWebtop.models',
  'ozpWebtop.appToolbar',
  'ozpWebtop.ozpToolbar',
  'ozpWebtop.dashboardView.button',
  'ozpWebtop.dashboardView.chrome',
  'ozpWebtop.dashboardView.desktop',
  'ozpWebtop.dashboardView.desktop.managedFrame',
  'ozpWebtop.dashboardView',
  'ozpWebtop.dashboardView.grid',
  'ozpWebtop.addApplicationsModal',
  'ozpWebtop.settingsModal',
  'ozpWebtop.editDashboardModal',
  'ozpWebtop.urlWidgetLauncher',
  'ui.router',
  'ct.ui.router.extras',
  'ui.bootstrap',
  'gridster',
  'ozpIwcClient',
  'ozpClassification'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  '$logProvider',
  'maxStickyBoards',
  function ($stateProvider, $urlRouterProvider, $logProvider, maxStickyBoards) {
    $logProvider.debugEnabled(true);
    var states = [];
    states.push({
      name: 'dashboardview',
      url: '/',
      views: {
        '@': {
          controller: 'DashboardViewCtrl',
          templateUrl: 'dashboardView/dashboardView.tpl.html'
        }
      }
    });
    for (var slot = 0; slot < maxStickyBoards; slot++) {
      var gridViewName = 'gridlayout-' + slot + '@dashboardview';
      var desktopViewName = 'desktoplayout-' + slot + '@dashboardview';
      var gridState = {
          name: 'dashboardview.grid-sticky-' + slot,
          url: 'grid/sticky-' + slot + '/:dashboardId',
          views: {},
          deepStateRedirect: true,
          sticky: true
        };
      gridState.views[gridViewName] = {
        controller: 'GridCtrl',
        templateUrl: 'dashboardView/grid/grid.tpl.html'
      };
      states.push(gridState);
      var desktopState = {
          name: 'dashboardview.desktop-sticky-' + slot,
          url: 'desktop/sticky-' + slot + '/:dashboardId',
          views: {},
          deepStateRedirect: true,
          sticky: true
        };
      desktopState.views[desktopViewName] = {
        controller: 'DesktopCtrl',
        templateUrl: 'dashboardView/desktop/desktop.tpl.html'
      };
      states.push(desktopState);
    }
    states.push({
      name: 'url-launch-app',
      url: '/launchApp/:appId',
      controller: 'UrlWidgetLauncherCtrl'
    });
    angular.forEach(states, function (state) {
      $stateProvider.state(state);
    });
    $urlRouterProvider.otherwise('/');
  }
]).run([
  '$rootScope',
  '$state',
  '$http',
  '$window',
  '$log',
  'models',
  'restInterface',
  'useIwc',
  'initialDataReceivedEvent',
  function run($rootScope, $state, $http, $window, $log, models, restInterface, useIwc, initialDataReceivedEvent) {
    $rootScope.$state = $state;
    restInterface.getListings().then(function (listings) {
      models.setApplicationData(listings);
      restInterface.getWebtopData().then(function (webtopData) {
        if (webtopData) {
          models.setInitialWebtopData(webtopData);
          $log.info('application listings and dashboard data retrieved - ready to start');
          $rootScope.$broadcast(initialDataReceivedEvent);
        } else {
          $log.warn('No dashboard data found. Creating default dashboard');
          models.setInitialWebtopData({});
          $log.info('application listings and dashboard data retrieved - ready to start');
          $rootScope.$broadcast(initialDataReceivedEvent);
        }
      });
    });
  }
]);