// FPS-limited requestAnimationFrame setup
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 30); // Fallback for older browsers, 30 FPS
    };
})();