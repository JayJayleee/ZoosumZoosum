import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const whoosh = new Sound('zoosum.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // Reduce the volume by half
  whoosh.setVolume(1);
  // Loop indefinitely until stop() is called
  whoosh.setNumberOfLoops(-1);
  whoosh.play();
});

// // Position the sound to the full right in a stereo field
// whoosh.setPan(1);

// Seek to a specific point in seconds
whoosh.setCurrentTime(2.5);

// Get the current playback point in seconds
whoosh.getCurrentTime(seconds => console.log('at ' + seconds));

export const pause = () => {
  whoosh.pause();
};

export const replay = () => {
  whoosh.play();
};

export const stop = () => {
  whoosh.stop();
  whoosh.reset();
};

export const changeMotion = new Sound('change.mp3',Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound change', error);
      return;
    }
    // Reduce the volume by half
    changeMotion.setVolume(0.5);
    // changeMotion.setNumberOfLoops(-1);
  },
);

// Position the sound to the full right in a stereo field
changeMotion.setPan(1);

export const changeMotionStop = () => {
  changeMotion.play();
  // setTimeout(() => {
  //   changeMotion.pause();
  // }, 200);
}

const eggCrack = new Sound('egg.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound change', error);
    return;
  }

  // Reduce the volume by half
  eggCrack.setVolume(10);
  eggCrack.setNumberOfLoops(-1);
});

export const changeEggCrack = () => {
  eggCrack.play();
  setTimeout(() => {
    eggCrack.pause();
  }, 1000);
};

const eggWhite = new Sound('egg_white.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound change', error);
    return;
  }
  // Reduce the volume by half
  eggWhite.setVolume(10);
  eggWhite.setNumberOfLoops(-1);
});

export const changeEggWhite = () => {
  eggWhite.play();
  setTimeout(() => {
    eggWhite.pause();
  }, 2000);
};

const eggBorn = new Sound('egg_born.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound change', error);
    return;
  }
  // Reduce the volume by half
  eggBorn.setVolume(10);
  eggBorn.setNumberOfLoops(-1);
});

export const changeEggBorn = () => {
  eggBorn.play();
  setTimeout(() => {
    eggBorn.pause();
  }, 2000);
};

const buttonSound = new Sound('button.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound change', error);
    return;
  }

  buttonSound.setVolume(20);
})

export const changeButtonSound = () => {
  buttonSound.play();
}