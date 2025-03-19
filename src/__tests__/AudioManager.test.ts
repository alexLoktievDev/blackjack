import { AudioManager } from '../modules/audio-manager';

describe('AudioManager', () => {
  let playMock: jest.SpyInstance | undefined;
  let pauseMock: jest.SpyInstance | undefined;

  beforeEach(() => {
    playMock = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(async () => undefined);

    pauseMock = jest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    playMock?.mockRestore();
    pauseMock?.mockRestore();
  });

  it('should create an AudioManager instance with correct settings', () => {
    const audioManager = new AudioManager('test.mp3');
    expect(audioManager).toBeTruthy();
    expect(audioManager['audio'].src).toContain('test.mp3');
    expect(audioManager['audio'].loop).toBe(true);
    expect(audioManager['audio'].volume).toBe(0.3);
  });

  it('should play audio successfully', async () => {
    const audioManager = new AudioManager('test.mp3');

    audioManager.play();

    expect(playMock).toHaveBeenCalledTimes(1);
  });

  it('should handle audio playback failure', async () => {
    // ✅ Simulate a playback failure
    playMock?.mockRejectedValueOnce(new Error('Playback failed'));

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const audioManager = new AudioManager('test.mp3');
    audioManager.play();

    await new Promise((resolve) => setTimeout(resolve, 0)); // Allow async code to finish

    expect(playMock).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Audio playback failed:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });

  it('should stop audio playback and reset currentTime', () => {
    const audioManager = new AudioManager('test.mp3');

    audioManager.play();
    audioManager.stop();

    expect(pauseMock).toHaveBeenCalledTimes(1);
    expect(audioManager['audio'].currentTime).toBe(0);
  });

  it('should set correct loop and volume properties on creation', () => {
    const audioManager = new AudioManager('test.mp3');

    expect(audioManager['audio'].loop).toBe(true);
    expect(audioManager['audio'].volume).toBe(0.3);
  });
});
