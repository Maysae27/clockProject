"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockModel = void 0;
class ClockModel {
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
    cycleEditable() {
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
    increaseHours() {
        this.hours = (this.hours + 1) % 24;
    }
    increaseMinutes() {
        this.minutes = (this.minutes + 1) % 60;
        if (this.minutes === 0) {
            this.increaseHours();
        }
    }
    increaseSeconds() {
        this.seconds = (this.seconds + 1) % 60;
        if (this.seconds === 0) {
            this.increaseMinutes();
        }
    }
    toggleLight() {
        this.isLightOn = !this.isLightOn;
    }
    advanceTime() {
        if (!this.isEditing) {
            const currentTime = new Date();
            this.seconds = currentTime.getSeconds();
        }
    }
}
exports.ClockModel = ClockModel;
//# sourceMappingURL=clockModel.js.map