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
let prestigeMultiplier = 1.00; // Multiplier from prestige upgrades
let upgrades = []; // List of upgrades

const prefixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod',
    'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg', 'Tr', 'Utr', 'Dtr', 'Ttr', 'Qatr', 'Qitr', 'Sxtr', 'Sptr', 'Octr', 'Notr',
    'Qdr', 'Qidr', 'Sxdr', 'Spdr', 'Ocdr', 'Nodr', 'Ctr', 'Uctr', 'Dctr', 'Tctr', 'Qactr', 'Jafet',
    'Ujaf', 'Djaf', 'Tjaf', 'Qajaf', 'Qijaf', 'Sxjaf', 'Spjaf', 'Ocjaf', 'Nojaf', 'Tjaftr', 
    'Ujaftr', 'Djaftr', 'Qajaftr', 'Qijaftr', 'Sxjaftr', 'Spjaftr', 'Ocjaftr', 'Nojaftr', 'Cent', 'Ucent', 'Dcent', 'Tcent', 'Qacent'];

const upgradeNames = [
    'Blazing Fury', 'Ocean’s Whisper', 'Earthen Might', 'Aerial Grace', 'Radiant Surge', 'Shadow Veil', 'Void’s Embrace',
    'Inferno Blast', 'Tidal Wave', 'Quake Strike', 'Zephyr Speed', 'Solar Flare', 'Dark Pulse', 'Abyssal Echo',
    'Phoenix Ascend', 'Tempest Roar', 'Stone Guardian', 'Wind Dancer', 'Light Bringer', 'Night Stalker', 'Cosmic Reaver'
];

let fps = 60; // Default FPS value
let lastFrameTime = 0;
let gameLoop; // Variable to hold the game loop interval

function setFPS(newFPS) {
    fps = newFPS;
    clearInterval(gameLoop); // Clear the existing loop
    startGameLoop(); // Start a new loop with the updated FPS
}

function startGameLoop() {
    gameLoop = setInterval(() => {
        const now = performance.now();
        const delta = now - lastFrameTime;
        if (delta > 1000 / fps) {
            updateDisplay(); // Update game display
            lastFrameTime = now - (delta % (1000 / fps));
        }
    }, 1000 / fps);
}

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
        prestigeMultiplier = savedData.prestigeMultiplier || 1.00;
        upgrades = savedData.upgrades || [];
        updateDisplay();
        displayUpgrades();
        startAutomation();
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
        prestigeMultiplier,
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
    for (let element in resources) {
        resources[element] = 0;
        marketing[element] = 0;
        automation[element] = false;
        eps[element] = 0;
    }
    money = 0;
    prestigeMultiplier = 1.00;
    
    // Clear upgrades array to delete prestige-generated upgrades
    upgrades = [];

    if (includeEssence) {
        essence = 0;
    }
    
    updateDisplay();
    displayUpgrades(); // Make sure to update the display to reflect the cleared upgrades
}

function updateDisplay() {
    for (let element in resources) {
        const currentResourceText = document.getElementById(element).textContent;
        const formattedResource = formatNumber(resources[element]);
        if (currentResourceText !== formattedResource) {
            document.getElementById(element).textContent = formattedResource;
        }

        const currentEpsText = document.getElementById(`${element}-eps`).textContent;
        const formattedEps = formatNumber(eps[element] * prestigeMultiplier);
        if (currentEpsText !== formattedEps) {
            document.getElementById(`${element}-eps`).textContent = formattedEps;
        }

        updateProgressBar(element);
    }

    const formattedMoney = formatNumber(money);
    if (document.getElementById('money').textContent !== formattedMoney) {
        document.getElementById('money').textContent = formattedMoney;
    }

    const formattedEssence = formatNumber(essence);
    if (document.getElementById('essence').textContent !== formattedEssence) {
        document.getElementById('essence').textContent = formattedEssence;
    }

    const formattedPrestigeMultiplier = prestigeMultiplier.toFixed(2);
    if (document.getElementById('prestige-multiplier').textContent !== formattedPrestigeMultiplier) {
        document.getElementById('prestige-multiplier').textContent = formattedPrestigeMultiplier;
    }
}

function recalculateEPS(element) {
    if (automation[element]) {
        eps[element] = (1 + marketing[element]) * prestigeMultiplier;
    } else {
        eps[element] = 0;
    }
    updateDisplay();
}

function gather(element) {
    resources[element]++;
    money += (1 + marketing[element]) * prestigeMultiplier;
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
        marketing[element]++;
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
        startAutomationForElement(element);
    } else if (automation[element]) {
        alert(`${element.charAt(0).toUpperCase() + element.slice(1)} is already automated!`);
    } else {
        alert("Not enough money!");
    }
}

function startAutomationForElement(element) {
    if (automation[element]) {
        setInterval(() => {
            resources[element] += eps[element];
            money += eps[element] * (1 + marketing[element]);
            updateDisplay();
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

function prestige() {
    if (money >= 100000) {
        const earnedEssence = Math.floor(money / 100000);
        essence += earnedEssence;

        // Increase the base prestige multiplier based on the earned essence
        basePrestigeMultiplier += earnedEssence * 0.05; // Adjust the factor (0.05) to control the rate of multiplier growth

        alert(`Prestiged! You earned ${earnedEssence} Essence. Your new prestige multiplier is ${basePrestigeMultiplier.toFixed(2)}x.`);

        resetGame(); // Reset the game but keep the essence and updated prestige multiplier
        generateRandomUpgrade(); // Generate a new upgrade after each prestige
        updateDisplay();
    } else {
        alert("You need $100,000 to prestige!");
    }
}

function getRandomUpgradeName() {
    return upgradeNames[Math.floor(Math.random() * upgradeNames.length)];
}

function generateRandomUpgrade() {
    let upgrade = {
        name: getRandomUpgradeName(),
        cost: 10 + upgrades.length * 5,
        effect: parseFloat((Math.random() * 2 + 0.1).toFixed(2)),
        purchased: false
    };

    upgrades.push(upgrade);
    displayUpgrades();
    setTimeout(generateRandomUpgrade, 30 * 60 * 1000);
}

function displayUpgrades() {
    let upgradeList = document.getElementById('upgrade-list');
    upgradeList.innerHTML = '';

    upgrades.forEach((upgrade, index) => {
        let upgradeDiv = document.createElement('div');
        upgradeDiv.innerHTML = `${upgrade.name} - Cost: ${formatNumber(upgrade.cost)} Essence - Effect: x${upgrade.effect.toFixed(2)} 
                                <button onclick="buyUpgrade(${index})">Buy</button>`;
        upgradeList.appendChild(upgradeDiv);
    });
}

function buyUpgrade(index) {
    if (essence >= upgrades[index].cost && !upgrades[index].purchased) {
        essence -= upgrades[index].cost;
        upgrades[index].purchased = true;
        prestigeMultiplier = (prestigeMultiplier * upgrades[index].effect).toFixed(2);
        prestigeMultiplier = parseFloat(prestigeMultiplier);
        document.getElementById('essence').textContent = formatNumber(essence);
        document.getElementById('prestige-multiplier').textContent = prestigeMultiplier.toFixed(2);
        displayUpgrades();
        alert('Upgrade purchased!');
    } else {
        alert('Not enough Essence or already purchased!');
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

setInterval(saveGame, 10000); // Save game every 10 seconds

window.onload = () => {
    loadGame();
    generateRandomUpgrade();
    startGameLoop(); // Start the optimized game loop
};
