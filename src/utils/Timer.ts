// The object to initialize the timer. All fields are optional.
interface TimeInput {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

// The object returned on each timer "tick".
interface FormattedTime {
  hours: number;
  minutes: number;
  seconds: number;
}

// The callback now receives the formatted time object.
type TickCallback = (timeRemaining: FormattedTime) => void;

// --- Timer Class ---

class Timer {
  private initialTotalSeconds: number;
  private remainingSeconds: number;
  private isRunning: boolean = false;
  private intervalId?: NodeJS.Timeout | number;
  private onTick: TickCallback;

  constructor(time: TimeInput, onEachTick: TickCallback) {
    // Calculate total seconds from input object.
    const hoursInSeconds = (time.hours ?? 0) * 3600;
    const minutesInSeconds = (time.minutes ?? 0) * 60;
    const seconds = time.seconds ?? 0;
    
    this.initialTotalSeconds = hoursInSeconds + minutesInSeconds + seconds;
    this.remainingSeconds = this.initialTotalSeconds;
    this.onTick = onEachTick;
  }

  // Private method to convert total seconds to H:M:S
  private formatTime(totalSeconds: number): FormattedTime {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  }

  public start(): void {
    if (this.isRunning || this.remainingSeconds <= 0) return;

    this.isRunning = true;
    
    this.onTick(this.formatTime(this.remainingSeconds));
    
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      
      // Call callback with formatted time.
      this.onTick(this.formatTime(this.remainingSeconds));

      if (this.remainingSeconds <= 0) {
        this.stop();
      }
    }, 1000);
  }

  public stop(): void {
    if (!this.isRunning) return;
    clearInterval(this.intervalId);
    this.isRunning = false;
  }

  public reset(): void {
    this.stop();
    this.remainingSeconds = this.initialTotalSeconds;
    // Update UI with formatted initial time
    this.onTick(this.formatTime(this.remainingSeconds));
  }

  public getTimeRemaining(): FormattedTime {
    return this.formatTime(this.remainingSeconds);
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}

export { Timer };