function openTab(tabId, event) {
    // Hide all tab content
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    // Remove 'active' class from all buttons
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => button.classList.remove('active'));

    // Show the selected tab content
    document.getElementById(tabId).style.display = 'block';

    // Add 'active' class to the clicked button
    if (event) {
        event.currentTarget.classList.add('active');
    }
}

// Initialize with the default tab
document.addEventListener('DOMContentLoaded', function () {
    const defaultButton = document.querySelector('.nav-btn');
    if (defaultButton) {
        defaultButton.click();  // Automatically open the first tab
    }
});
