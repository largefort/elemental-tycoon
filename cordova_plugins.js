cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com.telerik.plugins.nativepagetransitions.NativePageTransitions",
      "file": "plugins/com.telerik.plugins.nativepagetransitions/www/NativePageTransitions.js",
      "pluginId": "com.telerik.plugins.nativepagetransitions",
      "clobbers": [
        "window.plugins.nativepagetransitions"
      ]
    },
    {
      "id": "cordova-plugin-ionic-webview.IonicWebView",
      "file": "plugins/cordova-plugin-ionic-webview/src/www/util.js",
      "pluginId": "cordova-plugin-ionic-webview",
      "clobbers": [
        "Ionic.WebView"
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
      "id": "com.jafetegill.gameperformance.GamePerformance",
      "file": "plugins/com.jafetegill.gameperformance/www/GamePerformance.js",
      "pluginId": "com.jafetegill.gameperformance",
      "clobbers": [
        "cordova.plugins.GamePerformance"
      ]
    }
  ];
  module.exports.metadata = {
    "com.telerik.plugins.nativepagetransitions": "0.7.0",
    "cordova-plugin-android-fullscreen": "1.0.0",
    "cordova-plugin-fastclick": "1.0.0",
    "cordova-plugin-ionic-webview": "5.0.0",
    "cordova-plugin-proguard": "2.2.0",
    "cordova-plugin-splashscreen": "6.0.1",
    "cordova-plugin-ui-sounds": "1.2.2",
    "com.jafetegill.gameperformance": "0.1.1"
  };
});