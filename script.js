// script.js
const resources = {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0
};

const marketing = {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0
};

const automation = {
    fire: false,
    water: false,
    earth: false,
    air: false
};

let money = 0;

// Load game state from localStorage
function loadGame() {
    const savedData = JSON.parse(localStorage.getItem('elementalTycoon'));
    if (savedData) {
        Object.assign(resources, savedData.resources);
        Object.assign(marketing, savedData.marketing);
        Object.assign(automation, savedData.automation);
        money = savedData.money;
        updateDisplay();
        startAutomation(); // Start automation if previously purchased
    }
}

// Save game state to localStorage
function saveGame() {
    localStorage.setItem('elementalTycoon', JSON.stringify({
        resources,
        marketing,
        automation,
        money
    }));
}

// Update the display for all resources and money
function updateDisplay() {
    for (let element in resources) {
        document.getElementById(element).textContent = resources[element];
        updateProgressBar(element);
    }
    document.getElementById('money').textContent = money;
}

// Gather a resource and update the display
function gather(element) {
    resources[element]++;
    money += 1 + marketing[element];  // Marketing increases resource production
    updateDisplay();
}

// Update progress bar for a specific element
function updateProgressBar(element) {
    const progressBar = document.querySelector(`#${element}-progress .progress-bar`);
    if (progressBar) {
        const progress = (resources[element] % 100); // Get progress as a percentage (0-99)
        progressBar.style.width = `${progress}%`; // Update the width of the inner bar
    }
}

// Buy marketing for an element and update the display
function buyMarketing(element) {
    if (money >= 10) {
        money -= 10;
        marketing[element]++;
        updateDisplay();
    } else {
        alert("Not enough money!");
    }
}

// Buy automation for an element and start its interval
function buyAutomation(element) {
    if (money >= 50 && !automation[element]) {
        money -= 50;
        automation[element] = true;
        updateDisplay();
        startAutomationForElement(element); // Start automation for this element
    } else if (automation[element]) {
        alert(`${element.charAt(0).toUpperCase() + element.slice(1)} is already automated!`);
    } else {
        alert("Not enough money!");
    }
}

// Start automation for a specific element
function startAutomationForElement(element) {
    if (automation[element]) {
        setInterval(() => {
            gather(element);
        }, 1000); // Automate gathering every 1 second
    }
}

// Start automation for all elements that are already automated
function startAutomation() {
    for (let element in automation) {
        if (automation[element]) {
            startAutomationForElement(element);
        }
    }
}

// Auto-save every 10 seconds
setInterval(saveGame, 10000);

// Load the game when the page loads
window.onload = loadGame;
