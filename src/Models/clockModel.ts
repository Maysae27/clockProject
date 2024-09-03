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
        const currentTime = new Date();
        this.timezoneOffset = timezoneOffset;
        this.hours = currentTime.getUTCHours(); // Use UTC hours initially
        this.minutes = currentTime.getUTCMinutes();
        this.seconds = currentTime.getUTCSeconds();
        this.updateTime(currentTime);
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
        const currentTime = new Date();
        this.updateTime(currentTime);
    }

    advanceTime(): void {
        if (!this.isEditing) {
            const now = new Date();
            const utcTime = new Date(now.getTime() + this.timezoneOffset * 60 * 60 * 1000);
            this.hours = utcTime.getUTCHours();
            this.minutes = utcTime.getUTCMinutes();
            this.seconds = utcTime.getUTCSeconds();
        }
    }



    cycleEditable(): void {
        this.editCycleCount = (this.editCycleCount + 1) % 3;

        switch (this.editCycleCount) {
            case 0:
                this.editable = 'none';
                break;
            case 1:
                this.editable = 'hours';
                break;
            case 2:
                this.editable = 'minutes';
                break;
        }
        console.log(`Editable set to: ${this.editable}`);
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
