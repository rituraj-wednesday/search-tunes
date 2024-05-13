/* eslint-disable immutable/no-this */
/* eslint-disable immutable/no-mutation */
class AudioController {
  constructor() {
    this.audioTracks = {};
    this.currentTrackID = null;
    this.audioCtx = new AudioContext();
  }

  static registerAudio(trackData) {
    const { trackId, trackURL, ...rest } = trackData;
    this.audioTracks.push({
      trackId,
      trackURL,
      metadata: {
        ...rest
      }
    });
  }
}

const audioController = new AudioController();

export default audioController;
