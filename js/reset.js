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