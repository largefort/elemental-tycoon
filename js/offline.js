 function handleOfflineProgression() {
                const lastSavedTime = localStorage.getItem('lastSavedTime');
                if (lastSavedTime) {
                    const currentTime = Date.now();
                    const elapsedTime = (currentTime - lastSavedTime) / 1000; // Convert to seconds

                    let offlineProgress = {};

                    for (let element in automation) {
                        if (automation[element]) {
                            const gatheredAmount = eps[element] * elapsedTime; // Calculate resources gathered while offline
                            resources[element] += gatheredAmount;
                            money += gatheredAmount * (1 + marketing[element]); // Add money based on gathered resources
                            offlineProgress[element] = gatheredAmount;
                        }
                    }

                    if (Object.keys(offlineProgress).length > 0) {
                        showOfflineModal(offlineProgress);
                    }

                    updateDisplay();
                }
                localStorage.setItem('lastSavedTime', Date.now());
            }

            function showOfflineModal(progressData) {
                const modal = document.getElementById('offline-modal');
                const progressList = document.getElementById('offline-progress-list');
                progressList.innerHTML = '';

                for (let element in progressData) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${element.charAt(0).toUpperCase() + element.slice(1)}: +${formatNumber(progressData[element])}`;
                    progressList.appendChild(listItem);
                }

                modal.style.display = 'flex'; // Show the modal
            }

            function closeOfflineModal() {
                document.getElementById('offline-modal').style.display = 'none'; // Hide the modal
            }

            window.onload = () => {
                loadGame();
                handleOfflineProgression(); // Calculate offline progression on game load
                generateRandomUpgrade();
            };