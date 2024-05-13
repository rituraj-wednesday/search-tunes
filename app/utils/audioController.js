/* eslint-disable immutable/no-this */
/* eslint-disable immutable/no-mutation */
class AudioController {
  constructor() {
    this.audioData = {}; // Object to store audio data
    this.currentlyPlaying = null; // Keep track of currently playing audio
  }

  // Function to register audio
  registerAudio(trackId, audioUrl, otherData) {
    const audio = new Audio(audioUrl);
    this.audioData[trackId] = {
      audio,
      otherData
    };
    audio.preload = 'auto'; // Preload the audio
  }

  // Function to play audio by trackId
  play(trackId) {
    // If there is an audio currently playing, stop it
    if (this.currentlyPlaying !== null) {
      this.stop();
    }

    // Play the audio corresponding to the trackId
    const audioObj = this.audioData[trackId];
    if (audioObj) {
      audioObj.audio.play();
      this.currentlyPlaying = trackId;
    } else {
      console.error('Audio not found for trackId:', trackId);
    }
  }

  // Function to stop currently playing audio
  stop() {
    if (this.currentlyPlaying !== null) {
      const audioObj = this.audioData[this.currentlyPlaying];
      audioObj.audio.pause();
      audioObj.audio.currentTime = 0;
      this.currentlyPlaying = null;
    }
  }
}

const audioController = new AudioController();

export default audioController;
