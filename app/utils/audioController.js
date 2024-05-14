/* eslint-disable no-invalid-this */
/* eslint-disable immutable/no-this */
/* eslint-disable immutable/no-mutation */
class AudioController {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.audioData = {};
    this.currentlyPlaying = null;
    this.loading = Promise.resolve();
  }

  registerAudio = async (trackId, audioUrl, otherData) => {
    if (this.audioData[trackId]) {
      return;
    }
    await this.loading;

    const audio = new Audio();

    const response = await fetch(audioUrl);

    if (response.status === 206) {
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      audio.src = URL.createObjectURL(new Blob([audioBuffer], { type: 'audio/mpeg' }));
    } else {
      audio.src = audioUrl;
    }
    this.audioData[trackId] = {
      audio,
      otherData
    };

    this.loading = new Promise((resolve) => {
      audio.addEventListener('loadeddata', resolve);
    });
  };

  async play(track) {
    const { trackId } = track;
    if (this.currentlyPlaying !== null) {
      this.stop();
    }

    let audioObj = this.audioData[trackId];
    if (audioObj) {
      audioObj.audio.play();
      this.currentlyPlaying = trackId;
    } else {
      const { previewUrl } = track;
      await this.registerAudio(trackId, previewUrl, track);
      audioObj = this.audioData[trackId];

      if (audioObj) {
        audioObj.audio.play();
        this.currentlyPlaying = trackId;
      } else {
        console.error('Audio not found for trackId:', trackId);
      }
    }
  }

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
