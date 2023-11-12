import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const whoosh = new Sound('zoosum.mp3', Sound.MAIN_BUNDLE, (error) => {
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

// Reduce the volume by half
whoosh.setVolume(1);

// Position the sound to the full right in a stereo field
whoosh.setPan(1);

// Seek to a specific point in seconds
whoosh.setCurrentTime(2.5);

// Get the current playback point in seconds
whoosh.getCurrentTime(seconds => console.log('at ' + seconds));

export const pause = () => {
  whoosh.pause();
}

export const replay = () => {
  whoosh.play();
}

export const stop = () => {
  whoosh.stop();
  whoosh.reset();
}