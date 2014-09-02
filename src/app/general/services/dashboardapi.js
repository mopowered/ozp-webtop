'use strict';
var app = angular.module('ozpWebtopApp.apis');
Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
app.service('localStorageDashboardApiImpl', [
  '$http',
  'LocalStorage',
  'Utilities',
  function ($http, LocalStorage, Utilities) {
    var cache = new LocalStorage(localStorage, JSON);
    this.getDashboardData = function () {
      if (!cache.hasItem('dashboards')) {
        console.log('ERROR: No dashboards');
        return null;
      }
      var dashboards = cache.getItem('dashboards');
      return dashboards;
    };
    this.getDashboards = function () {
      var dashboardData = this.getDashboardData();
      if (dashboardData) {
        return dashboardData.dashboards;
      } else {
        return null;
      }
    };
    this._setDashboardData = function (dashboardData) {
      cache.removeItem('dashboards');
      cache.setItem('dashboards', dashboardData);
    };
    this.setAllDashboards = function (dashboards) {
      var dashboardData = this.getDashboardData();
      dashboardData.dashboards = dashboards;
      this._setDashboardData(dashboardData);
    };
    this.updateLayoutType = function (dashboardId, layout) {
      var validInputs = [
          'grid',
          'desktop'
        ];
      if (validInputs.indexOf(layout) === -1) {
        return false;
      }
      var dashboard = this.getDashboardById(dashboardId);
      dashboard.layout = layout;
      this.saveDashboard(dashboard);
      return true;
    };
    this.updateGridFrame = function (frameId, row, col, sizeX, sizeY) {
      var frame = this.getFrameById(frameId);
      if (!frame) {
        return false;
      }
      frame.gridLayout.row = row;
      frame.gridLayout.col = col;
      frame.gridLayout.sizeX = sizeX;
      frame.gridLayout.sizeY = sizeY;
      this.saveFrame(frame);
      return true;
    };
    this.updateDesktopFrame = function (frameId, x, y, zIndex) {
      var frame = this.getFrameById(frameId);
      if (!frame) {
        return false;
      }
      frame.desktopLayout.left = x;
      frame.desktopLayout.top = y;
      frame.desktopLayout.zIndex = zIndex;
      this.saveFrame(frame);
      return true;
    };
    this.isAppOnDashboard = function (dashboardId, applicationId) {
      var dashboard = this.getDashboardById(dashboardId);
      console.log(dashboard);
      for (var i = 0; i < dashboard.frames.length; i++) {
        if (dashboard.frames[i].appId === applicationId) {
          return true;
        }
      }
      return false;
    };
    this.createFrame = function (dashboardId, appId, gridMaxRows) {
      var dashboard = this.getDashboardById(dashboardId);
      var usedRows = [];
      for (var i = 0; i < dashboard.frames.length; i++) {
        usedRows.push(dashboard.frames[i].gridLayout.row);
      }
      var maxUsedRow = Math.max.apply(Math, usedRows);
      var row = maxUsedRow + 1;
      if (row > gridMaxRows) {
        console.log('ERROR: not enough rows in grid');
        return null;
      }
      var col = 0;
      var sizeX = 1;
      var sizeY = 1;
      var zIndex = 0;
      var top = 100;
      var left = 100;
      var width = 200;
      var height = 200;
      var utils = new Utilities();
      var frameId = utils.generateUuid();
      var newApp = {
          'appId': appId,
          'id': frameId,
          'gridLayout': {
            'row': row,
            'col': col,
            'sizeX': sizeX,
            'sizeY': sizeY
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
    };
    this.removeFrame = function (frameId) {
      var dashboards = this.getDashboards();
      for (var i = 0; i < dashboards.length; i++) {
        var frames = dashboards[i].frames;
        for (var j = 0; j < frames.length; j++) {
          if (frameId === frames[j].id) {
            dashboards[i].frames.splice(j, 1);
            this.saveDashboard(dashboards[i]);
            return true;
          }
        }
        return false;
      }
    };
    this.updateDefaultDashboardName = function (dashboardName) {
      var dashboardData = this.getDashboardData();
      for (var i = 0; i < dashboardData.dashboards.length; i++) {
        if (dashboardData.dashboards[i].name === dashboardName) {
          dashboardData.defaultDashboard = dashboardData.dashboards[i].id;
          this._setDashboardData(dashboardData);
          return true;
        }
      }
      return false;
    };
    this.getDefaultDashboardName = function () {
      var dashboards = this.getDashboardData();
      var defaultDashboardId = dashboards.defaultDashboard;
      for (var i = 0; i < dashboards.dashboards.length; i++) {
        if (dashboards.dashboards[i].id === defaultDashboardId) {
          return dashboards.dashboards[i].name;
        }
      }
      return null;
    };
    this.mergeApplicationData = function (frames, marketplaceApps) {
      for (var i = 0; i < marketplaceApps.length; i++) {
        for (var j = 0; j < frames.length; j++) {
          if (frames[j].appId === marketplaceApps[i].id) {
            frames[j].icon = marketplaceApps[i].icon;
            frames[j].url = marketplaceApps[i].url;
            frames[j].name = marketplaceApps[i].name;
            frames[j].shortDescription = marketplaceApps[i].shortDescription;
          }
        }
      }
    };
    this.updateFrameSizeOnGrid = function (frameId, width, height) {
      var frame = this.getFrameById(frameId);
      frame.gridLayout.width = width;
      frame.gridLayout.height = height;
      this.saveFrame(frame);
    };
    this.getFrameSizeOnGrid = function (frameId) {
      var frame = this.getFrameById(frameId);
      var widgetSize = {};
      widgetSize.width = frame.gridLayout.width;
      widgetSize.height = frame.gridLayout.height;
      return widgetSize;
    };
    this.saveDashboard = function (dashboard) {
      var dashboards = this.getDashboards();
      for (var i = 0; i < dashboards.length; i++) {
        if (dashboards[i].id === dashboard.id) {
          dashboards[i] = dashboard;
          this.setAllDashboards(dashboards);
          return true;
        }
      }
      return false;
    };
    this.saveFrame = function (frame) {
      var dashboards = this.getDashboards();
      for (var i = 0; i < dashboards.length; i++) {
        var frames = dashboards[i].frames;
        for (var j = 0; j < frames.length; j++) {
          if (frames[j].id === frame.id) {
            dashboards[i].frames[j] = frame;
            this.setAllDashboards(dashboards);
            return true;
          }
        }
      }
      return false;
    };
    this.getFrameById = function (frameId) {
      var dashboards = this.getDashboards();
      for (var i = 0; i < dashboards.length; i++) {
        var frames = dashboards[i].frames;
        for (var j = 0; j < frames.length; j++) {
          if (frames[j].id === frameId) {
            return frames[j];
          }
        }
      }
    };
    this.getDashboardById = function (dashboardId) {
      var dashboards = this.getDashboards();
      for (var i = 0; i < dashboards.length; i++) {
        if (dashboards[i].id.toString() === dashboardId.toString()) {
          return dashboards[i];
        }
      }
      return null;
    };
    this.removeDashboard = function (dashboardId) {
      var dashboardData = this.getDashboardData();
      var dashboards = dashboardData.dashboards;
      for (var i = 0; i < dashboards.length; i++) {
        if (dashboards[i].id.toString() === dashboardId.toString()) {
          dashboards.remove(i);
          this._setDashboardData(dashboardData);
          return true;
        }
      }
      return false;
    };
    this.createDashboard = function (name) {
      var dashboardData = this.getDashboardData();
      var dashboardId = this.getNewDashboardId();
      var newBoard = {
          'name': name,
          'id': dashboardId,
          'layout': 'grid',
          'frames': []
        };
      var dashboards = this.getDashboards();
      dashboards.push(newBoard);
      dashboardData.dashboards = dashboards;
      this._setDashboardData(dashboardData);
    };
    this.getNewDashboardId = function () {
      var dashboards = this.getDashboards();
      var existingIds = [];
      for (var i = 0; i < dashboards.length; i++) {
        existingIds.push(Number(dashboards[i].id));
      }
      var newId = Math.max.apply(Math, existingIds) + 1;
      return newId;
    };
    this.createExampleDashboards = function () {
      console.log('Creating example dashboards...');
      var dashboardData = {
          'name': 'dashboards',
          'user': 'joebloe',
          'defaultDashboard': 0,
          'dashboards': [
            {
              'name': 'Simple Apps',
              'id': 0,
              'layout': 'grid',
              'frames': [
                {
                  'appId': '342f3680-18c9-11e4-8c21-0800200c9a66',
                  'id': '45a08744-686b-4b14-820a-ebc8c24fbfb0',
                  'gridLayout': {
                    'row': 1,
                    'col': 1,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'desktopLayout': {
                    'zIndex': 0,
                    'top': 200,
                    'left': 100,
                    'width': 200,
                    'height': 200
                  }
                },
                {
                  'appId': 'd9d3b477-7c21-4cab-bd9f-771ee9379be4',
                  'id': '59891c69-dde5-4926-b4b1-e53dac90b271',
                  'gridLayout': {
                    'row': 1,
                    'col': 2,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'desktopLayout': {
                    'zIndex': 0,
                    'top': 125,
                    'left': 400,
                    'width': 200,
                    'height': 200
                  }
                },
                {
                  'appId': 'c3d895d5-f332-4154-b963-c5dd63f8ca49',
                  'id': '23baefc8-872a-4da4-84ed-e8fa62c09819',
                  'gridLayout': {
                    'row': 2,
                    'col': 1,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'desktopLayout': {
                    'zIndex': 1,
                    'top': 300,
                    'left': 200,
                    'width': 200,
                    'height': 200
                  }
                },
                {
                  'appId': '34bc3505-5dcc-4609-bcd6-c014d9f27ce5',
                  'id': '8ca6dba0-b7bb-47e4-a1a1-06e451f9a0f1',
                  'gridLayout': {
                    'row': 2,
                    'col': 2,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'desktopLayout': {
                    'zIndex': 1,
                    'top': 250,
                    'left': 500,
                    'width': 200,
                    'height': 200
                  }
                }
              ]
            },
            {
              'name': 'Just One Thing',
              'id': 1,
              'layout': 'desktop',
              'frames': [{
                  'appId': '342f3680-18c9-11e4-8c21-0800200c9a66',
                  'id': '04648023-6ab0-448d-83a1-bb378639237f',
                  'gridLayout': {
                    'col': 1,
                    'row': 1,
                    'sizeX': 3,
                    'sizeY': 3
                  },
                  'desktopLayout': {
                    'zIndex': 0,
                    'top': 125,
                    'left': 200,
                    'width': 300,
                    'height': 300
                  }
                }]
            },
            {
              'name': 'Bouncing Balls',
              'id': 2,
              'layout': 'grid',
              'frames': [
                {
                  'appId': '998437ef-9191-4d57-91a7-6ab049361583',
                  'id': '6c84a76c-f149-4c4d-90a8-1df397ed588b',
                  'gridLayout': {
                    'col': 1,
                    'row': 1,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'desktopLayout': {
                    'zIndex': 0,
                    'top': 125,
                    'left': 200,
                    'width': 300,
                    'height': 300
                  }
                },
                {
                  'appId': '3af849aa-dad0-4223-b15b-9da3b48d1845',
                  'id': 'c951a160-0917-45cf-8c7f-a3748958ced1',
                  'gridLayout': {
                    'col': 2,
                    'row': 1,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'desktopLayout': {
                    'zIndex': 0,
                    'top': 125,
                    'left': 700,
                    'width': 300,
                    'height': 300
                  }
                },
                {
                  'appId': 'e5f52929-3f00-4766-a820-f0452ff74572',
                  'id': 'dad15d4a-0da1-4181-9e99-15c9197a0180',
                  'gridLayout': {
                    'col': 1,
                    'row': 1,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'desktopLayout': {
                    'zIndex': 0,
                    'top': 500,
                    'left': 200,
                    'width': 300,
                    'height': 300
                  }
                },
                {
                  'appId': '93eb7a1d-618c-4478-a59e-326eccbe86d5',
                  'id': '32769aa5-2c34-45e9-9a63-a155f3d77073',
                  'gridLayout': {
                    'col': 2,
                    'row': 1,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'desktopLayout': {
                    'zIndex': 0,
                    'top': 500,
                    'left': 700,
                    'width': 300,
                    'height': 300
                  }
                }
              ]
            }
          ]
        };
      this._setDashboardData(dashboardData);
    };
  }
]);
app.service('iwcDashboardApiImpl', function () {
  this.getDashboards = function () {
  };
  this._setDashboardData = function () {
  };
  this.updateCurrentDashboardLayoutType = function () {
  };
  this.updateCurrentDashboardGrid = function () {
  };
  this.updateCurrentDashboardDesktop = function () {
  };
  this.createExampleDashboards = function () {
  };
});
app.factory('dashboardApi', [
  '$window',
  '$injector',
  function ($window, $injector) {
    if ($window.iwc) {
      return $injector.get('iwcDashboardApiImpl');
    } else {
      return $injector.get('localStorageDashboardApiImpl');
    }
  }
]);