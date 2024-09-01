"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockView = void 0;
class ClockView {
    constructor(model) {
        this.model = model;
        this.updateDisplay();
    }
    updateDisplay() {
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            const hours = this.model.hours.toString().padStart(2, '0');
            const minutes = this.model.minutes.toString().padStart(2, '0');
            const seconds = new Date().toLocaleTimeString().split(':')[2].padStart(2, '0'); // Get seconds
            let displayText = '';
            let className = '';
            if (this.model.editable === 'hours') {
                displayText = `${hours}:${minutes}:${seconds}`;
                className = 'blinking-hours';
            }
            else if (this.model.editable === 'minutes') {
                displayText = `${hours}:${minutes}:${seconds}`;
                className = 'blinking-minutes';
            }
            else {
                displayText = `${hours}:${minutes}:${seconds}`;
            }
            timeDisplay.textContent = displayText;
            timeDisplay.className = `time-display ${className}`;
        }
    }
}
exports.ClockView = ClockView;
//# sourceMappingURL=clockView.js.map