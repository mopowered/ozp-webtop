'use strict';
angular.module('ozpWebtop.models', [
  'ozp.common.utilities',
  'ozpWebtop.constants',
  'ozpWebtop.services.iwcInterface',
  'ozpWebtop.services.restInterface'
]);
var models = angular.module('ozpWebtop.models');
models.factory('models', [
  '$sce',
  '$q',
  '$log',
  '$http',
  '$window',
  'useIwc',
  'iwcInterface',
  'restInterface',
  'Utilities',
  function ($sce, $q, $log, $http, $window, useIwc, iwcInterface, restInterface, Utilities) {
    var cachedWebtopData = null;
    var cachedApplicationData = null;
    function setWebtopData(webtopData) {
      cachedWebtopData = angular.copy(webtopData);
      if (useIwc) {
        return iwcInterface.setWebtopData(webtopData);
      } else {
        return restInterface.setWebtopData(webtopData);
      }
    }
    return {
      setApplicationData: function (applicationData) {
        if (!applicationData.length) {
          $log.warn('WARNING: no listings found for current user!');
        } else {
          $log.info('found ' + applicationData.length + ' app listings for current user');
        }
        var apps = [];
        for (var i = 0; i < applicationData.length; i++) {
          apps.push({
            'name': applicationData[i].listing.title,
            'id': applicationData[i].listing.uuid,
            'description': 'Description',
            'descriptionShort': 'Short description',
            'state': 'active',
            'type': 'application',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'icons': {
              'small': applicationData[i].listing.imageSmallUrl,
              'large': applicationData[i].listing.imageMediumUrl
            },
            'launchUrls': { 'default': applicationData[i].listing.launchUrl }
          });
        }
        cachedApplicationData = apps;
      },
      getApplicationData: function () {
        return cachedApplicationData;
      },
      setInitialWebtopData: function (webtopData) {
        if (!webtopData.dashboards || webtopData.dashboards.length < 1) {
          $log.warn('WARNING: no dashboardData found for current user!');
          var newWebtopData = {
              'name': 'dashboards',
              'user': 'J Smith',
              'currentDashboard': '0',
              'userSettings': {},
              'persist': true,
              'dashboards': []
            };
          var newBoard = {
              'name': 'Default',
              'id': '0',
              'stickyIndex': 0,
              'layout': 'grid',
              'frames': []
            };
          newWebtopData.dashboards.push(newBoard);
          if (setWebtopData(newWebtopData)) {
            $log.info('default board created OK');
            return true;
          } else {
            $log.error('Failed to create initial dashboard data');
            return false;
          }
        } else {
          $log.info('found ' + webtopData.dashboards.length + ' dashboards for current user');
          cachedWebtopData = angular.copy(webtopData);
          return true;
        }
      },
      getWebtopData: function () {
        return angular.copy(cachedWebtopData);
      },
      dataCached: function () {
        if (cachedWebtopData && cachedApplicationData) {
          return true;
        } else {
          return false;
        }
      },
      getDashboards: function () {
        var data = this.getWebtopData();
        if (data) {
          return data.dashboards;
        } else {
          $log.warn('WARNING: dashboardData is null!');
          return null;
        }
      },
      setAllDashboards: function (dashboards) {
        var webtopData = this.getWebtopData();
        webtopData.dashboards = dashboards;
        return setWebtopData(webtopData);
      },
      updateLayoutType: function (dashboardId, layout) {
        var dashboard = this.getDashboardById(dashboardId);
        var validInputs = [
            'grid',
            'desktop'
          ];
        if (validInputs.indexOf(layout) === -1) {
          $log.error('updateLayoutType received invalid dashboard layout: ' + layout);
          return false;
        }
        dashboard.layout = layout;
        return this.saveDashboard(dashboard);
      },
      toggleFrameKey: function (frameId, key) {
        var frame = this.getFrameById(frameId);
        if (!frame) {
          return false;
        }
        if (frame[key]) {
          frame[key] = false;
        } else {
          frame[key] = true;
        }
        if (this.saveFrame(frame)) {
          return frame[key];
        } else {
          return false;
        }
      },
      updateGridFrame: function (frameId, sizeData) {
        var frame = this.getFrameById(frameId);
        if (!frame) {
          $log.warn('Grid frame not found: ' + frameId);
          return false;
        }
        frame.gridLayout.sm.row = sizeData.sm.row;
        frame.gridLayout.sm.col = sizeData.sm.col;
        frame.gridLayout.sm.sizeX = sizeData.sm.sizeX;
        frame.gridLayout.sm.sizeY = sizeData.sm.sizeY;
        frame.gridLayout.md.row = sizeData.md.row;
        frame.gridLayout.md.col = sizeData.md.col;
        frame.gridLayout.md.sizeX = sizeData.md.sizeX;
        frame.gridLayout.md.sizeY = sizeData.md.sizeY;
        this.saveFrame(frame);
        return frameId;
      },
      updateDesktopFrame: function (frameId, x, y, width, height, zIndex) {
        var frame = this.getFrameById(frameId);
        if (!frame) {
          $log.error('Error: frame with id ' + frameId + ' not found');
          return false;
        }
        if (!frame.isMaximized) {
          frame.desktopLayout.left = x;
          frame.desktopLayout.top = y;
          frame.desktopLayout.width = width;
          frame.desktopLayout.height = height;
          frame.desktopLayout.zIndex = zIndex;
        }
        return this.saveFrame(frame);
      },
      isAppOnDashboard: function (dashboardId, applicationId) {
        var dashboard = this.getDashboardById(dashboardId);
        for (var i = 0; i < dashboard.frames.length; i++) {
          if (dashboard.frames[i].appId === applicationId) {
            return true;
          }
        }
        return false;
      },
      createFrame: function (dashboardId, appId, gridMaxRows) {
        var dashboard = this.getDashboardById(dashboardId);
        var newRowSmall = 0;
        var newRowMedium = 0;
        for (var i = 0; i < dashboard.frames.length; i++) {
          var thisNewRowSmall = dashboard.frames[i].gridLayout.sm.row + dashboard.frames[i].gridLayout.sm.sizeY + 1;
          var thisNewRowMd = dashboard.frames[i].gridLayout.md.row + dashboard.frames[i].gridLayout.md.sizeY + 1;
          if (thisNewRowSmall + 2 > newRowSmall) {
            newRowSmall = thisNewRowSmall;
          }
          if (thisNewRowMd + 2 > newRowMedium) {
            newRowMedium = thisNewRowMd;
          }
        }
        if (newRowSmall > gridMaxRows) {
          $log.error('ERROR: cannot add frame to small row ' + newRowSmall + ', max rows: ' + gridMaxRows);
          return null;
        }
        if (newRowMedium > gridMaxRows) {
          $log.error('ERROR: cannot add frame to medium row ' + newRowMedium + ', max rows: ' + gridMaxRows);
          return null;
        }
        var col = 0;
        var sizeX = 2;
        var sizeY = 2;
        var zIndex = 0;
        var top = 100;
        var left = 100;
        var width = 200;
        var height = 200;
        var utils = new Utilities();
        var frameId = utils.generateUuid();
        var appName = 'unknown';
        var applicationData = this.getApplicationData();
        for (var a = 0; a < applicationData.length; a++) {
          if (applicationData[a].id === appId) {
            appName = applicationData[a].name;
          }
        }
        var newApp = {
            'appId': appId,
            'id': frameId,
            'name': appName,
            'gridLayout': {
              'sm': {
                'row': newRowSmall,
                'col': col,
                'sizeX': 3,
                'sizeY': 1
              },
              'md': {
                'row': newRowMedium,
                'col': col,
                'sizeX': sizeX,
                'sizeY': sizeY
              }
            },
            'desktopLayout': {
              'zIndex': zIndex,
              'top': top,
              'left': left,
              'width': width,
              'height': height
            }
          };
        dashboard.frames.push(newApp);
        this.saveDashboard(dashboard);
        return newApp;
      },
      removeFrame: function (frameId) {
        var dashboards = this.getDashboards();
        var dashboardToUpdate;
        for (var i = 0; i < dashboards.length; i++) {
          var frames = dashboards[i].frames;
          for (var j = 0; j < frames.length; j++) {
            if (frameId === frames[j].id) {
              dashboards[i].frames.splice(j, 1);
              dashboardToUpdate = i;
            }
          }
        }
        if (dashboardToUpdate >= 0) {
          return this.saveDashboard(dashboards[dashboardToUpdate]);
        }
      },
      updateDashboard: function (updatedDashboard) {
        var dashboard = this.getDashboardById(updatedDashboard.id);
        dashboard.name = updatedDashboard.name;
        if (dashboard.layout !== updatedDashboard.layout) {
          $log.debug('dashboard layout changed for board ' + dashboard.name);
          var stickyIndex = this.getNextStickyIndex(updatedDashboard.layout);
          dashboard.layout = updatedDashboard.layout;
          dashboard.stickyIndex = stickyIndex;
          $log.debug('changing stickyIndex of board ' + dashboard.name + ' to ' + stickyIndex);
          this.saveDashboard(dashboard);
        } else {
          $log.debug('dashboard ' + dashboard.name + ' layout did not change');
        }
        return dashboard;
      },
      getCurrentDashboardName: function () {
        var webtopData = this.getWebtopData();
        var currentDashboardId = webtopData.currentDashboard;
        for (var i = 0; i < webtopData.dashboards.length; i++) {
          if (webtopData.dashboards[i].id === currentDashboardId) {
            return webtopData.dashboards[i].name;
          }
        }
      },
      mergeApplicationData: function (frames) {
        var marketplaceApps = this.getApplicationData();
        for (var j = 0; j < frames.length; j++) {
          var foundApp = false;
          for (var i = 0; i < marketplaceApps.length; i++) {
            if (frames[j].appId === marketplaceApps[i].id) {
              foundApp = true;
              frames[j].icon = {};
              frames[j].icon.small = marketplaceApps[i].icons.small;
              frames[j].icon.large = marketplaceApps[i].icons.large;
              frames[j].url = marketplaceApps[i].launchUrls.default;
              var utils = new Utilities();
              var newUrl = utils.updateQueryString('ozpIwc.peer', $window.OzoneConfig.IWC_URL, frames[j].url);
              frames[j].trustedUrl = $sce.trustAsResourceUrl(newUrl);
              frames[j].name = marketplaceApps[i].name;
              frames[j].descriptionShort = marketplaceApps[i].descriptionShort;
              frames[j].singleton = false;
              break;
            }
          }
          if (!foundApp) {
            $log.warn('Found a frame with no corresponding application. Name: ' + frames[j].name);
            frames[j].trustedUrl = 'assets/appNotFound/index.html';
            frames[j].name = frames[j].name + ': Not Found';
            frames[j].singleton = false;
          }
        }
      },
      saveDashboard: function (dashboard) {
        var foundDashboard = false;
        var dashboards = this.getDashboards();
        for (var i = 0; i < dashboards.length; i++) {
          if (dashboards[i].id === dashboard.id) {
            dashboards[i] = dashboard;
            foundDashboard = true;
          }
        }
        if (foundDashboard) {
          return this.setAllDashboards(dashboards);
        } else {
          return false;
        }
      },
      saveFrame: function (frame) {
        var dashboards = this.getDashboards();
        var frameFound = false;
        for (var i = 0; i < dashboards.length; i++) {
          var frames = dashboards[i].frames;
          for (var j = 0; j < frames.length; j++) {
            if (frames[j].id === frame.id) {
              dashboards[i].frames[j] = frame;
              frameFound = true;
            }
          }
        }
        if (frameFound) {
          return this.setAllDashboards(dashboards);
        } else {
          $log.error('frame ' + frame.id + ' not found');
          return false;
        }
      },
      getFrameById: function (frameId) {
        var dashboards = this.getDashboards();
        for (var i = 0; i < dashboards.length; i++) {
          var frames = dashboards[i].frames;
          for (var j = 0; j < frames.length; j++) {
            if (frames[j].id === frameId) {
              return frames[j];
            }
          }
        }
      },
      getDashboardById: function (dashboardId) {
        var dashboards = this.getDashboards();
        if (!dashboards) {
          return null;
        }
        for (var i = 0; i < dashboards.length; i++) {
          if (dashboards[i].id.toString() === dashboardId.toString()) {
            return dashboards[i];
          }
        }
        return null;
      },
      removeDashboard: function (dashboardId) {
        var dashboardData = this.getWebtopData();
        var dashboards = dashboardData.dashboards;
        var idxToRemove = -1;
        for (var i = 0; i < dashboards.length; i++) {
          if (dashboards[i].id.toString() === dashboardId.toString()) {
            idxToRemove = i;
          }
        }
        if (idxToRemove >= 0) {
          dashboardData.dashboards.splice(idxToRemove, 1);
          $log.debug('removed dashboard idx ' + idxToRemove);
          return setWebtopData(dashboardData);
        } else {
          $log.warn('Cannot remove dashboard with id ' + dashboardId + ', does not exit');
          return false;
        }
      },
      createDashboard: function (dashboard) {
        if (!dashboard.layout) {
          dashboard.layout = 'grid';
        }
        var dashboardData = this.getWebtopData();
        var dashboardId = this.getNewDashboardId();
        var nextStickyIndex = this.getNextStickyIndex(dashboard.layout);
        $log.debug('creating new board with sticky slot ' + nextStickyIndex);
        var newBoard = {
            'name': dashboard.name,
            'id': dashboardId,
            'stickyIndex': nextStickyIndex,
            'layout': dashboard.layout,
            'frames': []
          };
        var dashboards = this.getDashboards();
        dashboards.push(newBoard);
        dashboardData.dashboards = dashboards;
        return setWebtopData(dashboardData);
      },
      getNewDashboardId: function () {
        var dashboards = this.getDashboards();
        var existingIds = [];
        var newId = -1;
        if (Object.prototype.toString.call(dashboards) === '[object Array]') {
          for (var i = 0; i < dashboards.length; i++) {
            existingIds.push(Number(dashboards[i].id));
          }
          if (!dashboards || dashboards.length === 0) {
            newId = 0;
          } else {
            newId = Math.max.apply(Math, existingIds) + 1;
          }
          return newId.toString();
        } else {
          $log.error('ERROR: Invalid dashboard data in getNewDashboardId');
        }
      },
      getNextStickyIndex: function (dashboardLayout) {
        var dashboards = this.getDashboards();
        var gridUsedStickySlots = [];
        var desktopUsedStickySlots = [];
        for (var i = 0; i < dashboards.length; i++) {
          if (dashboards[i].layout === 'grid') {
            gridUsedStickySlots.push(dashboards[i].stickyIndex);
          } else if (dashboards[i].layout === 'desktop') {
            desktopUsedStickySlots.push(dashboards[i].stickyIndex);
          } else {
            $log.error('Invalid dashboard layout');
          }
        }
        for (var j = 0; j < 10; j++) {
          if (dashboardLayout === 'grid') {
            if (gridUsedStickySlots.indexOf(j) < 0) {
              return j;
            }
          } else if (dashboardLayout === 'desktop') {
            if (desktopUsedStickySlots.indexOf(j) < 0) {
              return j;
            }
          } else {
            $log.error('Invalid layout passed to getNextStickyIndex: ' + dashboardLayout);
          }
        }
        $log.error('WARNING: Sticky dashboard slots are full!');
      },
      getCurrentDashboard: function () {
        var dashboardData = this.getWebtopData();
        try {
          if (dashboardData.currentDashboard === undefined || dashboardData.currentDashboard === {}) {
            return null;
          }
        } catch (err) {
          return null;
        }
        return this.getDashboardById(dashboardData.currentDashboard);
      },
      cascadeWindows: function (dashboardId, origin, frameSize) {
        var topOffset = 30;
        var leftOffset = 30;
        var dashboard = this.getDashboardById(dashboardId);
        for (var i = 0; i < dashboard.frames.length; i++) {
          try {
            dashboard.frames[i].desktopLayout.zIndex = i;
            dashboard.frames[i].desktopLayout.top = origin.y + i * topOffset;
            dashboard.frames[i].desktopLayout.left = origin.x + i * leftOffset;
            dashboard.frames[i].desktopLayout.width = frameSize.x;
            dashboard.frames[i].desktopLayout.height = frameSize.y;
            dashboard.frames[i].isMaximized = false;
          } catch (err) {
            $log.error('Error in cascadeWindows on board ' + i + ':' + JSON.stringify(err));
          }
        }
        return this.saveDashboard(dashboard);
      },
      getUserSettings: function () {
        return this.getWebtopData().userSettings;
      },
      updateAllUserSettings: function (userSettings) {
        var webtopData = this.getWebtopData();
        webtopData.userSettings = userSettings;
        return setWebtopData(webtopData);
      },
      updateUserSettingByKey: function (key, value) {
        var webtopData = this.getWebtopData();
        if (!webtopData.userSettings) {
          webtopData.userSettings = {};
        }
        webtopData.userSettings[key] = value;
        return setWebtopData(webtopData);
      }
    };
  }
]);