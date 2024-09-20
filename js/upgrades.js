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

function generateRandomUpgrade() {
    let upgrade = {
        name: 'Random Upgrade ' + (upgrades.length + 1),
        cost: 10 + upgrades.length * 5,
        effect: Math.random() * 2,
        purchased: false
    };

    upgrades.push(upgrade);
    displayUpgrades();
    setTimeout(generateRandomUpgrade, 30 * 60 * 1000); // Generate a new upgrade every 30 minutes
}

function displayUpgrades() {
    let upgradeList = document.getElementById('upgrade-list');
    upgradeList.innerHTML = '';

    upgrades.forEach((upgrade, index) => {
        let upgradeDiv = document.createElement('div');
        upgradeDiv.innerHTML = `${upgrade.name} - Cost: ${upgrade.cost} Essence - Effect: x${upgrade.effect.toFixed(2)}
                                <button onclick="buyUpgrade(${index})">Buy</button>`;
        upgradeList.appendChild(upgradeDiv);
    });
}

function buyUpgrade(index) {
    if (essence >= upgrades[index].cost && !upgrades[index].purchased) {
        essence -= upgrades[index].cost;
        upgrades[index].purchased = true;
        calculateUpgradeMultiplier(); // Recalculate the multiplier after purchasing an upgrade
        document.getElementById('essence').textContent = formatNumber(essence);
        document.getElementById('prestige-multiplier').textContent = (basePrestigeMultiplier * upgradeMultiplier).toFixed(2);
        displayUpgrades();
        alert('Upgrade purchased!');
    } else {
        alert('Not enough Essence or already purchased!');
    }
}