
cordova.define("com.jafetegill.gameperformance.GamePerformance", function(require, exports, module) {
    var exec = require('cordova/exec');
    
    var PerformancePlugin = {
        getFrameRate: function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'getFrameRate', []);
        },
        getMemoryUsage: function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'getMemoryUsage', []);
        },
        getCPUUsage: function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'getCPUUsage', []);
        },
        getGPUUsage: function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'getGPUUsage', []);
        },
        suggestOptimizations: function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'suggestOptimizations', []);
        },
        startMonitoring: function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'startMonitoring', []);
        },
        stopMonitoring: function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'stopMonitoring', []);
        },
        enableOptimizationSuggestions: function(enabled, successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'enableOptimizationSuggestions', [enabled]);
        },
        setOptimizationThresholds: function(cpuThreshold, gpuThreshold, fpsThreshold, successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'setOptimizationThresholds', [cpuThreshold, gpuThreshold, fpsThreshold]);
        },
        optimizeRendering: function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'optimizeRendering', []);
        },
        optimizeGame: function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, 'PerformancePlugin', 'optimizeGame', []);
        }
    };
    
    module.exports = PerformancePlugin;
    
});

});
