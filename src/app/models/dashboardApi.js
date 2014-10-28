'use strict';

/**
 * Dashboard model
 *
 * @module ozpWebtop.models.dashboard
 * @requires ozp.common.utilities
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.services.iwcInterface
 * @requires ozpWebtop.services.localStorageInterface
 */
angular.module('ozpWebtop.models.dashboard', [
  'ozp.common.utilities', 'ozpWebtop.constants',
  'ozpWebtop.services.iwcInterface',
  'ozpWebtop.services.localStorageInterface']);

var models = angular.module('ozpWebtop.models.dashboard');

// TODO: put this somewhere better
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function generalDashboardModel(persistStrategy, Utilities) {

  return {
    /**
     * Test method - delete this later
     * @method sayHello
     * @returns {Promise}
     */
    sayHello: function() {
      if (typeof persistStrategy.sayHello !== 'function') {
        console.log('persistStrategy: ' + JSON.stringify(persistStrategy));
      }
      return persistStrategy.sayHello().then(function(response) {
        console.log(response);
        return response;
      });
    },
    /**
     * Get all dashboard data
     * @method getDashboardData
     * @returns {Promise}
     */
    getDashboardData: function() {
      return persistStrategy.getDashboardData().then(function(response) {
        return response;
      });
    },
    /**
     * Get all dashboards
     * @method getDashboards
     * @returns {Promise}
     */
    getDashboards: function() {
      return this.getDashboardData().then(function(response) {
        var dashboardData = response;
        if (dashboardData) {
          return dashboardData.dashboards;
        } else {
          console.log('WARNING: dashboardData is null!');
          return null;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Set all dashboard data
     * @method _setDashboardData
     * @param dashboardData
     * @returns {Promise}
     * @private
     */
    _setDashboardData: function(dashboardData) {
      return persistStrategy.setDashboardData(dashboardData).then(function(response) {
        return response;
      });
    },
    /**
     * Set all dashboards
     * @method setAllDashboards
     * @param dashboards
     * @returns {Promise}
     */
    setAllDashboards: function(dashboards) {
      var that = this;
      return this.getDashboardData().then(function(dashboardData){
        dashboardData.dashboards = dashboards;
        return that._setDashboardData(dashboardData).then(function(response){
          return response;
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Update dashboard layout
     * @method updateLayoutType
     * @param dashboardId
     * @param layout 'grid' or 'desktop'
     * @returns {Promise}
     */
    updateLayoutType: function(dashboardId, layout) {
      var that = this;
      return this.getDashboardById(dashboardId).then(function(dashboard){
        var validInputs = ['grid', 'desktop'];
        if (validInputs.indexOf(layout) === -1) {
          return false;
        }
        dashboard.layout = layout;
        return that.saveDashboard(dashboard).then(function(response){
          return response;
        });
      });
    },
    /**
     * Toggle the value of a key in a frame
     *
     * @method toggleFrameKey
     * @param frameId
     * @param key
     * @returns {Promise}
     */
    toggleFrameKey: function(frameId, key) {
      var that = this;
      return this.getFrameById(frameId).then(function(frame) {
        if (!frame) {
          return false;
        }
        if (frame[key]) {
          frame[key] = false;
        }
        else {
          console.debug(typeof frame[key]);
          frame[key] = true;
        }
        return that.saveFrame(frame).then(function(resp) {
          if (resp) {
            return frame[key];
          } else {
            return resp;
          }
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Update the grid layout of a frame in a dashboard
     * @method updateGridFrame
     * @param frameId
     * @param sizeData
     * @returns {Promise}
     */
    updateGridFrame: function(frameId, sizeData) {
      var that = this;
      return this.getFrameById(frameId).then(function(frame) {
        if (!frame) {
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
        return that.saveFrame(frame).then(function(response) {
          if (response) {
            return frameId;
          } else {
            return response;
          }
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Update the desktop layout of a frame in a dashboard
     * TODO: what about width and height?
     * @method updateDesktopFrame
     * @param frameId
     * @param x
     * @param y
     * @param width
     * @param height
     * @param zIndex
     * @returns {Promise}
     */
    updateDesktopFrame: function(frameId, x, y, width, height, zIndex) {
      var that = this;
      return this.getFrameById(frameId).then(function(frame) {
        if (!frame) {
          return false;
        }
        frame.desktopLayout.left = x;
        frame.desktopLayout.top = y;
        frame.desktopLayout.width = width;
        frame.desktopLayout.height = height;
        frame.desktopLayout.zIndex = zIndex;
        return that.saveFrame(frame).then(function(response) {
          return response;
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Check to see if an application is already on a given dashboard
     * @method isAppOnDashboard
     * @param dashboardId
     * @param applicationId
     * @returns {Promise}
     */
    isAppOnDashboard: function(dashboardId, applicationId) {
      return this.getDashboardById(dashboardId).then(function(dashboard){
        for (var i=0; i < dashboard.frames.length; i++) {
          if (dashboard.frames[i].appId === applicationId) {
            return true;
          }
        }
        return false;
      });
    },
    /**
     * Create a new frame in a dashboard for a given application
     * Creates a frame with with both grid and desktop layout data
     * @method createFrame
     * @param dashboardId
     * @param appId
     * @param gridMaxRows
     * @returns {Promise}
     */
    createFrame: function(dashboardId, appId, gridMaxRows) {
      var that = this;
      return this.getDashboardById(dashboardId).then(function(dashboard) {
        // Calculate the row to place this frame in (for grid layout)

        // for the grid layout, place new app in first col of first empty row
        // for the desktop layout, just put it on and let user move it


        var newRowSmall = 0;
        var newRowMedium = 0;
        for (var i=0; i < dashboard.frames.length; i++) {
          var thisNewRowSmall = dashboard.frames[i].gridLayout.sm.row + dashboard.frames[i].gridLayout.sm.sizeY + 1;
          var thisNewRowMd = dashboard.frames[i].gridLayout.md.row + dashboard.frames[i].gridLayout.md.sizeY + 1;
          if ((thisNewRowSmall + 2) > newRowSmall) {
            newRowSmall = thisNewRowSmall;
          }
          if ((thisNewRowMd + 2) > newRowMedium) {
            newRowMedium = thisNewRowMd;
          }
        }

        if (newRowSmall > gridMaxRows) {
          // TODO: handle error
          console.log('ERROR: cannot add frame to small row ' + newRowSmall +
            ', max rows: ' + gridMaxRows);
          return null;
        }
        if (newRowMedium > gridMaxRows) {
          // TODO: handle error
          console.log('ERROR: cannot add frame to medium row ' + newRowMedium +
            ', max rows: ' + gridMaxRows);
          return null;
        }

        // by default, new frames will have minimal size
        var col = 0;
        var sizeX = 2;
        var sizeY = 2;

        // for the desktop layout, just put it on and let the user move it
        var zIndex = 0;
        var top = 100;
        var left = 100;
        var width = 200;
        var height = 200;


        var utils = new Utilities();
        var frameId = utils.generateUuid();

        // update the dashboard with this app
        var newApp = {
          'appId': appId,
          'id': frameId,
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
        return that.saveDashboard(dashboard).then(function() {
          return newApp;
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Remove a frame from a dashboard
     * @method removeFrame
     * @param frameId
     * @returns {Promise}
     */
    removeFrame: function(frameId) {
      var that = this;
      return this.getDashboards().then(function(dashboards) {
        var dashboardToUpdate;
        for (var i=0; i < dashboards.length; i++) {
          var frames = dashboards[i].frames;
          for (var j=0; j < frames.length; j++) {
            if (frameId === frames[j].id) {
              dashboards[i].frames.splice(j,1);
              dashboardToUpdate = i;
            }
          }
        }
        if (dashboardToUpdate >= 0) {
          return that.saveDashboard(dashboards[dashboardToUpdate]).then(function(saved) {
            return saved;
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

    },
    /**
     * Change the user's current dashboard
     *
     * @method updateCurrentDashboardName
     * @param dashboardName
     * @returns {Promise}
     */
    updateCurrentDashboardName: function(dashboardName) {
      var that = this;
      return this.getDashboardData().then(function(dashboardData) {
        var dashboardFound = false;
        for (var i=0; i < dashboardData.dashboards.length; i++) {
          if (dashboardData.dashboards[i].name === dashboardName) {
            dashboardData.currentDashboard = dashboardData.dashboards[i].id;
            dashboardFound = true;
          }
        }
        if (dashboardFound) {
          return that._setDashboardData(dashboardData).then(function(response) {
            return response;
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        } else {
          return false;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Return the name of the user's current dashboard
     * @method getCurrentDashboardName
     * @returns {Promise}
     */
    getCurrentDashboardName: function() {
      return this.getDashboardData().then(function(dashboards) {
        var currentDashboardId = dashboards.currentDashboard;
        for (var i=0; i < dashboards.dashboards.length; i++) {
          if (dashboards.dashboards[i].id === currentDashboardId) {
            return dashboards.dashboards[i].name;
          }
        }
        return null;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Augment the dashboard.frames data with application-specific data
     * Note: data is not persisted, but rather the 'frames' object is modified
     * by reference
     * @method mergeApplicationData
     * @param frames
     * @param marketplaceApps
     */
    mergeApplicationData: function(frames, marketplaceApps) {
      for (var i=0; i < marketplaceApps.length; i++) {
        // check if this app is on our dashboard
        for (var j=0; j < frames.length; j++) {
          if (frames[j].appId === marketplaceApps[i].id) {
            // if it is, then get all relevant info
            frames[j].icon = marketplaceApps[i].icons.small;
            frames[j].url = marketplaceApps[i].launchUrls.default;
            frames[j].name = marketplaceApps[i].name;
            frames[j].shortDescription = marketplaceApps[i].shortDescription;
            frames[j].singleton = marketplaceApps[i].uiHints.singleton;
          }
        }
      }
    },
    /**
     * Updates the dynamically generated fields for grid frame size in px
     * @method updateFrameSizeOnGrid
     * @param frameId
     * @param size
     * @param width
     * @param height
     * @returns {Promise}
     */
    updateFrameSizeOnGrid: function(frameId, size, width, height) {
      // TODO: may need to adjust this someday
      if (size === 'lg') {
        size = 'md';
      }
      var that = this;
      return this.getFrameById(frameId).then(function(frame) {
        frame.gridLayout[size].width = width;
        frame.gridLayout[size].height = height;
        return that.saveFrame(frame).then(function(response) {
          return response;
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Return the frame size (in px) for a given frame in the grid layout
     * Note that these values are dynamically generated
     * @method getFrameSizeOnGrid
     * @param frameId
     * @returns {Promise}
     */
    getFrameSizeOnGrid: function(frameId) {
      return this.getFrameById(frameId).then(function(frame) {
        var widgetSize = {'sm': {}, 'md': {}};
        widgetSize.sm.width = frame.gridLayout.sm.width;
        widgetSize.sm.height = frame.gridLayout.sm.height;
        widgetSize.md.width = frame.gridLayout.md.width;
        widgetSize.md.height = frame.gridLayout.md.height;
        return widgetSize;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Save a dashboard
     * TODO: make sure input is a valid dashboard:
     * - dashboard.id should be unique
     * - all frame.id's should be
     * @method saveDashboard
     * @param dashboard
     * @returns {Promise}
     */
    saveDashboard: function(dashboard) {
      var foundDashboard = false;
      var that = this;
      return this.getDashboards().then(function(dashboards) {
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id === dashboard.id) {
            dashboards[i] = dashboard;
            foundDashboard = true;
          }
        }
        if (foundDashboard) {
          return that.setAllDashboards(dashboards).then(function(response) {
              return response;
            }).catch(function(error) {
              console.log('should not have happened: ' + error);
            });
        } else {
          return false;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Save a frame in a dashboard
     * TODO: make sure input is a valid frame
     *
     * @method saveFrame
     * @param frame
     * @returns {Promise}
     */
    saveFrame: function(frame) {
      var that = this;
      return this.getDashboards().then(function(dashboards) {
        var frameFound = false;
        for (var i=0; i < dashboards.length; i++) {
          var frames = dashboards[i].frames;
          for (var j=0; j < frames.length; j++) {
            if (frames[j].id === frame.id) {
              dashboards[i].frames[j] = frame;
              frameFound = true;
            }
          }
        }
        if (frameFound) {
          return that.setAllDashboards(dashboards).then(function(response) {
            return response;
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        } else {
          return false;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Retrieve a frame by id
     * @method getFrameById
     * @param frameId
     * @returns {Promise}
     */
    getFrameById: function(frameId) {
      return this.getDashboards().then(function(dashboards) {
        for (var i=0; i < dashboards.length; i++) {
          var frames = dashboards[i].frames;
          for (var j=0; j < frames.length; j++) {
            if (frames[j].id === frameId) {
              return frames[j];
            }
          }
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

    },
    /**
     * Retrieve a dashboard by id
     * @method getDashboardById
     * @param dashboardId
     * @returns {Promise}
     */
    getDashboardById: function(dashboardId) {
      return this.getDashboards().then(function(dashboards) {
        if (!dashboards) {
          return null;
        }
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id.toString() === dashboardId.toString()) {
            return dashboards[i];
          }
        }
        return null;
      });
    },
    /**
     * Delete a dashboard
     * @method removeDashboard
     * @param dashboardId
     * @returns {Promise}
     */
    removeDashboard: function(dashboardId) {
      var that = this;
      return this.getDashboardData().then(function(dashboardData) {
        var dashboards = dashboardData.dashboards;
        var foundDashboard = false;
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id.toString() === dashboardId.toString()) {
            dashboards.remove(i);
            foundDashboard = true;
          }
        }
        if (foundDashboard) {
          return that._setDashboardData(dashboardData).then(function(resp) {
            return resp;
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        } else {
          return false;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Create a new dashboard
     * @method createDashboard
     * @param name
     * @returns {Promise}
     */
    createDashboard: function(name) {
      var that = this;
      return this.getDashboardData().then(function(dashboardData) {
        // get new id for board
        return that.getNewDashboardId().then(function(dashboardId) {
          var newBoard = {
            'name': name,
            'id': dashboardId,
            'layout': 'grid',
            'frames': [
            ]
          };
          return that.getDashboards().then(function(dashboards) {
            dashboards.push(newBoard);
            dashboardData.dashboards = dashboards;
            return that._setDashboardData(dashboardData).then(function(response) {
              return response;
            }).catch(function(error) {
              console.log('should not have happened: ' + error);
            });
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Get the next available id for a new dashboard
     * TODO: this assumes ids are integers and not uuids
     * @method getNewDashboardId
     * @returns {Promise}
     */
    getNewDashboardId: function() {
      return this.getDashboards().then(function(dashboards) {
        var existingIds = [];
        var newId = -1;
        for (var i=0; i < dashboards.length; i++) {
          existingIds.push(Number(dashboards[i].id));
        }
        newId = Math.max.apply(Math, existingIds) + 1;
        return newId.toString();
      });
    },
    /**
     * Get the user's current dashboard
     * @method getCurrentDashboard
     * @returns {Promise}
     */
    getCurrentDashboard: function() {
      var that = this;
      return this.getDashboardData().then(function(dashboardData) {
        return that.getDashboardById(dashboardData.currentDashboard);
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Create example dashboards (test purposes only)
     * @method createExampleDashboards
     * @returns {Promise}
     */
    createExampleDashboards: function() {
      // TODO: Originally this was placed in a separate json file and fetched
      // via http, but that led to all sorts of issues with testing.
      var dashboardData = {
        'name': 'dashboards',
        'user': 'J Smith',
        'currentDashboard': '0',
        'dashboards': [
          {
            'name': 'Sample Apps',
            'id': '0',
            'layout': 'grid',
            'frames': [
              {
                'appId': 'f2355f7c-bd8f-440c-b6f4-fe6bea787ecb', // AirMail
                'id': '45a08744-686b-4b14-820a-ebc8c24fbfb0',
                'gridLayout': {
                  'sm': {
                    'row': 0,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 0,
                    'col': 0,
                    'sizeX': 2,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 79,
                  'left': 32,
                  'width': 300,
                  'height': 240
                }
              },
              {
                'appId': '484423df-8ee6-4880-8111-88eea14b97b2', // Bread Basket
                'id': '59891c69-dde5-4926-b4b1-e53dac90b271',
                'gridLayout': {
                  'sm': {
                    'row': 2,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 2,
                    'col': 0,
                    'sizeX': 1,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 350,
                  'left': 25,
                  'width': 250,
                  'height': 340
                }
              },
              {
                'appId': 'c3ae4b4f-0d60-42f6-9005-c87d852e4812', // ChartCourse
                'id': '87078824-fac8-4c04-84d5-f6a424f955fb',
                'gridLayout': {
                  'sm': {
                    'row': 4,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 0,
                    'col': 2,
                    'sizeX': 2,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 75,
                  'left': 360,
                  'width': 450,
                  'height': 340
                }
              },
              {
                'appId': '8c9716db-00f1-4086-a413-03a2891fcf27', // Plot Possum
                'id': '23baefc8-872a-4da4-84ed-e8fa62c09819',
                'gridLayout': {
                  'sm': {
                    'row': 6,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 0,
                    'col': 4,
                    'sizeX': 2,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 75,
                  'left': 830,
                  'width': 400,
                  'height': 300
                }
              },
              {
                'appId': '34643c12-c600-4188-ab44-993681751f6c', //ChatterBox
                'id': '8ca6dba0-b7bb-47e4-a1a1-06e451f9a0f1',
                'gridLayout': {
                  'sm': {
                    'row': 8,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 2,
                    'col': 1,
                    'sizeX': 4,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 420,
                  'left': 320,
                  'width': 550,
                  'height': 275
                }
              },
              {
                'appId': '4bfd3e29-af51-4f0a-ae5f-2609d52f1e58', // Clipboard
                'id': '99fb827c-4828-4855-8d39-e163fb76a5e0',
                'gridLayout': {
                  'sm': {
                    'row': 9,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 2,
                    'col': 5,
                    'sizeX': 1,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 390,
                  'left': 900,
                  'width': 340,
                  'height': 310
                }
              },
              {
                'appId': '65a026aa-fe21-4aa4-b455-e7c8e3c1160d', // Hatch Latch
                'id': '0c20bc75-1eca-4b89-8a8d-2c699f401039',
                'gridLayout': {
                  'sm': {
                    'row': 11,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 4,
                    'col': 0,
                    'sizeX': 6,
                    'sizeY': 1
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 720,
                  'left': 25,
                  'width': 1100,
                  'height': 310
                }
              },
              {
                'appId': '21c6715e-a204-4ae8-a041-625a644e65b1', // JotSpot
                'id': '44527090-b8f0-46a1-acc7-df736c655ae2',
                'gridLayout': {
                  'sm': {
                    'row': 13,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 6,
                    'col': 0,
                    'sizeX': 2,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 1100,
                  'left': 25,
                  'width': 300,
                  'height': 150
                }
              },
              {
                'appId': '904a99cf-9da5-4b07-aecd-e1cbff534bb7', // Lunar Lantern
                'id': '1b27150b-3e3a-42fa-868d-18114318a9e7',
                'gridLayout': {
                  'sm': {
                    'row': 15,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 6,
                    'col': 2,
                    'sizeX': 2,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 1100,
                  'left': 350,
                  'width': 300,
                  'height': 300
                }
              },
              {
                'appId': '3ddeb636-dd93-4875-88d6-ff0da56c98ee', // Journal Forge
                'id': 'd1681ade-fb6e-4d6a-9f11-3e8e1e803b0d',
                'gridLayout': {
                  'sm': {
                    'row': 17,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 6,
                    'col': 4,
                    'sizeX': 2,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 1100,
                  'left': 900,
                  'width': 300,
                  'height': 300
                }
              }
            ] // end frames in dashboard
          },
          {
            'name': 'Stock Trader',
            'id': '1',
            'layout': 'grid',
            'frames': [
              {
                'appId': 'cd0e3e24-cae8-4886-a0d4-c7e04b5b104e', // Greek analysis
                'id': '2b585b22-5de9-4389-b536-57bcb602bf3a',
                'gridLayout': {
                  'sm': {
                    'row': 0,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 0,
                    'col': 0,
                    'sizeX': 6,
                    'sizeY': 1
                  }
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
                'appId': 'f38e10db-eb3f-4b90-8ec5-cb0a7dbd9191', // Stock Trader
                'id': '3886bbea-0421-4a2a-9851-b8e1c6a59f5b',
                'gridLayout': {
                  'sm': {
                    'row': 1,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 1,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  }
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
                'appId': '00605b24-baff-4270-b0b5-2b6bd6455883', // Chart
                'id': 'fe9fd6bf-e7be-446a-8ab7-a3fc4ac279a8',
                'gridLayout': {
                  'sm': {
                    'row': 2,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 2
                  },
                  'md': {
                    'row': 1,
                    'col': 3,
                    'sizeX': 3,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 125,
                  'left': 400,
                  'width': 200,
                  'height': 200
                }
              }
            ] // end frames in dashboard
          },
          {
            'name': 'Beta Mission',
            'id': '2',
            'layout': 'desktop',
            'frames': [
              {
                'appId': '4bfd3e29-af51-4f0a-ae5f-2609d52f1e58',  // Clipboard
                'id': '04648023-6ab0-448d-83a1-bb378639237f',
                'gridLayout': {
                  'sm': {
                    'col': 0,
                    'row': 0,
                    'sizeX': 3,
                    'sizeY': 3
                  },
                  'md': {
                    'col': 1,
                    'row': 1,
                    'sizeX': 3,
                    'sizeY': 3
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 125,
                  'left': 200,
                  'width': 300,
                  'height': 300
                }
              }
            ] // end frames in dashboard
          },
          {
            'name': 'Bouncing Balls',
            'id': '3',
            'layout': 'grid',
            'frames': [
              {
                'appId': '998437ef-9191-4d57-91a7-6ab049361583',
                'id': '6c84a76c-f149-4c4d-90a8-1df397ed588b',
                'gridLayout': {
                  'sm': {
                    'col': 0,
                    'row': 0,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'md': {
                    'col': 0,
                    'row': 0,
                    'sizeX': 3,
                    'sizeY': 2
                  }
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
                  'sm': {
                    'col': 1,
                    'row': 0,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'md': {
                    'col': 3,
                    'row': 0,
                    'sizeX': 3,
                    'sizeY': 2
                  }
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
                  'sm': {
                    'col': 2,
                    'row': 0,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'md': {
                    'col': 0,
                    'row': 2,
                    'sizeX': 3,
                    'sizeY': 2
                  }
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
                  'sm': {
                    'col': 1,
                    'row': 1,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'md': {
                    'col': 3,
                    'row': 2,
                    'sizeX': 3,
                    'sizeY': 2
                  }
                },
                'desktopLayout': {
                  'zIndex': 0,
                  'top': 500,
                  'left': 700,
                  'width': 300,
                  'height': 300
                }
              }
            ] // end frames in dashboard
          }
        ]
      };

      return this._setDashboardData(dashboardData).then(function(response) {
        return response;
      });
    }
  };
}

/**
 * Angular service which provides a local storage interface to the dashboard api
 *
 * ngtype: service
 *
 */
models.service('dashboardModelLocalStorage', function(localStorageInterface,
                                                    Utilities) {
  var model = generalDashboardModel(localStorageInterface, Utilities);
  for (var prop in model) {
    if (model.hasOwnProperty(prop)) {
      this[prop] = model[prop];
    }
  }
});

/**
 * Angular service which uses the Inter-Widget Communication (IWC) API to store
 * and retrieve dashboards.
 *
 * ngtype: service
 *
 */
models.service('dashboardModelIwc', function(iwcInterface, Utilities) {
  var model = generalDashboardModel(iwcInterface, Utilities);
  for (var prop in model) {
    if (model.hasOwnProperty(prop)) {
      this[prop] = model[prop];
    }
  }
});

/**
 * Angular service which provides an abstraction of the implementations used to
 * store and retrieve dashboard information.
 *
 * ngtype: factory
 *
 * @class dashboardApi
 * @static
 * @namespace models
 */
models.factory('dashboardApi', function($injector, useIwc) {
  if (useIwc) {
    return $injector.get('dashboardModelIwc');
  } else if (useIwc === false){
    return $injector.get('dashboardModelLocalStorage');

  }
  else {
    console.log('ERROR: useIwc is undefined!');
  }
});
