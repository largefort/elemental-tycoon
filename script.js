// script.js
const resources = {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
    light: 0,
    dark: 0,
    void: 0
};

const marketing = {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
    light: 0,
    dark: 0,
    void: 0
};

const automation = {
    fire: false,
    water: false,
    earth: false,
    air: false,
    light: false,
    dark: false,
    void: false
};

const eps = {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
    light: 0,
    dark: 0,
    void: 0
};

let money = 0;
let essence = 0; // Prestige currency

// Extended prefixes for compact notation
const prefixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod',
    'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg', 'Tr', 'Utr', 'Dtr', 'Ttr', 'Qatr', 'Qitr', 'Sxtr', 'Sptr', 'Octr', 'Notr'];

// Format numbers using compact notation with extended prefixes
function formatNumber(number) {
    if (number < 1000) return number.toString();
    let tier = Math.floor(Math.log10(number) / 3);
    let suffix = prefixes[tier] || `e${tier * 3}`;
    let scale = Math.pow(10, tier * 3);
    let scaled = number / scale;
    return scaled.toFixed(2) + suffix;
}

// Load game state from localStorage
function loadGame() {
    const savedData = JSON.parse(localStorage.getItem('elementalTycoon'));
    if (savedData) {
        Object.assign(resources, savedData.resources);
        Object.assign(marketing, savedData.marketing);
        Object.assign(automation, savedData.automation);
        Object.assign(eps, savedData.eps);
        money = savedData.money;
        essence = savedData.essence;
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
        eps,
        money,
        essence
    }));
}

// Delete progress and reset the game
function deleteProgress() {
    if (confirm("Are you sure you want to delete your progress? This action cannot be undone.")) {
        localStorage.removeItem('elementalTycoon'); // Clear localStorage
        resetGame(true); // Reset all game variables including essence
        updateDisplay(); // Update display after resetting
        alert("Progress deleted! The game has been reset.");
    }
}

// Reset all game variables to their initial state
function resetGame(includeEssence = false) {
    for (let element in resources) {
        resources[element] = 0;
        marketing[element] = 0;
        automation[element] = false;
        eps[element] = 0;
    }
    money = 0;
    if (includeEssence) {
        essence = 0;
    }
}

// Update the display for all resources, money, and EPS
function updateDisplay() {
    for (let element in resources) {
        document.getElementById(element).textContent = formatNumber(resources[element]);
        document.getElementById(`${element}-eps`).textContent = formatNumber(eps[element]);
        updateProgressBar(element);
    }
    document.getElementById('money').textContent = formatNumber(money);
    document.getElementById('essence').textContent = formatNumber(essence);
}

// Recalculate the EPS for an element
function recalculateEPS(element) {
    if (automation[element]) {
        eps[element] = 1 + marketing[element]; // Base EPS + additional EPS from marketing
    } else {
        eps[element] = 0; // If not automated, EPS is 0
    }
    updateDisplay(); // Update display to reflect new EPS
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
    const progressText = document.querySelector(`#${element}-progress span`);
    if (progressBar && progressText) {
        const progress = (resources[element] % 100); // Get progress as a percentage (0-99)
        progressBar.style.width = `${progress}%`; // Update the width of the inner bar
        progressText.textContent = `${progress}%`; // Update the percentage text
    }
}

// Buy marketing for an element and update the display
function buyMarketing(element) {
    if (money >= 10) {
        money -= 10; // Deduct money correctly
        marketing[element]++; // Increment the marketing level correctly
        recalculateEPS(element); // Recalculate EPS after buying marketing
        updateDisplay(); // Update the display to reflect changes
    } else {
        alert("Not enough money!"); // Inform the player if they don't have enough money
    }
}

// Buy automation for an element and start its interval
function buyAutomation(element) {
    if (money >= 50 && !automation[element]) {
        money -= 50;
        automation[element] = true;
        recalculateEPS(element); // Recalculate EPS after buying automation
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
            resources[element] += eps[element]; // Automate gathering every 1 second
            money += eps[element] * (1 + marketing[element]); // Gain money from automated gathering
            updateDisplay();
        }, 1000);
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

// Prestige function
function prestige() {
    if (money >= 100000) {  // Requirement to prestige
        const earnedEssence = Math.floor(money / 100000);
        essence += earnedEssence;  // Calculate how much essence is earned
        alert(`Prestiged! You earned ${earnedEssence} Essence.`);
        resetGame(); // Reset the game progress but keep essence
        updateDisplay(); // Update the display
    } else {
        alert("You need $100,000 to prestige!");
    }
}

// Function to switch versions
function switchVersion(version) {
    switch (version) {
        case 'live':
            window.location.href = 'index_live.html';
            break;
        case 'alpha':
            window.location.href = 'index_alpha.html';
            break;
        case 'mobile':
            window.location.href = 'index_mobile.html';
            break;
        default:
            alert('Version not recognized.');
    }
}

// Auto-save every 10 seconds
setInterval(saveGame, 10000);

// Load the game when the page loads
window.onload = loadGame;
