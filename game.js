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

let totalEPS = 0; // Total EPS to be displayed on the UI
let money = 0;
let essence = 0; // Prestige currency
let basePrestigeMultiplier = 1.00; // Fixed base multiplier from prestige
let upgradeMultiplier = 1.00; // Multiplier from upgrades
let upgrades = []; // List of upgrades
let automationIntervals = {}; // Track intervals for automation to clear them on reset

const prefixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod',
    'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg', 'Tr', 'Utr', 'Dtr', 'Ttr', 'Qatr', 'Qitr', 'Sxtr', 'Sptr', 'Octr', 'Notr',
    'Qdr', 'Qidr', 'Sxdr', 'Spdr', 'Ocdr', 'Nodr', 'Ctr', 'Uctr', 'Dctr', 'Tctr', 'Qactr', 'Jafet',
    'Ujaf', 'Djaf', 'Tjaf', 'Qajaf', 'Qijaf', 'Sxjaf', 'Spjaf', 'Ocjaf', 'Nojaf', 'Tjaftr',
    'Ujaftr', 'Djaftr', 'Qajaftr', 'Qijaftr', 'Sxjaftr', 'Spjaftr', 'Ocjaftr', 'Nojaftr', 'Cent', 'Ucent', 'Dcent', 'Tcent', 'Qacent',
    'Jafet+', 'JafetX', 'MegaJafet', 'UltraJafet', 'GigaJafet', 'TerraJafet', 'Jafillion', 'Jaftrillion', 'Jafillion+', 'HyperJafet'];

const upgradeNames = [
    'Blazing Fury', 'Ocean’s Whisper', 'Earthen Might', 'Aerial Grace', 'Radiant Surge', 'Shadow Veil', 'Void’s Embrace',
    'Inferno Blast', 'Tidal Wave', 'Quake Strike', 'Zephyr Speed', 'Solar Flare', 'Dark Pulse', 'Abyssal Echo',
    'Phoenix Ascend', 'Tempest Roar', 'Stone Guardian', 'Wind Dancer', 'Light Bringer', 'Night Stalker', 'Cosmic Reaver'
];

function formatNumber(number) {
    if (number < 1000) {
        // No decimals for small numbers
        return Math.floor(number);
    }

    let tier = Math.floor(Math.log10(number) / 3);
    let suffix = prefixes[tier] || `e${tier * 3}`;
    let scale = Math.pow(10, tier * 3);
    let scaled = number / scale;

    // If scaled number is an integer, don't show decimals
    if (scaled % 1 === 0) {
        return Math.floor(scaled) + suffix;
    } else {
        return scaled.toFixed(2) + suffix; // Two decimal places for larger numbers
    }
}

function loadGame() {
    const savedData = JSON.parse(localStorage.getItem('elementalTycoon'));
    if (savedData) {
        Object.assign(resources, savedData.resources);
        Object.assign(marketing, savedData.marketing);
        Object.assign(automation, savedData.automation);
        Object.assign(eps, savedData.eps);
        money = savedData.money;
        essence = savedData.essence;
        basePrestigeMultiplier = savedData.basePrestigeMultiplier || 1.00;
        upgradeMultiplier = savedData.upgradeMultiplier || 1.00;
        upgrades = savedData.upgrades || [];
        calculateUpgradeMultiplier(); // Recalculate the upgrade multiplier after loading upgrades
        calculateTotalEPS(); // Recalculate total EPS after loading
        updateDisplay();
        displayUpgrades();
        startAutomation(); // Start automation for elements that have automation enabled
    }
}

function saveGame() {
    localStorage.setItem('elementalTycoon', JSON.stringify({
        resources,
        marketing,
        automation,
        eps,
        money,
        essence,
        basePrestigeMultiplier,
        upgradeMultiplier,
        upgrades
    }));
}

function deleteProgress() {
    if (confirm("Are you sure you want to delete your progress? This action cannot be undone.")) {
        localStorage.removeItem('elementalTycoon');
        resetGame(true);
        updateDisplay();
        alert("Progress deleted! The game has been reset.");
    }
}

function resetGame(includeEssence = false) {
    // Reset all game data
    for (let element in resources) {
        resources[element] = 0;
        marketing[element] = 0;
        automation[element] = false;
        eps[element] = 0;
    }
    money = 0;
    upgradeMultiplier = 1.00; // Reset upgrade multiplier
    upgrades = [];
    totalEPS = 0; // Reset total EPS

    // Handle essence and base prestige multiplier if completely reset
    if (includeEssence) {
        essence = 0;
        basePrestigeMultiplier = 1.00; // Reset the base multiplier
    }

    // Recalculate total EPS after reset
    calculateTotalEPS();

    // Update display and clear any prestige-generated upgrades
    updateDisplay();
    displayUpgrades(); // Ensure the display reflects the cleared upgrades
}

function updateDisplay() {
    for (let element in resources) {
        if (document.getElementById(element)) {
            document.getElementById(element).textContent = formatNumber(resources[element]);
        }
        updateProgressBar(element); // Ensure the progress bar is updated
    }
    if (document.getElementById('money')) {
        document.getElementById('money').textContent = formatNumber(money);
    }
    if (document.getElementById('essence')) {
        document.getElementById('essence').textContent = formatNumber(essence);
    }
    if (document.getElementById('prestige-multiplier')) {
        document.getElementById('prestige-multiplier').textContent = (basePrestigeMultiplier * upgradeMultiplier).toFixed(2);
    }
    if (document.getElementById('total-eps')) {
        document.getElementById('total-eps').textContent = formatNumber(totalEPS);
    }
}

function calculateTotalEPS() {
    totalEPS = 0;
    for (let element in eps) {
        totalEPS += eps[element] * basePrestigeMultiplier * upgradeMultiplier;
    }
}

function calculateUpgradeMultiplier() {
    upgradeMultiplier = 1.00; // Reset upgrade multiplier
    upgrades.forEach(upgrade => {
        if (upgrade.purchased) {
            upgradeMultiplier *= upgrade.effect; // Multiply each upgrade's effect
        }
    });
}

function recalculateEPS(element) {
    if (automation[element]) {
        eps[element] = (1 + marketing[element]) * basePrestigeMultiplier * upgradeMultiplier;
    } else {
        eps[element] = 0;
    }
    calculateTotalEPS(); // Update the total EPS whenever individual EPS changes
    updateDisplay();
}

function gather(element) {
    resources[element] += 1;
    money += (1 + marketing[element]) * basePrestigeMultiplier * upgradeMultiplier;
    updateDisplay();
}

function updateProgressBar(element) {
    const progressBar = document.querySelector(`#${element}-progress .progress-bar`);
    const progressText = document.querySelector(`#${element}-progress span`);
    if (progressBar && progressText) {
        const progress = (resources[element] % 100);
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.floor(progress)}%`; // Removed decimals for percentage
    }
}

function buyMarketing(element) {
    if (money >= 10) {
        money -= 10;
        marketing[element] += 1;
        recalculateEPS(element);
        updateDisplay();
    } else {
        alert("Not enough money!");
    }
}

function buyAutomation(element) {
    if (money >= 50 && !automation[element]) {
        money -= 50;
        automation[element] = true;
        recalculateEPS(element);
        updateDisplay();
        startAutomationForElement(element); // Start automation immediately after purchasing
    } else if (automation[element]) {
        alert(`${element.charAt(0).toUpperCase() + element.slice(1)} is already automated!`);
    } else {
        alert("Not enough money!");
    }
}

function startAutomationForElement(element) {
    if (automation[element]) {
        automationIntervals[element] = setInterval(() => {
            resources[element] += eps[element];
            money += eps[element] * (1 + marketing[element]);
            updateDisplay();
            updateProgressBar(element); // Update progress bar as the resources are gathered

            // Reset progress bar and ensure it starts again
            if (resources[element] % 100 === 0) {
                clearInterval(automationIntervals[element]);
                setTimeout(() => startAutomationForElement(element), 100); // Restart automation loop
            }
        }, 1000);
    }
}

function startAutomation() {
    for (let element in automation) {
        if (automation[element]) {
            startAutomationForElement(element);
        }
    }
}

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

setInterval(saveGame, 10000);

window.onload = () => {
    loadGame();
    generateRandomUpgrade();
};
