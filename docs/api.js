YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "appToolbar.ApplicationToolbarCtrl",
        "appToolbar.appToolbar",
        "constants",
        "dashboardView.ChromeCtrl",
        "dashboardView.DashboardViewCtrl",
        "dashboardView.DesktopCtrl",
        "dashboardView.GridCtrl",
        "dashboardView.ozpButton",
        "dashboardView.ozpChrome",
        "dashboardView.ozpManagedFrame",
        "models.models",
        "ozp.common.Utilities",
        "ozp.common.elliptical",
        "ozp.common.iwc.iwcConnectedClient",
        "ozp.common.windowSizeWatcher",
        "ozpToolbar.OzpToolbarCtrl",
        "ozpToolbar.ozpToolbar",
        "services.iwcInterface",
        "services.restInterface",
        "urlWidgetLauncher.UrlWidgetLauncherCtrl"
    ],
    "modules": [
        "ozp.common.ellipticalFilter",
        "ozp.common.iwc.client",
        "ozp.common.utilities",
        "ozp.common.windowSizeWatcher",
        "ozpWebtop",
        "ozpWebtop.addApplicationsModal",
        "ozpWebtop.appToolbar",
        "ozpWebtop.constants",
        "ozpWebtop.dashboardView",
        "ozpWebtop.dashboardView.button",
        "ozpWebtop.dashboardView.chrome",
        "ozpWebtop.dashboardView.desktop",
        "ozpWebtop.dashboardView.desktop.managedFrame",
        "ozpWebtop.dashboardView.grid",
        "ozpWebtop.editDashboardModal",
        "ozpWebtop.models",
        "ozpWebtop.ozpToolbar",
        "ozpWebtop.services.iwcInterface",
        "ozpWebtop.services.restInterface",
        "ozpWebtop.urlWidgetLauncher"
    ],
    "allModules": [
        {
            "displayName": "ozp.common.ellipticalFilter",
            "name": "ozp.common.ellipticalFilter",
            "description": "elliptical filter"
        },
        {
            "displayName": "ozp.common.iwc.client",
            "name": "ozp.common.iwc.client",
            "description": "IWC client"
        },
        {
            "displayName": "ozp.common.utilities",
            "name": "ozp.common.utilities",
            "description": "Various utility functions"
        },
        {
            "displayName": "ozp.common.windowSizeWatcher",
            "name": "ozp.common.windowSizeWatcher",
            "description": "Window size watcher"
        },
        {
            "displayName": "ozpWebtop",
            "name": "ozpWebtop",
            "description": "Top level module of the Webtop. When declared in an HTML file, it bootstraps\nthe Webtop."
        },
        {
            "displayName": "ozpWebtop.addApplicationsModal",
            "name": "ozpWebtop.addApplicationsModal",
            "description": "Add Applications modal dialog"
        },
        {
            "displayName": "ozpWebtop.appToolbar",
            "name": "ozpWebtop.appToolbar",
            "description": "The application toolbar in the Webtop."
        },
        {
            "displayName": "ozpWebtop.constants",
            "name": "ozpWebtop.constants",
            "description": "Constants used throughout the application"
        },
        {
            "displayName": "ozpWebtop.dashboardView",
            "name": "ozpWebtop.dashboardView",
            "description": "Dashboard view controller\n\nParent controller for Sticky State (ui-router-extras)"
        },
        {
            "displayName": "ozpWebtop.dashboardView.button",
            "name": "ozpWebtop.dashboardView.button",
            "description": "ozpButton module"
        },
        {
            "displayName": "ozpWebtop.dashboardView.chrome",
            "name": "ozpWebtop.dashboardView.chrome",
            "description": "ozp Chrome module"
        },
        {
            "displayName": "ozpWebtop.dashboardView.desktop",
            "name": "ozpWebtop.dashboardView.desktop",
            "description": "Desktop layout main controller"
        },
        {
            "displayName": "ozpWebtop.dashboardView.desktop.managedFrame",
            "name": "ozpWebtop.dashboardView.desktop.managedFrame",
            "description": "Desktop managed frame"
        },
        {
            "displayName": "ozpWebtop.dashboardView.grid",
            "name": "ozpWebtop.dashboardView.grid",
            "description": "Grid layout main controller"
        },
        {
            "displayName": "ozpWebtop.editDashboardModal",
            "name": "ozpWebtop.editDashboardModal",
            "description": "Edit Dashboard modal dialog"
        },
        {
            "displayName": "ozpWebtop.models",
            "name": "ozpWebtop.models",
            "description": "models and Data Access Layer for webtop"
        },
        {
            "displayName": "ozpWebtop.ozpToolbar",
            "name": "ozpWebtop.ozpToolbar",
            "description": "The ozp toolbar component shown in the Webtop."
        },
        {
            "displayName": "ozpWebtop.services.iwcInterface",
            "name": "ozpWebtop.services.iwcInterface",
            "description": "Interface for working with IWC"
        },
        {
            "displayName": "ozpWebtop.services.restInterface",
            "name": "ozpWebtop.services.restInterface",
            "description": "Interface for working with the ozp-rest API"
        },
        {
            "displayName": "ozpWebtop.urlWidgetLauncher",
            "name": "ozpWebtop.urlWidgetLauncher",
            "description": "The url widget launcher launches a new widget in the user's current dashboard\n(a new dashboard is created containing this widget if no dashboards for the\nuser exist). This is a stop gap solution - ultimately, this functionality\nneeds to be handled via IWC Intents"
        }
    ]
} };
});