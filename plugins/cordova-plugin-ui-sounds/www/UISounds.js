cordova.define("cordova-plugin-ui-sounds.Plugin", function(require, exports, module) {
var exec = require('cordova/exec');

function UISoundsPlugin() {
  console.info('UISounds.js: plugin is created');
}

UISoundsPlugin.prototype.preloadSound = function(assetPath) {
  return new Promise(function(resolve, reject) {
    exec(
      function(result) {
        resolve(result);
      },
      function(error) {
        reject(error);
      },
      'UISounds',
      'preloadSound',
      [assetPath]
    );
  });
};

UISoundsPlugin.prototype.preloadMultiple = function(arrayOfAssetPaths) {
  return new Promise(function(resolve, reject) {
    exec(
      function(result) {
        resolve(result);
      },
      function(error) {
        reject(error);
      },
      'UISounds',
      'preloadMultiple',
      arrayOfAssetPaths
    );
  });
};

UISoundsPlugin.prototype.playSound = function(assetPath, volume) {
  return new Promise(function(resolve, reject) {
    exec(
      function(result) {
        resolve(result);
      },
      function(error) {
        reject(error);
      },
      'UISounds',
      'playSound',
      [assetPath, volume]
    );
  });
};

UISoundsPlugin.prototype.unloadSound = function(assetPath) {
  return new Promise(function(resolve, reject) {
    exec(
      function(result) {
        resolve(result);
      },
      function(error) {
        reject(error);
      },
      'UISounds',
      'unloadSound',
      [assetPath]
    );
  });
};

var uiSoundsPlugin = new UISoundsPlugin();
module.exports = uiSoundsPlugin;

});
