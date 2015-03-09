angular.module('templates-app', ['addApplicationsModal/addApplicationsModal.tpl.html', 'appToolbar/appToolbar.tpl.html', 'dashboardView/button/ozpbutton.tpl.html', 'dashboardView/chrome/ozpchrome.tpl.html', 'dashboardView/dashboardView.tpl.html', 'dashboardView/desktop/desktop.tpl.html', 'dashboardView/desktop/managediframe.tpl.html', 'dashboardView/grid/grid.tpl.html', 'editDashboardModal/editDashboardModal.tpl.html', 'ozpToolbar/ozpToolbar.tpl.html']);

angular.module("addApplicationsModal/addApplicationsModal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("addApplicationsModal/addApplicationsModal.tpl.html",
    "<div class=\"wt-modal add-apps-style\" id=\"modal_openApps\">\n" +
    "  <div class=\"modal-header wt-modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"cancel()\">\n" +
    "      <span aria-hidden=\"true\"><i class=\"fa fa-close close-icon\"></i> </span>\n" +
    "      <span class=\"sr-only\">Close</span>\n" +
    "    </button>\n" +
    "    <h3 class=\"modal-title\">Open bookmarked apps</h3>\n" +
    "    <a ng-href=\"{{centerUrl}}\">\n" +
    "      <button type=\"button\" class=\"btn btn-default pull-right\">Find more apps</button>\n" +
    "    </a>\n" +
    "    <p> These are apps you have already bookmarked from the Center. To edit your\n" +
    "      bookmarks, visit the HUD\n" +
    "    </p>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body wt-modal-body\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12 add-apps-list\">\n" +
    "          <ul id=\"triple\">\n" +
    "            <li ng-repeat=\"app in applications\">\n" +
    "              <span ng-click=\"appSelected(app)\" class=\"link-pointer\"\n" +
    "                  ng-class=\"{addappselected: isAppSelected(app)}\"\n" +
    "                  tooltip-placement=\"right\" tooltip=\"{{app.descriptionShort}}\">\n" +
    "                <img ng-src=\"{{app.icons.small}}\" height=\"20\" width=\"20\" />\n" +
    "                {{app.name}}</span>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer wt-modal-footer\">\n" +
    "    <div ng-switch on=\"areAnyAppsSelected()\">\n" +
    "      <div ng-switch-when=\"true\">\n" +
    "        <button class=\"btn add-apps-dark-text\"\n" +
    "                ng-click=\"openAppsInNewDashboard()\">\n" +
    "        Open in new dashboard\n" +
    "        </button>\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"openApps()\">Open</button>\n" +
    "      </div>\n" +
    "      <div ng-switch-default>\n" +
    "        <button class=\"btn add-apps-dark-text\" disabled=\"disabled\"\n" +
    "                ng-click=\"openAppsInNewDashboard()\">\n" +
    "        Open in new dashboard\n" +
    "        </button>\n" +
    "        <button class=\"btn btn-primary\"\n" +
    "                ng-click=\"openApps()\" disabled=\"disabled\">Open\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("appToolbar/appToolbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("appToolbar/appToolbar.tpl.html",
    "<div ng-controller=\"ApplicationToolbarCtrl\">\n" +
    "    <div class=\"navbar navbar-default app-toolbar\"\n" +
    "         ng-class=\"{true: 'hide', false: ''}[fullScreenMode]\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"navbar-left\">\n" +
    "                <ul class=\"nav navbar-nav\">\n" +
    "                    <li class=\"highlight\">\n" +
    "                      <a class=\"lrg\" href=\"\" ng-click=\"openApplicationsModal()\">\n" +
    "                        <i class=\"icon-plus\"></i>\n" +
    "                      </a>\n" +
    "                    </li>\n" +
    "                    \n" +
    "                    <li class=\"navbar-spacer\"></li>\n" +
    "                    <li class=\"dropdown dropup\">\n" +
    "                    <!-- we start -->\n" +
    "                      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
    "                        {{currentDashboard.name | limitTo : dashboardNameLength}} <i class=\"icon-caret-up\"></i></a>\n" +
    "                      <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                        <li class=\"dropdown-header\">Dashboards</li>\n" +
    "                        <li ng-repeat=\"board in dashboards\">\n" +
    "                          <a class=\"link-pointer\"><i ng-class=\"{desktop:'icon-stack', grid:'icon-grid'}[board.layout]\"></i>\n" +
    "                            <span ng-click=\"loadDashboard(board)\">{{board.name}}</span>\n" +
    "                              <span class=\"pull-right\" ng-click=\"openDeleteDashboardModal(board)\">X</span>\n" +
    "                              <i class=\"icon-pencil pull-right\" ng-click=\"openEditDashboardModal(board)\"></i>\n" +
    "                          </a>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                          <a class=\"caboose\" class=\"link-pointer\" href=\"\" ng-click=\"openNewDashboardModal()\">\n" +
    "                            <!-- TODO create dashboard view-->\n" +
    "                            <i class=\"icon-plus\"></i>Create a new dashboard\n" +
    "                          </a>\n" +
    "                        </li>\n" +
    "                      </ul>\n" +
    "                    </li>\n" +
    "                    <li class=\"navbar-spacer\"></li>\n" +
    " \n" +
    "                    <li class=\"app\" ng-repeat=\"app in myPinnedApps\" ng-class=\"{true:'',false:'active', 'undefined':'active'}[app.isMinimized]\">\n" +
    "                      <a tooltip=\"{{app.name | limitTo : 15}}\"\n" +
    "                          ng-click=\"maximizeFrame(app)\">\n" +
    "                        <img ng-src=\"{{app.icon.large}}\" />\n" +
    "                        <!-- <div ng-class=\"app.isMinimized && currentDashboard.layout === 'desktop'? 'app-toolbar-inactive-app' : 'app-toolbar-active-app'\">&nbsp</div> -->\n" +
    "                      </a>\n" +
    "                    </li>                   \n" +
    "                </ul>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"navbar-right\">\n" +
    "                <ul class=\"nav navbar-nav\">\n" +
    "                    <li ng-click=\"toggleFullScreenMode();\">\n" +
    "                      <a href=\"\" tooltip=\"Enter Full Screen\" tooltip-placement=\"top\">\n" +
    "                        <i class=\"icon-maximize\"  ></i></a>\n" +
    "                    </li>\n" +
    "                    <li ng-click=\"cascadeWindows()\" ng-hide=\"currentDashboard.layout === 'grid'\">\n" +
    "                      <a href=\"\" tooltip=\"Cascade Windows\" tooltip-placement=\"top\">\n" +
    "                        <i class=\"icon-stack-2\"></i></a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <button class=\"hiddenToggle appHiddenToggle\" ng-click=\"toggleFullScreenMode();\"\n" +
    "        ng-class=\"{false: 'hide', true:''}[fullScreenMode]\"\n" +
    "        tooltip=\"Exit Full Screen\" tooltip-placement=\"left\">\n" +
    "      <i class=\"icon-minimize\"></i>\n" +
    "    </button>\n" +
    "</div>");
}]);

angular.module("dashboardView/button/ozpbutton.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/button/ozpbutton.tpl.html",
    "<a class=\"btn\" ng-href=\"{{button.url}}\">\n" +
    "    <!-- Bootstrap icon\n" +
    "    <span class=\"glyphicon {{button.icon}}\"></span>\n" +
    "    -->\n" +
    "    <img ng-src=\"{{button.icon}}\">\n" +
    "    <span>{{button.text | elliptical:button.elliptical}}</span>\n" +
    "</a>\n" +
    "");
}]);

angular.module("dashboardView/chrome/ozpchrome.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/chrome/ozpchrome.tpl.html",
    "<div class=\"ozp-chrome\" ng-dblclick=\"maximizeFrame()\">\n" +
    "  <img class=\"chrome-icon\" ng-src=\"{{frame.icon.small}}\">\n" +
    "  <span class=\"chrome-name\">{{frame.name}}</span>\n" +
    "  <span class=\"chrome-controls\" >\n" +
    "    <button type=\"button\" class=\"btn chrome-minimize\" ng-hide=\"layout !== 'desktop'\" ng-click=\"minimizeFrame()\">\n" +
    "      <span class=\"icons icon-minus\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn chrome-maximize\" ng-hide=\"layout !== 'desktop'\" ng-click=\"maximizeFrame()\">\n" +
    "      <span class=\"icons icon-plus\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn chrome-close\" ng-click=\"removeFrame()\">\n" +
    "      <span class=\"icons icon-cross\"></span>\n" +
    "    </button>\n" +
    "  </span>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboardView/dashboardView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/dashboardView.tpl.html",
    "<div class=\"desktop-view\" ng-show=\"layout === 'desktop'\">\n" +
    "  <!-- Number of sticky views must correspond with constants.maxStickyBoards -->\n" +
    "  <div ui-view=\"desktoplayout-0\" ng-show=\"$state.includes('dashboardview.desktop-sticky-0')\"></div>\n" +
    "  <div ui-view=\"desktoplayout-1\" ng-show=\"$state.includes('dashboardview.desktop-sticky-1')\"></div>\n" +
    "  <div ui-view=\"desktoplayout-2\" ng-show=\"$state.includes('dashboardview.desktop-sticky-2')\"></div>\n" +
    "  <div ui-view=\"desktoplayout-3\" ng-show=\"$state.includes('dashboardview.desktop-sticky-3')\"></div>\n" +
    "  <div ui-view=\"desktoplayout-4\" ng-show=\"$state.includes('dashboardview.desktop-sticky-4')\"></div>\n" +
    "  <div ui-view=\"desktoplayout-5\" ng-show=\"$state.includes('dashboardview.desktop-sticky-5')\"></div>\n" +
    "  <div ui-view=\"desktoplayout-6\" ng-show=\"$state.includes('dashboardview.desktop-sticky-6')\"></div>\n" +
    "  <div ui-view=\"desktoplayout-7\" ng-show=\"$state.includes('dashboardview.desktop-sticky-7')\"></div>\n" +
    "  <div ui-view=\"desktoplayout-8\" ng-show=\"$state.includes('dashboardview.desktop-sticky-8')\"></div>\n" +
    "  <div ui-view=\"desktoplayout-9\" ng-show=\"$state.includes('dashboardview.desktop-sticky-9')\"></div>\n" +
    "</div>\n" +
    "<div class=\"grid-view\" ng-show=\"layout === 'grid'\">\n" +
    "  <div ui-view=\"gridlayout-0\" ng-show=\"$state.includes('dashboardview.grid-sticky-0')\"></div>\n" +
    "  <div ui-view=\"gridlayout-1\" ng-show=\"$state.includes('dashboardview.grid-sticky-1')\"></div>\n" +
    "  <div ui-view=\"gridlayout-2\" ng-show=\"$state.includes('dashboardview.grid-sticky-2')\"></div>\n" +
    "  <div ui-view=\"gridlayout-3\" ng-show=\"$state.includes('dashboardview.grid-sticky-3')\"></div>\n" +
    "  <div ui-view=\"gridlayout-4\" ng-show=\"$state.includes('dashboardview.grid-sticky-4')\"></div>\n" +
    "  <div ui-view=\"gridlayout-5\" ng-show=\"$state.includes('dashboardview.grid-sticky-5')\"></div>\n" +
    "  <div ui-view=\"gridlayout-6\" ng-show=\"$state.includes('dashboardview.grid-sticky-6')\"></div>\n" +
    "  <div ui-view=\"gridlayout-7\" ng-show=\"$state.includes('dashboardview.grid-sticky-7')\"></div>\n" +
    "  <div ui-view=\"gridlayout-8\" ng-show=\"$state.includes('dashboardview.grid-sticky-8')\"></div>\n" +
    "  <div ui-view=\"gridlayout-9\" ng-show=\"$state.includes('dashboardview.grid-sticky-9')\"></div>\n" +
    "</div>");
}]);

angular.module("dashboardView/desktop/desktop.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/desktop/desktop.tpl.html",
    "<!-- Frames are positioned by absolute positioning based on state -->\n" +
    "<div ng-repeat=\"frame in frames\">\n" +
    "  <ozp-managed-frame myframe=\"frame\" class=\"ozp-managed-frame\"\n" +
    "                     ng-hide=\"isFrameMinimized(frame)\"\n" +
    "                     ng-style=\"frame.desktopLayout.style\"\n" +
    "                     ng-class=\"{'fullWidth' : frame.isMaximized}\">\n" +
    "  </ozp-managed-frame>\n" +
    "</div>");
}]);

angular.module("dashboardView/desktop/managediframe.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/desktop/managediframe.tpl.html",
    "<span id=\"frame-{{myframe.id}}\">\n" +
    "<ozp-chrome frame=\"myframe\"></ozp-chrome>\n" +
    "<iframe class=\"managed-iframe\" ng-src=\"{{myframe.trustedUrl}}\" frameBorder=\"0\">\n" +
    "</iframe>\n" +
    "</span>");
}]);

angular.module("dashboardView/grid/grid.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/grid/grid.tpl.html",
    "<div class=\"container gridster-container-settings\" ng-class=\"{'grid-toolbar-padding' : !fullScreenMode}\">\n" +
    "  <div gridster=\"gridOptions\">\n" +
    "    <ul>\n" +
    "      <span ng-repeat=\"frame in frames\">\n" +
    "        <li gridster-item row=\"frame.gridLayout[deviceSize].row\" col=\"frame.gridLayout[deviceSize].col\"\n" +
    "            size-x=\"frame.gridLayout[deviceSize].sizeX\" size-y=\"frame.gridLayout[deviceSize].sizeY\"\n" +
    "            id=\"{{frame.id}}\"\n" +
    "            class=\"ozp-managed-frame\">\n" +
    "          <ozp-chrome frame=\"frame\"></ozp-chrome>\n" +
    "          <iframe class=\"iframe-grid\"\n" +
    "                  ng-class=\"{frameHighlighted: frame.highlighted}\"\n" +
    "                  ng-src=\"{{frame.trustedUrl}}\" frameBorder=\"0\">\n" +
    "          </iframe>\n" +
    "        </li>\n" +
    "      </span>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("editDashboardModal/editDashboardModal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("editDashboardModal/editDashboardModal.tpl.html",
    "<div class=\"wt-modal\">\n" +
    "  <div class=\"modal-header wt-modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"cancel()\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n" +
    "    <!-- New vs Edit Dashboard -->\n" +
    "    <h3 ng-show=\"modalInstanceType != 'new'\" class=\"modal-title\">Edit the dashboard <b>{{dashboard.name}}</b></h3>\n" +
    "    <h3 ng-show=\"modalInstanceType == 'new'\" class=\"modal-title\">Create new dashboard</b></h3>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"modal-body wt-modal-body\">\n" +
    "    <form role=\"form\" class=\"row\">\n" +
    "      <div class=\"form-group col-lg-6\">\n" +
    "        <label for=\"name\">Name</label>\n" +
    "        <!-- New vs Edit Dashboard -->\n" +
    "        <input type=\"text\" class=\"form-control\" id=\"name\" ng-show=\"modalInstanceType != 'new'\" placeholder=\"{{dashboard.name}}\" ng-model=\"dashboard.name\">\n" +
    "        <input type=\"text\" class=\"form-control\" id=\"name\" ng-show=\"modalInstanceType == 'new'\" ng-model=\"dashboard.name\">\n" +
    "        <small class=\"error\" ng-show=\"editDashboardForm.inputName.$error.required\">\n" +
    "          <strong>Dashboard name is required</strong>\n" +
    "        </small>\n" +
    "      </div>\n" +
    "      <div class=\"form-group col-lg-2\">\n" +
    "        <label>View</label><br />\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-class=\"{'grid': 'active', 'desktop': ''}[dashboard.layout]\" ng-click=\"dashboard.layout = 'grid'\">\n" +
    "            <i class=\"icon-grid\"></i>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-class=\"{'grid': '', 'desktop': 'active'}[dashboard.layout]\" ng-click=\"dashboard.layout = 'desktop'\">\n" +
    "            <i class=\"icon-stack\"></i>\n" +
    "        </button>\n" +
    "      </div>\n" +
    "      <div class=\"form-group col-lg-4 alert alert-warning\" style=\"padding-bottom: 0;\" ng-show=\"layoutChanged() && modalInstanceType != 'new'\">\n" +
    "          Changing the layout resets widget states\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"modal-footer wt-modal-footer\">\n" +
    "    <button class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <span ng-show=\"modalInstanceType != 'new'\">\n" +
    "      <button ng-show=\"editDashboardForm.$error.pattern || editDashboardForm.$error.required\"\n" +
    "              class=\"btn btn-primary\" disabled=\"disabled\">Save Dashboard</button>\n" +
    "      <button ng-show=\"!editDashboardForm.$error.pattern && !editDashboardForm.$error.required\"\n" +
    "              class=\"btn btn-primary\" ng-click=\"ok()\">Save Dashboard</button>\n" +
    "    </span>\n" +
    "    <button ng-show=\"modalInstanceType == 'new'\" class=\"btn btn-primary\" ng-click=\"createDashboard()\">Create Dashboard</button>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("ozpToolbar/ozpToolbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ozpToolbar/ozpToolbar.tpl.html",
    "<nav class=\"navbar navbar-default navbar-fixed-top ozp-toolbar\"\n" +
    "    ng-class=\"{true: 'hide', false: ''}[fullScreenMode]\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-left\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li><a class=\"lrg\" ng-href=\"{{hudUrl}}\"><i class=\"icon-home\"></i></a></li>\n" +
    "        <li><a class=\"lrg\" ng-href=\"{{centerUrl}}\"><i class=\"icon-shopping\"></i></a></li>\n" +
    "        <li class=\"active\"><a class=\"lrg\" ng-href=\"{{webtopUrl}}\"><i class=\"icon-layout\"></i></a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"navbar-right\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li class=\"dropdown\">\n" +
    "          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"icon-bell-filled\"></i></a>\n" +
    "          <ul class=\"dropdown-menu\">\n" +
    "            <li>\n" +
    "              <a href=\"#\">\n" +
    "                <button type=\"button\" class=\"close pull-right\"><span aria-hidden=\"true\">�</span></button>\n" +
    "                <img class=\"img-thumbnail pull-left\" src=\"https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/JotSpot32.png\" />\n" +
    "                <span>Writing down for maintenance</span><br /><i class=\"small\">12/12/12 00:00</i>\n" +
    "              </a>\n" +
    "            </li>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li>\n" +
    "              <a href=\"#\">\n" +
    "                <button type=\"button\" class=\"close\"><span aria-hidden=\"true\">�</span></button>\n" +
    "                <img class=\"img-thumbnail pull-left\" src=\"https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/AirMail32.png\" />\n" +
    "                <span>Airplanes down for maintenance</span><br /><i class=\"small\">12/12/12 00:00</i>\n" +
    "              </a>\n" +
    "            </li>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li>\n" +
    "              <a href=\"#\">\n" +
    "                <button type=\"button\" class=\"close\"><span aria-hidden=\"true\">�</span></button>\n" +
    "                <img class=\"img-thumbnail pull-left\" src=\"https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/ChatterBox32.png\" />\n" +
    "                <span>Chat down for maintenance</span><br /><i class=\"small\">12/12/12 00:00</i>\n" +
    "              </a>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a ng-click=\"helpUser()\" data-toggle=\"modal\" data-target=\"#modal_help\"><i class=\"icon-question\"></i></a>\n" +
    "        </li>\n" +
    "        <li class=\"dropdown\">\n" +
    "          <a href=\"#\" class=\"lrg dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"icon-menu\"></i></a>\n" +
    "          <ul class=\"dropdown-menu\">\n" +
    "            <li class=\"dropdown-header\">Personalize</li>\n" +
    "            <li><a href=\"#\"><i class=\"icon-ribbon\"></i>Bookmarks</a></li>\n" +
    "            <li><a href=\"#\"><i class=\"icon-head\"></i>Profile</a></li>\n" +
    "            <li><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_settings\"><i class=\"icon-cog\"></i>Settings</a></li>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li class=\"dropdown-header\">Create</li>\n" +
    "            <li><a href=\"#\"><i class=\"icon-wrench\"></i>Build a Dashboard</a></li>\n" +
    "            <li><a href=\"#\"><i class=\"icon-square-plus\"></i>Submit a Listing</a></li>\n" +
    "            <li><a href=\"#\"><i class=\"icon-cloud\"></i>Developer Resources</a></li>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li class=\"dropdown-header\">Manage</li>\n" +
    "            <li><a href=\"#\"><i class=\"icon-layers\"></i>Listing Management</a></li>\n" +
    "            <li><a href=\"#\"><i class=\"icon-shopping-settings\"></i>Marketplace Settings</a></li>\n" +
    "            <li><a ng-href=\"{{metricsUrl}}\" target=\"_blank\"><i class=\"icon-bar-graph-2\"></i>Metrics</a></li>\n" +
    "            <li><a class=\"caboose\" href=\"#\"><i class=\"icon-arrow-right\"></i>Logout</a></li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</nav>\n" +
    "");
}]);
