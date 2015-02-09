YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "appLauncher.AppLauncherCtrl",
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
        "models.dashboardApi",
        "models.marketplaceApi",
        "models.userSettingsApi",
        "ozp.common.LocalStorage",
        "ozp.common.Utilities",
        "ozp.common.compareUrl",
        "ozp.common.elliptical",
        "ozp.common.iwc.iwcConnectedClient",
        "ozp.common.windowSizeWatcher",
        "ozpToolbar.OzpToolbarCtrl",
        "ozpToolbar.ozpToolbar",
        "services.iwcInterface",
        "services.localStorageInterface",
        "urlWidgetLauncher.UrlWidgetLauncherCtrl"
    ],
    "modules": [
        "ozp.common.ellipticalFilter",
        "ozp.common.iwc.client",
        "ozp.common.localStorage",
        "ozp.common.urlOriginComparer",
        "ozp.common.utilities",
        "ozp.common.windowSizeWatcher",
        "ozpWebtop",
        "ozpWebtop.addApplicationsModal",
        "ozpWebtop.appLauncher",
        "ozpWebtop.appToolbar",
        "ozpWebtop.constants",
        "ozpWebtop.dashboardView",
        "ozpWebtop.dashboardView.button",
        "ozpWebtop.dashboardView.chrome",
        "ozpWebtop.dashboardView.desktop",
        "ozpWebtop.dashboardView.desktop.managedFrame",
        "ozpWebtop.dashboardView.grid",
        "ozpWebtop.editDashboardModal",
        "ozpWebtop.models.dashboard",
        "ozpWebtop.models.marketplace",
        "ozpWebtop.models.userSettings",
        "ozpWebtop.ozpToolbar",
        "ozpWebtop.services.iwcInterface",
        "ozpWebtop.services.localStorageInterface",
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
            "displayName": "ozp.common.localStorage",
            "name": "ozp.common.localStorage",
            "description": "LocalStorage interface"
        },
        {
            "displayName": "ozp.common.urlOriginComparer",
            "name": "ozp.common.urlOriginComparer",
            "description": "compareUrl"
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
            "displayName": "ozpWebtop.appLauncher",
            "name": "ozpWebtop.appLauncher",
            "description": "Launches apps from other sources"
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
            "displayName": "ozpWebtop.models.dashboard",
            "name": "ozpWebtop.models.dashboard",
            "description": "Dashboard model"
        },
        {
            "displayName": "ozpWebtop.models.marketplace",
            "name": "ozpWebtop.models.marketplace",
            "description": "Marketplace model"
        },
        {
            "displayName": "ozpWebtop.models.userSettings",
            "name": "ozpWebtop.models.userSettings",
            "description": "User Settings model"
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
            "displayName": "ozpWebtop.services.localStorageInterface",
            "name": "ozpWebtop.services.localStorageInterface",
            "description": "Interface for working with Local Storage"
        },
        {
            "displayName": "ozpWebtop.urlWidgetLauncher",
            "name": "ozpWebtop.urlWidgetLauncher",
            "description": "The url widget launcher launches a new widget in the user's current dashboard\n(a new dashboard is created containing this widget if no dashboards for the\nuser exist). This is a stop gap solution - ultimately, this functionality\nneeds to be handled via IWC Intents"
        }
    ]
} };
});