export class ClockModel {
    hours: number;
    minutes: number;
    seconds: number;
    editable: 'hours' | 'minutes' | 'none';
    isLightOn: boolean;
    editCycleCount: number;
    isEditing: boolean;
    is24HourFormat: boolean;

    constructor() {
        const currentTime = new Date();
        this.hours = currentTime.getHours();
        this.minutes = currentTime.getMinutes();
        this.seconds = currentTime.getSeconds();
        this.editable = 'none';
        this.isLightOn = false;
        this.editCycleCount = 0;
        this.isEditing = false;
        this.is24HourFormat = true;
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


    advanceTime(): void {
        if (!this.isEditing) {
            const currentTime = new Date();
            this.seconds = currentTime.getSeconds();
        }
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
