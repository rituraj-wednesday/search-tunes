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

  registerAudio = async (track) => {
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

  async loadAudio(audioObj) {
    try {
      audioObj.audio.load();
      audioObj.loaded = true;
    } catch (e) {
      console.error('Error in loading audio', e);
    }
  }

  async play(track, setLoading) {
    const { trackId } = track;
    if (this.currentlyPlaying !== null) {
      this.stop();
    }

    const audioObj = this.audioData[trackId];
    if (audioObj) {
      if (audioObj.loaded) {
        audioObj.audio.play();
        this.currentlyPlaying = trackId;
        this.onPlayingAudioChange();
      } else {
        setLoading(true);
        await this.loadAudio(audioObj);
        this.play(track, setLoading);
        setLoading(false);
      }
    } else {
      await this.registerAudio(track);
      this.play(track, setLoading);
    }
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
