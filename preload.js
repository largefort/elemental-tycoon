// preload.js

document.addEventListener("DOMContentLoaded", function() {
    // Preload critical resources
    const criticalStyles = document.createElement('link');
    criticalStyles.rel = 'preload';
    criticalStyles.href = 'styles.css'; // Path to critical stylesheet
    criticalStyles.as = 'style';
    document.head.appendChild(criticalStyles);

    const criticalScript = document.createElement('link');
    criticalScript.rel = 'preload';
    criticalScript.href = 'script.js'; // Path to critical JavaScript file
    criticalScript.as = 'script';
    document.head.appendChild(criticalScript);

    // Load non-critical CSS asynchronously
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = 'styles.css'; // Path to stylesheet
    document.head.appendChild(styles);

    // Load non-critical scripts after load event
    window.addEventListener('load', function() {
        const nonCriticalScript = document.createElement('script');
        nonCriticalScript.src = 'analytics.js'; // Example of a non-critical script
        document.body.appendChild(nonCriticalScript);
    });
});
