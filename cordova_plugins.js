cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-admobpro.AdMob",
      "file": "plugins/cordova-plugin-admobpro/www/AdMob.js",
      "pluginId": "cordova-plugin-admobpro",
      "clobbers": [
        "window.AdMob"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "cordova-plugin-ui-sounds.Plugin",
      "file": "plugins/cordova-plugin-ui-sounds/www/UISounds.js",
      "pluginId": "cordova-plugin-ui-sounds",
      "clobbers": [
        "plugins.UISounds"
      ]
    },
    {
      "id": "com.telerik.plugins.nativepagetransitions.NativePageTransitions",
      "file": "plugins/com.telerik.plugins.nativepagetransitions/www/NativePageTransitions.js",
      "pluginId": "com.telerik.plugins.nativepagetransitions",
      "clobbers": [
        "window.plugins.nativepagetransitions"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-badge.Badge",
      "file": "plugins/cordova-plugin-badge/www/badge.js",
      "pluginId": "cordova-plugin-badge",
      "clobbers": [
        "cordova.plugins.notification.badge"
      ]
    },
    {
      "id": "@parrino/cordova-plugin-local-notifications.LocalNotification",
      "file": "plugins/@parrino/cordova-plugin-local-notifications/www/local-notification.js",
      "pluginId": "@parrino/cordova-plugin-local-notifications",
      "clobbers": [
        "cordova.plugins.notification.local"
      ]
    },
    {
      "id": "@parrino/cordova-plugin-local-notifications.LocalNotification.Core",
      "file": "plugins/@parrino/cordova-plugin-local-notifications/www/local-notification-core.js",
      "pluginId": "@parrino/cordova-plugin-local-notifications",
      "clobbers": [
        "cordova.plugins.notification.local.core",
        "plugin.notification.local.core"
      ]
    },
    {
      "id": "@parrino/cordova-plugin-local-notifications.LocalNotification.Util",
      "file": "plugins/@parrino/cordova-plugin-local-notifications/www/local-notification-util.js",
      "pluginId": "@parrino/cordova-plugin-local-notifications",
      "merges": [
        "cordova.plugins.notification.local.core",
        "plugin.notification.local.core"
      ]
    },
    {
      "id": "cordova-plugin-ionic-webview.IonicWebView",
      "file": "plugins/cordova-plugin-ionic-webview/src/www/util.js",
      "pluginId": "cordova-plugin-ionic-webview",
      "clobbers": [
        "Ionic.WebView"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-extension": "1.6.0",
    "cordova-plugin-admobpro": "8.13.1",
    "cordova-plugin-android-fullscreen": "1.0.0",
    "cordova-plugin-splashscreen": "6.0.1",
    "cordova-plugin-ui-sounds": "1.2.2",
    "com.telerik.plugins.nativepagetransitions": "0.7.0",
    "cordova-plugin-device": "3.0.0",
    "cordova-plugin-badge": "0.8.9",
    "@parrino/cordova-plugin-local-notifications": "1.0.5",
    "cordova-plugin-ionic-webview": "5.0.0",
    "cordova-plugin-fastclick": "1.0.0"
  };
});