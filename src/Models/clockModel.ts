export class ClockModel {

    hours: number;
    minutes: number;
    seconds: number;
    editable: 'hours' | 'minutes' | 'none'; // Indicates which part of the time is currently editable
    isLightOn: boolean; // Indicates whether the clock's light is on
    editCycleCount: number; // Tracks the cycle of the editable mode (hours, minutes, none)
    isEditing: boolean; // Indicates if the clock is currently in editing mode
    is24HourFormat: boolean; // Indicates whether the clock is in 24-hour or 12-hour format
    timezoneOffset: number; // Timezone offset in hours from UTC


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

    /**Sets the timezone offset and updates the clock's time accordingly.*/
    setTimezoneOffset(offset: number): void {
        this.timezoneOffset = offset;
        const now = new Date();
        now.setUTCMinutes(now.getUTCMinutes() + offset * 60);
        this.hours = now.getUTCHours();
        this.minutes = now.getUTCMinutes();
        this.seconds = now.getUTCSeconds();
    }

    /**Finalizes the editing process and stops editing mode.*/
    finalizeEdit(): void {
        this.isEditing = false;
        this.editable = 'none';

        const now = new Date();
        now.setUTCHours(this.hours - this.timezoneOffset);
        now.setUTCMinutes(this.minutes);
        now.setUTCSeconds(this.seconds);
    }


    /**Cycles through the editable modes (hours -> minutes -> none).
    * Each call advances to the next mode in the cycle.
    * */

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

    /**
     * Advances the time by one second. If not in editing mode, minutes and hours are updated accordingly.(while in blinking mode)
     */
    advanceTime(): void {
        //only seconds keep advancing while the rest is being edited with --blink effect--
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

    /**
     * Resets the time to the current time based on the system clock and timezone offset. --> For reset button
     */
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


    /**Utility function: Returns either "AM" or "PM" based on the current hour and format.**/
    getAmPm(): string {
        if (this.is24HourFormat) {
            return ''; // Empty string for 24-hour format
        } else {
            return this.hours >= 12 ? 'PM' : 'AM';
        }
    }

    /** Returns the formatted hour string based on the current hour and format.**/
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
