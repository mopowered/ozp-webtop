YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "appLauncher.AppLauncherCtrl",
        "appToolbar.ApplicationToolbarCtrl",
        "appToolbar.appToolbar",
        "constants",
        "dashboardToolbar.DashboardToolbarCtrl",
        "dashboardToolbar.dashboardToolbar",
        "dashboardView.ChromeCtrl",
        "dashboardView.DesktopCtrl",
        "dashboardView.GridCtrl",
        "dashboardView.IframeCtrl",
        "dashboardView.ozpButton",
        "dashboardView.ozpChrome",
        "dashboardView.ozpGridsterItem",
        "dashboardView.ozpManagedFrame",
        "general.dashboardChangeMonitor",
        "models.dashboardApi",
        "models.marketplaceApi",
        "models.userSettingsApi",
        "ozp.common.LocalStorage",
        "ozp.common.Utilities",
        "ozp.common.compareUrl",
        "ozp.common.elliptical",
        "ozp.common.iwc.iwcConnectedClient",
        "ozp.common.windowSizeWatcher",
        "services.iwcInterface",
        "services.localStorageInterface",
        "userSettings.ModalInstanceCtrl",
        "userSettings.userSettings"
    ],
    "modules": [
        "ozp.common.ellipticalFilter",
        "ozp.common.iwc.client",
        "ozp.common.localStorage",
        "ozp.common.urlOriginComparer",
        "ozp.common.utilities",
        "ozp.common.windowSizeWatcher",
        "ozpWebtop",
        "ozpWebtop.appLauncher",
        "ozpWebtop.appToolbar",
        "ozpWebtop.constants",
        "ozpWebtop.dashboardToolbar",
        "ozpWebtop.dashboardView.button",
        "ozpWebtop.dashboardView.chrome",
        "ozpWebtop.dashboardView.desktop",
        "ozpWebtop.dashboardView.desktop.managedFrame",
        "ozpWebtop.dashboardView.grid",
        "ozpWebtop.dashboardView.grid.gridsterFrame",
        "ozpWebtop.dashboardView.iframe",
        "ozpWebtop.models.dashboard",
        "ozpWebtop.models.marketplace",
        "ozpWebtop.models.userSettings",
        "ozpWebtop.services.dashboardChangeMonitor",
        "ozpWebtop.services.iwcInterface",
        "ozpWebtop.services.localStorageInterface",
        "ozpWebtop.userSettings"
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
            "displayName": "ozpWebtop.dashboardToolbar",
            "name": "ozpWebtop.dashboardToolbar",
            "description": "The dashboard toolbar component shown in the Webtop."
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
            "displayName": "ozpWebtop.dashboardView.grid.gridsterFrame",
            "name": "ozpWebtop.dashboardView.grid.gridsterFrame",
            "description": "Gridster frames"
        },
        {
            "displayName": "ozpWebtop.dashboardView.iframe",
            "name": "ozpWebtop.dashboardView.iframe",
            "description": "iframe module for dashboard layouts"
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
            "displayName": "ozpWebtop.services.dashboardChangeMonitor",
            "name": "ozpWebtop.services.dashboardChangeMonitor",
            "description": "Dashboard change monitor"
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
            "displayName": "ozpWebtop.userSettings",
            "name": "ozpWebtop.userSettings",
            "description": "The modal encompassing user settings functionality."
        }
    ]
} };
});