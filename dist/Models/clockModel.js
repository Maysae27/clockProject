"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockModel = void 0;
class ClockModel {
    constructor() {
        this.editable = 'none';
        const now = new Date();
        this.hours = now.getHours();
        this.minutes = now.getMinutes();
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
    incrementTime() {
        if (this.editable === 'hours') {
            this.increaseHours();
        }
        else if (this.editable === 'minutes') {
            this.increaseMinutes();
        }
    }
}
exports.ClockModel = ClockModel;
//# sourceMappingURL=clockModel.js.map