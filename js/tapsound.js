// During app initialization, after deviceReady:
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  var uiSounds = cordova.require('cordova-plugin-ui-sounds.Plugin');

  // Preload sound and handle errors properly
  uiSounds.preloadSound('assets/tapsound.mp3')
    .then(() => {
      console.log('Sound preloaded successfully');
    })
    .catch(error => {
      console.error('Error preloading sound:', error);
    });

  // During button press event:
  var myVolume = 1.0;
  uiSounds.playSound('assets/tapsound.mp3', myVolume)
    .then(() => {
      console.log('Sound played successfully');
    })
    .catch(error => {
      console.error('Error playing sound:', error);
    });

  // If you will never use the sound again:
  uiSounds.unloadSound('assets/tapsound.mp3')
    .then(() => {
      console.log('Sound unloaded successfully');
    })
    .catch(error => {
      console.error('Error unloading sound:', error);
    });
}
