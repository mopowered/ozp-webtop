angular.module('templates-app', ['addApplicationsModal/addApplicationsModal.tpl.html', 'appToolbar/appToolbar.tpl.html', 'dashboardView/button/ozpbutton.tpl.html', 'dashboardView/chrome/ozpchrome.tpl.html', 'dashboardView/desktop/desktop.tpl.html', 'dashboardView/desktop/genericFrames/managedframe.tpl.html', 'dashboardView/desktop/genericFrames/managediframe.tpl.html', 'dashboardView/grid/grid.tpl.html', 'ozpToolbar/ozpToolbar.tpl.html', 'userPreferencesModal/settingsModal.tpl.html']);

angular.module("addApplicationsModal/addApplicationsModal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("addApplicationsModal/addApplicationsModal.tpl.html",
    "<div class=\"wt-modal add-apps-style\">\n" +
    "  <div class=\"modal-header wt-modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"cancel()\">\n" +
    "      <span aria-hidden=\"true\"><i class=\"fa fa-close close-icon\"></i> </span>\n" +
    "      <span class=\"sr-only\">Close</span>\n" +
    "    </button>\n" +
    "    <h3 class=\"modal-title\">Open bookmarked apps</h3>\n" +
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
    "        Open apps in new dashboard\n" +
    "        </button>\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"openApps()\">Open</button>\n" +
    "      </div>\n" +
    "      <div ng-switch-default>\n" +
    "        <button class=\"btn add-apps-dark-text\" disabled=\"disabled\"\n" +
    "                ng-click=\"openAppsInNewDashboard()\">\n" +
    "        Open apps in new dashboard\n" +
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
    "  <nav class=\"navbar navbar-default navbar-inverse app-toolbar no-rounded-corners\"\n" +
    "       role=\"navigation\" ng-class=\"{true: 'hide', false: ''}[fullScreenMode]\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "      <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "      <div class=\"navbar-header\">\n" +
    "        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n" +
    "          <span class=\"sr-only\">Toggle navigation</span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"nav navbar-nav\">\n" +
    "          <!-- stuff on the left side of the nav bar -->\n" +
    "          <li>\n" +
    "            <a class=\"navbar-brand\" href=\"\" ng-click=\"openApplicationsModal()\">\n" +
    "              <i class=\"fa fa-plus\" style=\"margin-top: 4px;\"></i>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "        <ul class=\"nav navbar-nav\">\n" +
    "          <li class=\"dropup\">\n" +
    "            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">{{currentDashboard.name | limitTo : dashboardNameLength}} <span class=\"caret\"></span></a>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "              <li ng-repeat=\"board in dashboards\">\n" +
    "                <a ng-click=\"setCurrentDashboard(board)\"\n" +
    "                   href=\"#/{{board.layout}}/{{board.id}}\"><i class=\"fa fa-desktop\"></i>&nbsp&nbsp {{board.name}}</a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "          <li class=\"divider-vertical\"></li>\n" +
    "          <li>\n" +
    "            <a ng-click=\"useGridLayout()\" href=\"#/grid/{{currentDashboard.id}}\"\n" +
    "               ng-class=\"{navLinkSelected: layout == 'grid'}\"\n" +
    "                tooltip=\"Grid layout\" tooltip-placement=\"top\">\n" +
    "              <i ng-class=\"{iconWhite: layout == 'grid'}\" class=\"fa fa-th fa-lg\"></i>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"divider-vertical\"></li>\n" +
    "          <li>\n" +
    "            <a ng-click=\"useDesktopLayout()\" href=\"#/desktop/{{currentDashboard.id}}\"\n" +
    "               ng-class=\"{navLinkSelected: layout == 'desktop'}\" tooltip=\"Desktop layout\"\n" +
    "                tooltip-placement=\"top\">\n" +
    "              <i ng-class=\"{iconWhite: layout == 'desktop'}\" class=\"fa fa-clipboard fa-lg\"></i>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"divider-vertical\"></li>\n" +
    "          <!-- stuff on the left side of the nav bar -->\n" +
    "          <li ng-repeat=\"app in myPinnedApps\" ng-click=\"maximizeFrame(app)\"\n" +
    "              >\n" +
    "            <a tooltip=\"{{app.name | limitTo : 15}}\" style=\"padding-right: 0px; padding-left: 15px; padding-bottom: 0px;\">\n" +
    "              <img class=\"chrome-icon app-toolbar-img\"\n" +
    "                   ng-src=\"{{app.icon.large}}\"/>\n" +
    "              <div ng-class=\"app.isMinimized && layout === 'desktop'? 'app-toolbar-inactive-app' : 'app-toolbar-active-app'\">&nbsp</div>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <ul class=\"nav navbar-nav navbar-right\">\n" +
    "          <li ng-show=\"previousAppsVisible\"><i class=\"fa fa-angle-double-left fa-inverse fa-lg link-pointer\"\n" +
    "                 ng-click=\"previousApps()\" style=\"margin-top: 15px;\"></i></li>\n" +
    "          <li ng-show=\"nextAppsVisible\"><i class=\"fa fa-angle-double-right fa-inverse fa-lg link-pointer\"\n" +
    "                 ng-click=\"nextApps()\" style=\"margin-top: 15px;\"></i></li>\n" +
    "\n" +
    "          <li class=\"divider-vertical\" style=\"margin-right: 0px; padding-right: 0px\"></li>\n" +
    "          <li style=\"margin-right: 0px; padding-right: 0px; margin-left: 0px; padding-left: 0px;\">\n" +
    "            <a ng-click=\"launchSettingsModal()\">\n" +
    "              <i class=\"fa fa-cog fa-lg link-pointer\"></i>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"hideToolbarButton link-pointer\" tooltip=\"Enter Full Screen\"\n" +
    "              tooltip-placement=\"top\"\n" +
    "              style=\"width: 25px; float: right; margin-right: 5px; margin-left: 10px; padding-left: 0px; \">\n" +
    "            <a ng-click=\"toggleFullScreenMode();\">\n" +
    "              <i class=\"fa fa-expand fa-lg\"></i>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div><!-- /.navbar-collapse -->\n" +
    "    </div><!-- /.container-fluid -->\n" +
    "  </nav>\n" +
    "<button class=\"hiddenToggle appHiddenToggle\" ng-click=\"toggleFullScreenMode();\"\n" +
    "        ng-class=\"{false: 'hide'}[fullScreenMode]\"\n" +
    "        tooltip=\"Exit Full Screen\" tooltip-placement=\"left\">\n" +
    "  <i class=\"fa fa-compress fa-lg\"></i>\n" +
    "</button>\n" +
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
    "<div class=\"ozp-chrome\">\n" +
    "  <img class=\"chrome-icon\" ng-src=\"{{frame.icon.small}}\">\n" +
    "  <span class=\"chrome-name\">{{frame.name}}</span>\n" +
    "  <span class=\"chrome-controls\" >\n" +
    "    <button type=\"button\" class=\"btn chrome-minimize\" ng-hide=\"isGrid\" ng-click=\"minimizeFrame(frame)\">\n" +
    "      <span class=\"glyphicon glyphicon-minus\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn chrome-maximize\" ng-hide=\"isGrid\" ng-click=\"maximizeFrame(frame)\">\n" +
    "      <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn chrome-close\" ng-click=\"isDisabled(frame)\">\n" +
    "      <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "    </button>\n" +
    "  </span>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboardView/desktop/desktop.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/desktop/desktop.tpl.html",
    "<!-- Frames are positioned by absolute positioning based on state -->\n" +
    "<ozp-managed-frame ng-repeat=\"frame in frames\" class=\"ozp-managed-frame\"\n" +
    "                   ng-hide=\"isFrameMinimized(frame)\" ng-style=\"styles\"\n" +
    "                   ng-class=\"{'fullWidth' : frame.isMaximized}\">\n" +
    "</ozp-managed-frame>");
}]);

angular.module("dashboardView/desktop/genericFrames/managedframe.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/desktop/genericFrames/managedframe.tpl.html",
    "<ozp-chrome></ozp-chrome>\n" +
    "<div class=\"managed-frame\" ng-include=\"frame.url\" height=\"style.height\" width=\"style.width\"></div>\n" +
    "");
}]);

angular.module("dashboardView/desktop/genericFrames/managediframe.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/desktop/genericFrames/managediframe.tpl.html",
    "<ozp-chrome ></ozp-chrome>\n" +
    "<iframe class=\"managed-iframe\" ng-controller=\"IframeCtrl\" ng-src=\"{{frame.trustedUrl}}\" frameBorder=\"0\" height=\"style.height\" width=\"style.width\"></iframe>");
}]);

angular.module("dashboardView/grid/grid.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/grid/grid.tpl.html",
    "<div class=\"container gridster-container-settings\" ng-class=\"{'grid-toolbar-padding' : !fullScreenMode}\">\n" +
    "  <div gridster=\"gridOptions\">\n" +
    "    <ul>\n" +
    "      <li gridster-item row=\"frame.gridLayout[deviceSize].row\" col=\"frame.gridLayout[deviceSize].col\"\n" +
    "          size-x=\"frame.gridLayout[deviceSize].sizeX\" size-y=\"frame.gridLayout[deviceSize].sizeY\"\n" +
    "          ng-repeat=\"frame in frames\" id=\"{{frame.id}}\"\n" +
    "          class=\"ozp-managed-frame\">\n" +
    "        <ozp-chrome></ozp-chrome>\n" +
    "        <iframe class=\"managed-iframe\"\n" +
    "                ng-class=\"{frameHighlighted: frame.highlighted}\"\n" +
    "                ng-src=\"{{frame.trustedUrl}}\" frameBorder=\"0\"\n" +
    "                height=\"frame.gridLayout.height\" width=\"frame.gridLayout.width\">\n" +
    "        </iframe>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("ozpToolbar/ozpToolbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ozpToolbar/ozpToolbar.tpl.html",
    "\n" +
    "  <nav class=\"navbar navbar-default navbar-inverse ozp-toolbar\n" +
    "    no-rounded-corners navbar-fixed-top\" role=\"navigation\"\n" +
    "       ng-class=\"{true: 'hide', false: ''}[fullScreenMode]\">\n" +
    "    <div class=\"container-fluid\" >\n" +
    "      <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "      <div class=\"navbar-header\">\n" +
    "        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n" +
    "          <span class=\"sr-only\">Toggle navigation</span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "        </button>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "      <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"\n" +
    "           style=\"padding-left: 15px;\">\n" +
    "        <ul class=\"nav navbar-nav\">\n" +
    "          <!-- stuff on the left side of the nav bar -->\n" +
    "          <li class=\"dropdown\">\n" +
    "              <a class=\"navbar-brand dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\"\n" +
    "                  id=\"main-menu-dropdown\">\n" +
    "                <i class=\"fa fa-list fa-lg\"></i>\n" +
    "              </a>\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"main-menu-dropdown\">\n" +
    "                <li>\n" +
    "                  <a ng-click=\"gotToAppLibrary()\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-th\">&nbsp&nbsp</i>App Library</a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a ng-click=\"goToAppBuilder()\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-wrench\">&nbsp&nbsp</i>App Builder\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a href=\"http://ozone-development.github.io/hud-ui/index.html\"\n" +
    "                     class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-home\">&nbsp&nbsp</i>HUD\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a ng-click=\"submitListing()\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-envelope-o\">&nbsp&nbsp</i>Submit a Listing\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a ng-click=\"goToMetrics()\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-bar-chart\">&nbsp&nbsp</i>Metrics\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a ng-click=\"goToDeveloperResources()\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-terminal\">&nbsp&nbsp</i>Developer Resources\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "\n" +
    "        <ul class=\"nav navbar-nav navbar-right\">\n" +
    "          <li>\n" +
    "            <span ng-show=\"!messages.unread\" class=\"fa-stack fa-1x no-notifications-icon\"\n" +
    "                  tooltip=\"No new messages\" tooltip-placement=\"bottom\">\n" +
    "                <i class=\"fa fa-bell-slash fa-lg\"></i>\n" +
    "              </span>\n" +
    "            <div class=\"stacked-icons notification-icon\">\n" +
    "              <span ng-show=\"messages.unread\" class=\"fa-stack fa-lg\">\n" +
    "                <i class=\"fa fa-bell fa-lg fa-inverse\"></i>\n" +
    "                <strong class=\"fa-stack-1x notification-text\">{{messages.unread}}</strong>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "            <!--<a href=\"#\"><i class=\"fa fa-bell-o fa-lg\"></i></a>-->\n" +
    "            <!--<a href=\"#\"><span class=\"badge\">{{messages.unread}}</span></a>-->\n" +
    "          </li>\n" +
    "          <li class=\"divider-vertical\"></li>\n" +
    "          <li>\n" +
    "            <li class=\"dropdown\">\n" +
    "            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
    "              <i class=\"fa fa-user fa-lg\">&nbsp</i>{{user | limitTo : usernameLength}} <span class=\"caret\"></span></a>\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                <li>\n" +
    "                  <a ng-click=\"launchPreferences()\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-cogs fa-fw menu-icon\"></i>Preferences\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a ng-click=\"helpUser()\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-question-circle fa-fw menu-icon\"></i>Help\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a href=\"http://ozone-development.github.io/hud-ui/logout.html\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-sign-out fa-fw menu-icon\"></i>Logout\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div><!-- /.navbar-collapse -->\n" +
    "    </div><!-- /.container-fluid -->\n" +
    "  </nav>\n" +
    "");
}]);

angular.module("userPreferencesModal/settingsModal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("userPreferencesModal/settingsModal.tpl.html",
    "<div class=\"wt-modal\">\n" +
    "  <div class=\"modal-header wt-modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"cancel()\">\n" +
    "      <span aria-hidden=\"true\"><i class=\"fa fa-close close-icon\"></i> </span>\n" +
    "      <span class=\"sr-only\">Close</span>\n" +
    "    </button>\n" +
    "    <h3 class=\"modal-title\">User Preferences</h3>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-3 col-md-4\">\n" +
    "          <h4> Dashboards </h4>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-7 col-md-8\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\" name=\"editDashboardsForm\">\n" +
    "\n" +
    "            <div class=\"form-group\"\n" +
    "                 ng-class=\"{'has-error': editDashboardsForm.$error.pattern || editDashboardsForm.$error.required || dashboard.flaggedForDelete}\"\n" +
    "                 ng-repeat=\"dashboard in dashboards\">\n" +
    "              <div class=\"col-sm-8 input-append\">\n" +
    "                <ng-form name=\"dashboardNameForm\">\n" +
    "                  <label class=\"control-label\" for=\"dashboardName\"\n" +
    "                       ng-show=\"dashboard.flaggedForDelete\">\n" +
    "                  Dashboard will be deleted</label>\n" +
    "                  <label class=\"control-label\" for=\"dashboardName\"\n" +
    "                       ng-show=\"dashboardNameForm.dashboardName.$error.pattern\">\n" +
    "                  Invalid name</label>\n" +
    "                  <label class=\"control-label\" for=\"dashboardName\"\n" +
    "                       ng-show=\"dashboardNameForm.dashboardName.$error.required\">\n" +
    "                  Required</label>\n" +
    "                  <input id=\"dashboardName\" type=\"text\" class=\"form-control\"\n" +
    "                       ng-pattern=\"validNamePattern\"\n" +
    "                       name=\"dashboardName\" ng-model=\"dashboard.name\" required\n" +
    "                      ng-readonly=\"dashboard.flaggedForDelete\">\n" +
    "                </ng-form>\n" +
    "              </div>\n" +
    "              <div class=\"col-sm-2\">\n" +
    "                <button ng-show=\"dashboard.flaggedForDelete\" type=\"button\"\n" +
    "                        class=\"btn btn-warning\"\n" +
    "                        ng-click=\"undoDeleteClicked(dashboard)\">Undo</button>\n" +
    "                <button ng-show=\"!dashboard.flaggedForDelete\" type=\"button\"\n" +
    "                        class=\"btn btn-danger\"\n" +
    "                        ng-click=\"deleteClicked(dashboard)\">Delete</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\"\n" +
    "                ng-class=\"{'has-error': editDashboardsForm.$error.pattern || editDashboardsForm.$error.required}\">\n" +
    "              <div class=\"col-sm-8 input-append\">\n" +
    "                <label class=\"control-label\" for=\"newDashboardNameInput\"\n" +
    "                       ng-show=\"editDashboardsForm.newDashboardNameInput.$error.pattern\">\n" +
    "                  Invalid name</label>\n" +
    "                  <label class=\"control-label\" for=\"newDashboardNameInput\"\n" +
    "                       ng-show=\"editDashboardsForm.newDashboardNameInput.$error.required\">\n" +
    "                  Required</label>\n" +
    "                  <input id=\"newDashboardNameInput\" type=\"text\" class=\"form-control\"\n" +
    "                       ng-pattern=\"validNamePattern\"\n" +
    "                       name=\"newDashboardNameInput\" ng-model=\"newDashboardName.name\"\n" +
    "                         ng-readonly=\"!addingNewBoard\" ng-required=\"addingNewBoard\">\n" +
    "              </div>\n" +
    "              <div class=\"col-sm-2\">\n" +
    "                <button ng-show=\"addingNewBoard\" type=\"button\"\n" +
    "                        class=\"btn btn-warning\"\n" +
    "                        ng-click=\"undoAddDashboardClicked()\">Undo</button>\n" +
    "                <button ng-show=\"!addingNewBoard\" type=\"button\"\n" +
    "                        class=\"btn btn-success\"\n" +
    "                        ng-click=\"addDashboardClicked()\">Add</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer wt-modal-footer\">\n" +
    "    <button ng-show=\"editDashboardsForm.$error.pattern || editDashboardsForm.$error.required\"\n" +
    "            class=\"btn btn-primary\" disabled=\"disabled\">Ok</button>\n" +
    "    <button ng-show=\"!editDashboardsForm.$error.pattern && !editDashboardsForm.$error.required\"\n" +
    "            class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"cancel()\">Cancel</button>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);
