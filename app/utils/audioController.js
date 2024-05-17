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
    this.onAudioChangeHandlers = [];
  }

  registerAudioChangeHandlers = (callback) => {
    this.onAudioChangeHandlers.push(callback);
    return this.onAudioChangeHandlers.length - 1;
  };

  registerAudio = (track) => {
    const { trackId, previewUrl: audioUrl } = track;

    if (this.audioData[trackId]) {
      return;
    }

    const audio = new Audio(audioUrl);
    audio.preload = 'none';
    this.audioData[trackId] = {
      audio,
      otherData: track
    };

    audio.onloadeddata = () => {
      this.audioData[trackId].loaded = true;
    };

    audio.onended = () => {
      audio.currentTime = 0;
      this.currentlyPlaying = null;
      this.onPlayingAudioChange();
    };

    audio.onerror = (event) => {
      console.error('Error:', event);
    };
  };

  checkAudioIsLoaded = async (audioObj) =>
    new Promise((resolve) => {
      audioObj.audio.onloadeddata = () => {
        resolve(true);
      };
    });

  async play(track, setLoading) {
    setLoading(true);
    const { trackId } = track;
    if (this.currentlyPlaying !== null) {
      this.stop();
    }

    let audioObj = this.audioData[trackId];
    if (!audioObj) {
      this.registerAudio(track);
      audioObj = this.audioData[trackId];
    }

    if (!audioObj.loaded) {
      audioObj.audio.load();
      await this.checkAudioIsLoaded(audioObj);
      audioObj.loaded = true;
    }
    audioObj.audio.play();
    this.currentlyPlaying = trackId;
    this.onPlayingAudioChange();
    setLoading(false);
  }

  onPlayingAudioChange = () => {
    for (const current of this.onAudioChangeHandlers) {
      if (typeof current === 'function') {
        current(this.currentlyPlaying);
      }
    }
  };

  stop() {
    if (this.currentlyPlaying !== null) {
      const audioObj = this.audioData[this.currentlyPlaying];
      audioObj.audio.pause();
      this.currentlyPlaying = null;
      this.onPlayingAudioChange();
    }
  }
}

const audioController = new AudioController();

export default audioController;
