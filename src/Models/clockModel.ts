export class ClockModel {
    hours: number;
    minutes: number;
    seconds: number;  // Add seconds
    editable: 'hours' | 'minutes' | 'none';
    isLightOn: boolean;

    constructor() {
        const currentTime = new Date();
        this.hours = currentTime.getHours();
        this.minutes = currentTime.getMinutes();
        this.seconds = currentTime.getSeconds();  // Initialize seconds
        this.editable = 'none';
        this.isLightOn = false;
    }

    cycleEditable(): void {
        if (this.editable === 'none') {
            this.editable = 'hours';
        } else if (this.editable === 'hours') {
            this.editable = 'minutes';
        } else {
            this.editable = 'none';
        }
    }

    increaseHours(): void {
        this.hours = (this.hours + 1) % 24;
    }

    increaseMinutes(): void {
        this.minutes = (this.minutes + 1) % 60;
        if (this.minutes === 0) {
            this.increaseHours();
        }
    }

    increaseSeconds(): void {
        this.seconds = (this.seconds + 1) % 60;
        if (this.seconds === 0) {
            this.increaseMinutes();
        }
    }

    toggleLight(): void {
        this.isLightOn = !this.isLightOn;
    }

    advanceTime(): void {
        const currentTime = new Date();
        this.hours = currentTime.getHours();
        this.minutes = currentTime.getMinutes();
        this.seconds = currentTime.getSeconds();  // Update seconds
    }
}
