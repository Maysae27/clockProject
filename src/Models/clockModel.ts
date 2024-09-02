export class ClockModel {
    hours: number;
    minutes: number;
    seconds: number;
    editable: 'hours' | 'minutes' | 'none';
    isLightOn: boolean;
    editCycleCount: number;
    isEditing: boolean;

    constructor() {
        const currentTime = new Date();
        this.hours = currentTime.getHours();
        this.minutes = currentTime.getMinutes();
        this.seconds = currentTime.getSeconds();
        this.editable = 'none';
        this.isLightOn = false;
        this.editCycleCount = 0;
        this.isEditing = false;
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

    advanceTime(): void {
        if (!this.isEditing) {
            const currentTime = new Date();
            this.seconds = currentTime.getSeconds();
        }
    }
}
