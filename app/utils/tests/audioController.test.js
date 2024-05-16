import audioController from '../audioController';
import { timeout } from '../testUtils';

const tempTrack1 = {
    trackId: 1,
    previewUrl: 'http://localhost/temp-track-1.mp3'
};

describe('AudioController unit test', () => {
  afterEach(() => {
    audioController.audioData = {};
    audioController.currentlyPlaying = null;
    audioController.loading = Promise.resolve();
    audioController.onAudioChangeHandlers = [];
  });

  it('should use webkitAudioContext when AudioContext is not available', () => {
    const originalAudioContext = window.AudioContext;
    window.AudioContext = undefined;
    window.webkitAudioContext = jest.fn().mockImplementation(() => {
        return {};
    });

    const _ = new audioController.constructor();
    expect(window.webkitAudioContext).toHaveBeenCalled();

    window.AudioContext = originalAudioContext;
  })

  it('should registerAudio in AudioController', () => {
    audioController.registerAudio(tempTrack1);
    expect(audioController.audioData[tempTrack1.trackId].audio).toMatchInlineSnapshot(`
      <audio
        preload="none"
        src="http://localhost/temp-track-1.mp3"
      />
    `);
    const tempTrack2 = {
      trackId: 1,
      previewUrl: 'http://localhost/temp-track-2.mp3'
    };
    audioController.registerAudio(tempTrack2);
    expect(audioController.audioData[tempTrack2.trackId].audio).toMatchInlineSnapshot(`
      <audio
        preload="none"
        src="http://localhost/temp-track-1.mp3"
      />
    `);
  });

  describe('should registered audio event execute correctly', () => {
    it('should call onloadeddata', () => {
        audioController.registerAudio(tempTrack1);
        const audioObj = audioController.audioData[tempTrack1.trackId];
        audioObj.audio.onloadeddata();
        expect(audioObj.loaded).toBe(true);
    });

    it('should call onended', () => {
        const originalOnPlayingAudioChange = audioController.onPlayingAudioChange;
        audioController.onPlayingAudioChange = jest.fn();

        audioController.registerAudio(tempTrack1);
        const audioObj = audioController.audioData[tempTrack1.trackId];

        audioObj.audio.currentTime = 55;
        audioController.currentlyPlaying = tempTrack1.trackId;

        audioObj.audio.onended();

        expect(audioObj.audio.currentTime).toBe(0);
        expect(audioController.currentlyPlaying).toBe(null);
        expect(audioController.onPlayingAudioChange).toHaveBeenCalled();

        audioController.onPlayingAudioChange = originalOnPlayingAudioChange;
    });

    it('should call onloadeddata', () => {
        audioController.registerAudio(tempTrack1);
        const audioObj = audioController.audioData[tempTrack1.trackId];
        const spy = jest.spyOn(console, 'error');
        const msg = 'tempMsg';
        audioObj.audio.onerror(msg);
        expect(spy).toHaveBeenCalledWith("Error:", msg);
    });
  });

  it('should call play', async () => {
    const mockSetLoading = jest.fn();
    audioController.play(tempTrack1, mockSetLoading);
    const audioObj = audioController.audioData[tempTrack1.trackId];
    audioObj.audio.load = jest.fn();
    audioObj.audio.play = jest.fn();
    audioObj.audio.pause = jest.fn();

    audioObj.audio.onloadeddata();
    await timeout(0);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
    expect(audioObj.loaded).toBe(true);

    mockSetLoading.mockReset();
    const spy = jest.spyOn(audioController, 'stop');
    audioController.play(tempTrack1, mockSetLoading);
    expect(spy).toHaveBeenCalled();
  });

  it('should call stop', () => {
    audioController.registerAudio(tempTrack1);
    const audioObj = audioController.audioData[tempTrack1.trackId];
    audioObj.audio.load = jest.fn();
    audioObj.audio.play = jest.fn();
    audioObj.audio.pause = jest.fn();
    audioController.currentlyPlaying = tempTrack1.trackId;
    const mockedOnChangeHandler = jest.fn();
    audioController.registerAudioChangeHandlers(mockedOnChangeHandler);
    audioController.registerAudioChangeHandlers(null);

    audioController.stop();
    expect(audioObj.audio.paused).toBe(true);
    expect(audioController.currentlyPlaying).toBe(null);
    expect(mockedOnChangeHandler).toHaveBeenCalled();

    audioController.stop();
    expect(audioController.currentlyPlaying).toBe(null);
    expect(mockedOnChangeHandler).not.toHaveBeenCalledTimes(2);
  });
});
