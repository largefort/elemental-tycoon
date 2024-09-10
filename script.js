// script.js - Optimized Version

const resources = {
    fire: 0, water: 0, earth: 0, air: 0, light: 0, dark: 0, void: 0
};

const marketing = { ...resources };
const automation = { fire: false, water: false, earth: false, air: false, light: false, dark: false, void: false };
const eps = { ...resources };

let money = 0;
let essence = 0;

const prefixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod',
    'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg', 'Tr', 'Utr', 'Dtr', 'Ttr', 'Qatr', 'Qitr', 'Sxtr', 'Sptr', 'Octr', 'Notr'];

const promotionCounters = {  // Initialize promotion counters for each element
    fire: 0, water: 0, earth: 0, air: 0, light: 0, dark: 0, void: 0
};

function formatNumber(number) {
    if (number < 1000) return number.toString();
    let tier = Math.floor(Math.log10(number) / 3);
    let suffix = prefixes[tier] || `e${tier * 3}`;
    let scale = Math.pow(10, tier * 3);
    let scaled = number / scale;
    return scaled.toFixed(2) + suffix;
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

        // Load promotion counters if available
        if (savedData.promotionCounters) {
            Object.assign(promotionCounters, savedData.promotionCounters);
            Object.keys(promotionCounters).forEach(updatePromotionCounterDisplay);
        }

        updateDisplay();
        startAutomation();
    }
}

function saveGame() {
    localStorage.setItem('elementalTycoon', JSON.stringify({
        resources, marketing, automation, eps, money, essence, promotionCounters
    }));
}

function resetGame(includeEssence = false) {
    Object.keys(resources).forEach(element => {
        resources[element] = marketing[element] = eps[element] = 0;
        automation[element] = false;
        promotionCounters[element] = 0;  // Reset promotion counters
        updatePromotionCounterDisplay(element);  // Update display for each reset
    });
    money = 0;
    if (includeEssence) essence = 0;
}

function updateDisplay() {
    Object.keys(resources).forEach(element => {
        document.getElementById(element).textContent = formatNumber(resources[element]);
        document.getElementById(`${element}-eps`).textContent = formatNumber(eps[element]);
        updateProgressBar(element);
    });
    document.getElementById('money').textContent = formatNumber(money);
    document.getElementById('essence').textContent = formatNumber(essence);
}

function updateProgressBar(element) {
    const progressBar = document.querySelector(`#${element}-progress .progress-bar`);
    const progressText = document.querySelector(`#${element}-progress span`);
    if (progressBar && progressText) {
        const progress = (resources[element] % 100);
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
    }
}

function recalculateEPS(element) {
    eps[element] = automation[element] ? 1 + marketing[element] : 0;
}

function gather(element) {
    resources[element]++;
    money += 1 + marketing[element];
    throttleUpdateDisplay();
}

function buyMarketing(element) {
    if (money >= 10) {
        money -= 10;
        marketing[element]++;
        promotionCounters[element]++;  // Increment the counter for the selected element
        updatePromotionCounterDisplay(element);  // Update the counter display
        recalculateEPS(element);
        throttleUpdateDisplay();
    } else {
        alert("Not enough money!");
    }
}

// Function to update promotion counter display for each element
function updatePromotionCounterDisplay(element) {
    document.getElementById(`${element}Counter`).textContent = promotionCounters[element];
}

function buyAutomation(element) {
    if (money >= 50 && !automation[element]) {
        money -= 50;
        automation[element] = true;
        recalculateEPS(element);
        throttleUpdateDisplay();
        startAutomationForElement(element);
    } else {
        alert(automation[element] ? `${element.charAt(0).toUpperCase() + element.slice(1)} is already automated!` : "Not enough money!");
    }
}

const automationIntervals = {};
function startAutomationForElement(element) {
    if (automation[element]) {
        if (automationIntervals[element]) clearInterval(automationIntervals[element]);
        automationIntervals[element] = setInterval(() => {
            resources[element] += eps[element];
            money += eps[element] * (1 + marketing[element]);
            throttleUpdateDisplay();
        }, 1000);
    }
}

function startAutomation() {
    Object.keys(automation).forEach(element => {
        if (automation[element]) startAutomationForElement(element);
    });
}

function prestige() {
    if (money >= 100000) {
        const earnedEssence = Math.floor(money / 100000);
        essence += earnedEssence;
        alert(`Prestiged! You earned ${earnedEssence} Essence.`);
        resetGame();
        throttleUpdateDisplay();
    } else {
        alert("You need $100,000 to prestige!");
    }
}

function switchVersion(version) {
    const versions = { live: 'index_live.html', alpha: 'index_alpha.html', beta: 'index_beta.html' };
    window.location.href = versions[version] || alert('Version not recognized.');
}

function throttle(fn, limit) {
    let inThrottle;
    return function () {
        if (!inThrottle) {
            fn.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const throttleUpdateDisplay = throttle(updateDisplay, 100);

setInterval(throttle(saveGame, 10000), 10000);
window.onload = loadGame;
