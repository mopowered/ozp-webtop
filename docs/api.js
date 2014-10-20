YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "appLauncher.AppLauncherCtrl",
        "appToolbar.ApplicationToolbarCtrl",
        "appToolbar.appToolbar",
        "common.windowSizeWatcher",
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
        "general.iwcInterface",
        "general.localStorageInterface",
        "models.dashboardApi",
        "models.marketplaceApi",
        "models.userSettingsApi",
        "ozp.common.LocalStorage",
        "ozp.common.Utilities",
        "ozp.common.compareUrl",
        "ozp.common.elliptical",
        "ozp.common.iwcConnectedClient",
        "userSettings.ModalInstanceCtrl",
        "userSettings.userSettings"
    ],
    "modules": [
        "ozp.common",
        "ozpWebtopApp",
        "ozpWebtopApp.appLauncher",
        "ozpWebtopApp.appToolbar",
        "ozpWebtopApp.constants",
        "ozpWebtopApp.dashboardToolbar",
        "ozpWebtopApp.dashboardView",
        "ozpWebtopApp.general",
        "ozpWebtopApp.models",
        "ozpWebtopApp.userSettings"
    ],
    "allModules": [
        {
            "displayName": "ozp.common",
            "name": "ozp.common",
            "description": "Common services that are not specific to Webtop"
        },
        {
            "displayName": "ozpWebtopApp",
            "name": "ozpWebtopApp",
            "description": "Top level module of the Webtop. When declared in an HTML file, it bootstraps\nthe Webtop."
        },
        {
            "displayName": "ozpWebtopApp.appLauncher",
            "name": "ozpWebtopApp.appLauncher",
            "description": "Launches apps from other sources"
        },
        {
            "displayName": "ozpWebtopApp.appToolbar",
            "name": "ozpWebtopApp.appToolbar",
            "description": "The application toolbar in the Webtop."
        },
        {
            "displayName": "ozpWebtopApp.constants",
            "name": "ozpWebtopApp.constants",
            "description": "Constants used throughout the application"
        },
        {
            "displayName": "ozpWebtopApp.dashboardToolbar",
            "name": "ozpWebtopApp.dashboardToolbar",
            "description": "The dashboard toolbar component shown in the Webtop."
        },
        {
            "displayName": "ozpWebtopApp.dashboardView",
            "name": "ozpWebtopApp.dashboardView",
            "description": "The dashboard view in the Webtop. Contains the area where a user uses their\napplications/widgets."
        },
        {
            "displayName": "ozpWebtopApp.general",
            "name": "ozpWebtopApp.general",
            "description": "General utilities for use in Webtop. Includes some services and other fairly\ngeneric capabilities."
        },
        {
            "displayName": "ozpWebtopApp.models",
            "name": "ozpWebtopApp.models",
            "description": "Models and APIs to retrieve and send data to places external to the Webtop."
        },
        {
            "displayName": "ozpWebtopApp.userSettings",
            "name": "ozpWebtopApp.userSettings",
            "description": "The modal encompassing user settings functionality."
        }
    ]
} };
});