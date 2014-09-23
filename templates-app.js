angular.module('templates-app', ['appToolbar/appToolbar.tpl.html', 'components/button/ozpbutton.tpl.html', 'components/chrome/ozpchrome.tpl.html', 'components/icon/ozpicon.tpl.html', 'dashboardToolbar/dashboardToolbar.tpl.html', 'dashboardView/desktop/desktop.tpl.html', 'dashboardView/grid/grid.tpl.html', 'dashboardView/templates/managedframe.tpl.html', 'dashboardView/templates/managediframe.tpl.html', 'userSettings/settingsModal.tpl.html']);

angular.module("appToolbar/appToolbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("appToolbar/appToolbar.tpl.html",
    "<div ng-controller=\"ApplicationToolbarCtrl\">\n" +
    "  <nav class=\"navbar navbar-default navbar-inverse app-toolbar no-rounded-corners navbar-fixed-bottom\"\n" +
    "       role=\"navigation\" ng-class=\"{true: 'hide', false: ''}[appboardhide]\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "      <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "      <div class=\"navbar-header\">\n" +
    "        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n" +
    "          <span class=\"sr-only\">Toggle navigation</span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "        </button>\n" +
    "        <div class=\"dropdown\">\n" +
    "          <a class=\"navbar-brand dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\"><i class=\"fa fa-list\"></i></a>\n" +
    "          <ul class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"app in myApps\">\n" +
    "              <a ng-click=\"appClicked(app)\" class=\"link-pointer\"\n" +
    "                  tooltip-placement=\"right\" tooltip=\"{{app.shortDescription}}\">\n" +
    "                <img ng-src=\"{{app.icon}}\" height=\"20\" width=\"20\" />\n" +
    "                {{app.name}}</a>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "        <ul class=\"nav navbar-nav\">\n" +
    "          <!-- stuff on the left side of the nav bar -->\n" +
    "          <li ng-repeat=\"app in myPinnedApps\" ng-click=\"maximizeFrame(app)\"\n" +
    "              ng-class=\"app.isMinimized && layout === 'desktop'? 'inactive-app' : 'active-app'\"\n" +
    "              >\n" +
    "            <a><img class=\"chrome-icon app-toolbar-img\" ng-src=\"{{app.icon}}\"/>{{app.name}}</i></a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li class=\"divider-vertical\"></li>\n" +
    "          <li class=\"hideToolbarButton\" tooltip=\"Hide toolbar\" tooltip-placement=\"top\">\n" +
    "            <a ng-click=\"appboardhider();\">\n" +
    "              <i class=\"fa fa-toggle-down fa-lg\"></i>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div><!-- /.navbar-collapse -->\n" +
    "    </div><!-- /.container-fluid -->\n" +
    "  </nav>\n" +
    "<button class=\"hiddenToggle appHiddenToggle\" ng-click=\"appboardhider();\"\n" +
    "        ng-class=\"{false: 'hide'}[appboardhide]\"\n" +
    "        tooltip=\"Show toolbar\" tooltip-placement=\"left\">\n" +
    "  <i class=\"fa fa-toggle-up\"></i>\n" +
    "</button>\n" +
    "</div>");
}]);

angular.module("components/button/ozpbutton.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/button/ozpbutton.tpl.html",
    "<a class=\"btn\" ng-href=\"{{button.url}}\">\n" +
    "    <!-- Bootstrap icon\n" +
    "    <span class=\"glyphicon {{button.icon}}\"></span>\n" +
    "    -->\n" +
    "    <img ng-src=\"{{button.icon}}\">\n" +
    "    <span>{{button.text | elliptical:button.elliptical}}</span>\n" +
    "</a>\n" +
    "");
}]);

angular.module("components/chrome/ozpchrome.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/chrome/ozpchrome.tpl.html",
    "<div class=\"ozp-chrome\">\n" +
    "  <img class=\"chrome-icon\" ng-src=\"{{frame.icon}}\">\n" +
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

angular.module("components/icon/ozpicon.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/icon/ozpicon.tpl.html",
    "<a href=\"\" ng-click=\"handleIconClick(icon)\" class=\"ozp-icon\">\n" +
    "  <!-- Bootstrap icon\n" +
    "  <span class=\"glyphicon {{icon.icon}}\"></span>\n" +
    "  -->\n" +
    "  <img ng-src=\"{{icon.icon}}\">\n" +
    "  <div>{{icon.text}}</div>\n" +
    "</a>\n" +
    "");
}]);

angular.module("dashboardToolbar/dashboardToolbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardToolbar/dashboardToolbar.tpl.html",
    "<div ng-controller=\"DashboardToolbarCtrl\">\n" +
    "  <nav class=\"navbar navbar-default navbar-inverse dashboard-toolbar\n" +
    "    no-rounded-corners\" role=\"navigation\"  ng-class=\"{true: 'hide', false: ''}[dashboardhide]\">\n" +
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
    "      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
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
    "          <li class=\"dropdown\">\n" +
    "            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">{{currentDashboard.name}} <span class=\"caret\"></span></a>\n" +
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
    "                tooltip=\"Grid layout\" tooltip-placement=\"bottom\">\n" +
    "              <i ng-class=\"{iconWhite: layout == 'grid'}\" class=\"fa fa-th fa-lg\"></i>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"divider-vertical\"></li>\n" +
    "          <li>\n" +
    "            <a ng-click=\"useDesktopLayout()\" href=\"#/desktop/{{currentDashboard.id}}\"\n" +
    "               ng-class=\"{navLinkSelected: layout == 'desktop'}\" tooltip=\"Desktop layout\"\n" +
    "                tooltip-placement=\"bottom\">\n" +
    "              <i ng-class=\"{iconWhite: layout == 'desktop'}\" class=\"fa fa-clipboard fa-lg\"></i>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"divider-vertical\"></li>\n" +
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
    "            <div id=\"dashboard-clock\">{{zuluTime}} Z</div>\n" +
    "          </li>\n" +
    "          <li class=\"divider-vertical\"></li>\n" +
    "          <li>\n" +
    "            <li class=\"dropdown\">\n" +
    "            <a href=\"#\" class=\"dropdown-toggle testt\" data-toggle=\"dropdown\">\n" +
    "              <i class=\"fa fa-user fa-lg\">&nbsp</i>{{user}} <span class=\"caret\"></span></a>\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                <li>\n" +
    "                  <a ng-click=\"launchSettingsModal()\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-cogs fa-fw menu-icon\"></i>Settings\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a ng-click=\"helpUser()\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-question-circle fa-fw menu-icon\"></i>Take a tour\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a ng-click=\"logOutUser()\" class=\"link-pointer\">\n" +
    "                    <i class=\"fa fa-sign-out fa-fw menu-icon\"></i>Logout\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "          </li>\n" +
    "          <li class=\"divider-vertical\"></li>\n" +
    "          <li class=\"hideToolbarButton\" tooltip=\"Hide toolbar\" tooltip-placement=\"bottom\"\n" +
    "              style=\"width: 25px; float: right;\">\n" +
    "            <a ng-click=\"dashboardhider();\">\n" +
    "              <i class=\"fa fa-toggle-up fa-lg\"></i>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div><!-- /.navbar-collapse -->\n" +
    "    </div><!-- /.container-fluid -->\n" +
    "  </nav>\n" +
    "  <button class=\"hiddenToggle dashToggle\" ng-click=\"dashboardhider();\"\n" +
    "          ng-class=\"{false: 'hide'}[dashboardhide]\"\n" +
    "          tooltip=\"Show toolbar\" tooltip-placement=\"left\">\n" +
    "    <i class=\"fa fa-toggle-down\"></i>\n" +
    "  </button>\n" +
    "</div>");
}]);

angular.module("dashboardView/desktop/desktop.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/desktop/desktop.tpl.html",
    "<!-- Frames are positioned by absolute positioning based on state -->\n" +
    "<ozp-managed-frame ng-repeat=\"frame in frames\" class=\"ozp-managed-frame\" ng-hide=\"isFrameMinimized(frame)\" ng-style=\"styles\" ng-class=\"{'fullWidth' : frame.isMaximized, 'appToggle' : frame.isMaximized && appBarHidden, 'dashToggle' : frame.isMaximized && dashBarHidden}\"></ozp-managed-frame>\n" +
    "\n" +
    "<!-- Place icons in the desktop -->\n" +
    "<div class='icon-container'>\n" +
    "    <ozp-icon ng-repeat=\"icon in icons | orderBy:'index'\" class=\"ozp-icon\"></ozp-icon>\n" +
    "</div>");
}]);

angular.module("dashboardView/grid/grid.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/grid/grid.tpl.html",
    "<div class=\"container gridster-container-settings\" ng-class=\"{'grid-toolbar-padding' : !appBarHidden}\">\n" +
    "  <div gridster=\"gridOptions\">\n" +
    "    <ul>\n" +
    "      <li gridster-item row=\"item.gridLayout.row\" col=\"item.gridLayout.col\"\n" +
    "          size-x=\"item.gridLayout.sizeX\" size-y=\"item.gridLayout.sizeY\"\n" +
    "          ng-repeat=\"item in frames\" id=\"{{item.id}}\"\n" +
    "          ozp-gridster-item=\"\" frame=\"item\" ng-hide=\"isDisabled\">\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboardView/templates/managedframe.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/templates/managedframe.tpl.html",
    "<ozp-chrome></ozp-chrome>\n" +
    "<div class=\"managed-frame\" ng-include=\"frame.url\" ></div>\n" +
    "");
}]);

angular.module("dashboardView/templates/managediframe.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboardView/templates/managediframe.tpl.html",
    "<ozp-chrome></ozp-chrome>\n" +
    "<iframe class=\"managed-iframe\" ng-controller=\"IframeCtrl\"\n" +
    "  ng-src=\"{{frame.trustedUrl}}\"\n" +
    "  frameBorder=\"0\" height=\"{{styles.height}}\"\n" +
    "  width=\"{{styles.width}}\">\n" +
    "</iframe>");
}]);

angular.module("userSettings/settingsModal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("userSettings/settingsModal.tpl.html",
    "<div class=\"modal-fmt\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">Settings</h3>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "          <h4>Preferences </h4>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-8\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"themeSelect\" class=\"col-sm-6 control-label\"> Theme </label>\n" +
    "              <div class=\"col-sm-6\">\n" +
    "                <select class=\"form-control\" id=\"themeSelect\"\n" +
    "                    ng-model=\"preferences.theme\" ng-options=\"theme for theme in themes\">\n" +
    "                </select>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"defaultDashboardSelect\" class=\"col-sm-6 control-label\">\n" +
    "                Default Dashboard </label>\n" +
    "              <div class=\"col-sm-6\">\n" +
    "                <select class=\"form-control\" id=\"defaultDashboardSelect\"\n" +
    "                        ng-model=\"preferences.defaultDashboard\"\n" +
    "                        ng-options=\"board.name as board.name for board in dashboards\">\n" +
    "                </select>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <hr />\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "          <h4> Dashboards </h4>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-8\">\n" +
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
    "  <div class=\"modal-footer\">\n" +
    "    <button ng-show=\"editDashboardsForm.$error.pattern || editDashboardsForm.$error.required\"\n" +
    "            class=\"btn btn-primary\" disabled=\"disabled\">Ok</button>\n" +
    "    <button ng-show=\"!editDashboardsForm.$error.pattern && !editDashboardsForm.$error.required\"\n" +
    "            class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"cancel()\">Cancel</button>\n" +
    "  </div>\n" +
    "</div>");
}]);
