export class AudioManager {
  private audio: HTMLAudioElement;

  constructor(src: string) {
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.volume = 0.3;
  }

  play(): void {
    this.audio
      .play()
      .catch((err) => console.error('Audio playback failed:', err));
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
