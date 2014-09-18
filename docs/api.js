YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "apis.dashboardApi",
        "apis.iwcDashboardApiImpl",
        "apis.localStorageDashboardApiImpl",
        "components.ozpButton",
        "components.ozpIcon",
        "dashboardView.GridController",
        "dashboardView.IframeController",
        "dashboardView.ozpGridsterItem",
        "dashboardView.ozpManagedFrame",
        "general.Utiliites",
        "general.dashboardChangeMonitor",
        "general.elliptical"
    ],
    "modules": [
        "ozpWebtopApp",
        "ozpWebtopApp.apis",
        "ozpWebtopApp.appToolbar",
        "ozpWebtopApp.components",
        "ozpWebtopApp.dashboardToolbar",
        "ozpWebtopApp.dashboardView",
        "ozpWebtopApp.general",
        "ozpWebtopApp.ozpIwcClient",
        "ozpWebtopApp.userSettings"
    ],
    "allModules": [
        {
            "displayName": "ozpWebtopApp",
            "name": "ozpWebtopApp",
            "description": "Top level module of the Webtop. When declared in an HTML file, it bootstraps the Webtop."
        },
        {
            "displayName": "ozpWebtopApp.apis",
            "name": "ozpWebtopApp.apis",
            "description": "APIs retrieve and send data to places external to the Webtop."
        },
        {
            "displayName": "ozpWebtopApp.appToolbar",
            "name": "ozpWebtopApp.appToolbar",
            "description": "The application toolbar in the Webtop."
        },
        {
            "displayName": "ozpWebtopApp.components",
            "name": "ozpWebtopApp.components",
            "description": "Reusable components for the Webtop."
        },
        {
            "displayName": "ozpWebtopApp.dashboardToolbar",
            "name": "ozpWebtopApp.dashboardToolbar",
            "description": "The dashboard toolbar component shown in the Webtop."
        },
        {
            "displayName": "ozpWebtopApp.dashboardView",
            "name": "ozpWebtopApp.dashboardView",
            "description": "The dashboard view in the Webtop. Contains the area where a user uses their applications/widgets."
        },
        {
            "displayName": "ozpWebtopApp.general",
            "name": "ozpWebtopApp.general",
            "description": "General utilities for use in Webtop. Includes some services and other fairly generic \ncapabilities."
        },
        {
            "displayName": "ozpWebtopApp.ozpIwcClient",
            "name": "ozpWebtopApp.ozpIwcClient",
            "description": "Provides an OZP IWC client using a Promises to indicate valid connection"
        },
        {
            "displayName": "ozpWebtopApp.userSettings",
            "name": "ozpWebtopApp.userSettings",
            "description": "The modal encompassing user settings functionality."
        }
    ]
} };
});