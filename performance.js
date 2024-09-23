let performanceModeEnabled = false; // Declare the variable to track performance mode
const defaultFPS = 60; // Set the default FPS

function togglePerformanceMode() {
    const performanceBtn = document.getElementById('performance-btn');
    
    if (performanceModeEnabled) {
        // Switch back to normal (high-performance mode)
        setFPS(defaultFPS); // Reset FPS to the default
        performanceBtn.textContent = "Enable Performance Mode";
        enableHighPerformance(); // Restore normal visual settings
    } else {
        // Enable low-performance mode (better for weaker devices)
        setFPS(30); // Lower FPS to save resources
        performanceBtn.textContent = "Disable Performance Mode";
        enableLowPerformance(); // Adjust visuals for performance
    }
    
    performanceModeEnabled = !performanceModeEnabled; // Toggle the mode
}

function enableLowPerformance() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.style.transitionDuration = "2s"; // Slow down the progress bar animation
    });
}

function enableHighPerformance() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.style.transitionDuration = "0.5s"; // Restore normal progress bar animation speed
    });
}
// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    startGameLoop();
    setInterval(saveGame, 60000); // Autosave every 60 seconds
});
