"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockView = void 0;
class ClockView {
    constructor(model) {
        this.blinkIntervalId = null;
        this.model = model;
        this.updateDisplay();
        setInterval(() => {
            if (!this.model.isEditing) {
                this.model.advanceTime();
                this.updateDisplay();
            }
        }, 1000); // Update every second
    }
    updateDisplay() {
        this.updateTimeDisplay();
        this.updateLightMode();
        this.handleBlinking();
    }
    updateTimeDisplay() {
        const hoursDisplay = document.getElementById('hours-display');
        const minutesDisplay = document.getElementById('minutes-display');
        const secondsDisplay = document.getElementById('seconds-display');
        if (hoursDisplay && minutesDisplay && secondsDisplay) {
            hoursDisplay.textContent = this.model.hours.toString().padStart(2, '0');
            minutesDisplay.textContent = this.model.minutes.toString().padStart(2, '0');
            secondsDisplay.textContent = this.model.seconds.toString().padStart(2, '0');
        }
    }
    updateLightMode() {
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            if (this.model.isLightOn) {
                timeDisplay.style.backgroundColor = '#FBE106';
                timeDisplay.style.color = 'black';
            }
            else {
                timeDisplay.style.backgroundColor = '';
                timeDisplay.style.color = '';
            }
        }
    }
    handleBlinking() {
        const hoursDisplay = document.getElementById('hours-display');
        const minutesDisplay = document.getElementById('minutes-display');
        if (hoursDisplay) {
            hoursDisplay.classList.remove('blinking');
        }
        if (minutesDisplay) {
            minutesDisplay.classList.remove('blinking');
        }
        if (this.model.editable === 'hours') {
            if (hoursDisplay) {
                hoursDisplay.classList.add('blinking');
            }
        }
        else if (this.model.editable === 'minutes') {
            if (minutesDisplay) {
                minutesDisplay.classList.add('blinking');
            }
        }
    }
    increaseTime() {
        if (this.model.editable === 'hours') {
            this.model.increaseHours();
        }
        else if (this.model.editable === 'minutes') {
            this.model.increaseMinutes();
        }
        this.updateDisplay();
    }
}
exports.ClockView = ClockView;
//# sourceMappingURL=clockView.js.map