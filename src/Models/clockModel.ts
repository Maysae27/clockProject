export class ClockModel {

    hours: number;
    minutes: number;
    seconds: number;
    editable: 'hours' | 'minutes' | 'none';
    isLightOn: boolean;
    editCycleCount: number;
    isEditing: boolean;
    is24HourFormat: boolean;
    timezoneOffset: number;


    constructor(timezoneOffset: number = 0) {
        this.timezoneOffset = timezoneOffset;
        const currentTime = new Date();
        currentTime.setUTCMinutes(currentTime.getUTCMinutes() + timezoneOffset * 60);
        this.hours = currentTime.getUTCHours();
        this.minutes = currentTime.getUTCMinutes();
        this.seconds = currentTime.getUTCSeconds();
        this.editable = 'none';
        this.isLightOn = false;
        this.editCycleCount = 0;
        this.isEditing = false;
        this.is24HourFormat = true;
    }


    private updateTime(date: Date): void {
        const utcHours = date.getUTCHours();
        const utcMinutes = date.getUTCMinutes();
        const utcSeconds = date.getUTCSeconds();

        this.hours = (utcHours + this.timezoneOffset + 24) % 24;
        this.minutes = utcMinutes;
        this.seconds = utcSeconds;
    }

    setTimezoneOffset(offset: number): void {
        this.timezoneOffset = offset;
        const now = new Date();
        now.setUTCMinutes(now.getUTCMinutes() + offset * 60);
        this.hours = now.getUTCHours();
        this.minutes = now.getUTCMinutes();
        this.seconds = now.getUTCSeconds();
    }


    finalizeEdit(): void {
        this.isEditing = false;
        this.editable = 'none';

        const now = new Date();
        now.setUTCHours(this.hours - this.timezoneOffset);
        now.setUTCMinutes(this.minutes);
        now.setUTCSeconds(this.seconds);
    }


    cycleEditable(): void {
        this.editCycleCount = (this.editCycleCount + 1) % 3;

        switch (this.editCycleCount) {
            case 0:
                this.finalizeEdit(); // Stop editing when 'none' is selected
                break;
            case 1:
                this.editable = 'hours';
                this.isEditing = true;
                break;
            case 2:
                this.editable = 'minutes';
                this.isEditing = true;
                break;
        }
    }

    advanceTime(): void {
        //only seconds keep advancing while the rest is being edited with blink effect
        this.seconds += 1;
        if (!this.isEditing) {
            if (this.seconds >= 60) {
                this.seconds = 0;
                this.minutes += 1;
            }

            if (this.minutes >= 60) {
                this.minutes = 0;
                this.hours = (this.hours + 1) % 24;
            }
        }
    }

    resetTime(): void {
        const currentTime = new Date();
        this.updateTime(currentTime);
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

    toggleFormat(): void {
        this.is24HourFormat = !this.is24HourFormat;
        console.log(`Time format toggled. Now 24-hour format is: ${this.is24HourFormat}`);
    }


    getAmPm(): string {
        if (this.is24HourFormat) {
            return ''; // Empty string for 24-hour format
        } else {
            return this.hours >= 12 ? 'PM' : 'AM';
        }
    }

    getFormattedHours(): string {
        if (this.is24HourFormat) {
            return this.hours.toString().padStart(2, '0');
        } else {
            let hour = this.hours % 12;
            if (hour === 0) hour = 12; // Handle midnight and noon
            return hour.toString().padStart(2, '0'); // Return formatted hours only, without "AM/PM"
        }
    }
}
