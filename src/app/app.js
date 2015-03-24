'use strict';

/**
 * Top level module of the Webtop. When declared in an HTML file, it bootstraps
 * the Webtop.
 *
 * @example
 *     <body ng-app="ozpWebtop"> ... </body>
 *
 * @module ozpWebtop
 * @requires ozp.common.ellipticalFilter
 * @requires ozp.common.iwc.client
 * @requires ozp.common.utilities
 * @requires ozp.common.windowSizeWatcher
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.services.iwcInterface
 * @requires ozpWebtop.services.restInterface
 * @requires ozpWebtop.models
 * @requires ozpWebtop.appToolbar
 * @requires ozpWebtop.ozpToolbar
 * @requires ozpWebtop.dashboardView.button
 * @requires ozpWebtop.dashboardView.chrome
 * @requires ozpWebtop.dashboardView.desktop
 * @requires ozpWebtop.dashboardView.desktop.managedFrame
 * * @requires ozpWebtop.dashboardView
 * @requires ozpWebtop.dashboardView.grid
 * @requires ozpWebtop.addApplicationsModal
 * @requires ozpWebtop.editDashboardModal
 * @requires ozpWebtop.settingsModal
 * @requires ozpWebtop.urlWidgetLauncher
 * @requires ui.router
 * @requires ct.ui.router.extras
 * @requires ui.bootstrap
 * @requires gridster
 * @requires ozpIwcClient
 * @requires ozpClassification
 */
angular.module( 'ozpWebtop', [
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
  'ozpWebtop.editDashboardModal',
  'ozpWebtop.settingsModal',
  'ozpWebtop.urlWidgetLauncher',
  'ui.router',
  'ct.ui.router.extras',
  'ui.bootstrap',
  'gridster',
  'ozpIwcClient',
  'ozpClassification'
])

.config(function($stateProvider, $urlRouterProvider,
                 $logProvider, maxStickyBoards) {

    $logProvider.debugEnabled(true);

    /*
    To avoid losing the internal state of widgets as users switch between
    dashboards, we leverage the 'sticky state' capabilities of ui-router-extras
    such that the DOMs for up to 10 grid layout and 10 desktop layout dashboards
    are not torn down as the user navigates between them.
    */
    var states = [];
    states.push({name: 'dashboardview', url: '/',
      views: {
        '@': {controller: 'DashboardViewCtrl',
          templateUrl: 'dashboardView/dashboardView.tpl.html'}
    }});

    // Sticky views
    for (var slot=0; slot < maxStickyBoards; slot++) {
      var gridViewName = 'gridlayout-' + slot + '@dashboardview';
      var desktopViewName = 'desktoplayout-' + slot + '@dashboardview';
      var gridState = {
        name: 'dashboardview.grid-sticky-' + slot,
        url: 'grid/sticky-' + slot + '/:dashboardId',
        views: {},
        deepStateRedirect: true,
        sticky: true
      };
      gridState.views[gridViewName] = {controller: 'GridCtrl',
        templateUrl: 'dashboardView/grid/grid.tpl.html'};

      states.push(gridState);

      var desktopState = {
        name: 'dashboardview.desktop-sticky-' + slot,
        url: 'desktop/sticky-' + slot + '/:dashboardId',
        views: {},
        deepStateRedirect: true,
        sticky: true
      };
      desktopState.views[desktopViewName] = {controller: 'DesktopCtrl',
        templateUrl: 'dashboardView/desktop/desktop.tpl.html'};

      states.push(desktopState);
    }

    /*
      This is a temporary solution to the problem of opening a widget in a
      dashboard from Center or HUD. Ultimately, this should be done using IWC
      Intents. This URL mechanism is not ideal for many reasons, not least of
      which is the fact that it will open and additonal webtop tab/window, and
      multiple webtop instances is not well supported
     */
    states.push({name: 'url-launch-app', url: '/launchApp/:appId',
      controller: 'UrlWidgetLauncherCtrl'});

    angular.forEach(states, function(state) { $stateProvider.state(state); });
    $urlRouterProvider.otherwise('/');
  })

.run( function run ($rootScope, $state, $http, $window, $log,
                    models, restInterface, useIwc, initialDataReceivedEvent) {

    $rootScope.$state = $state;

    // TODO: flag to optionally use IWC

    /*
      First, get Listing data for the apps/widgets that have been bookmarked by
      the user. Then retrieve their previous webtop data (if any). This is
      the only time we will go to the server (and wait for a response) for
      Listing data and/or webtop data
     */
    restInterface.getListings().then(function(listings) {
      models.setApplicationData(listings);
      restInterface.getWebtopData().then(function(webtopData) {
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
});
