import { ClockModel } from "../Models/clockModel";

export class ClockView {
    private model: ClockModel;

    constructor(model: ClockModel) {
        this.model = model;
        this.updateDisplay();
        setInterval(() => {
            this.model.advanceTime();
            this.updateDisplay();
        }, 1000);  // Update every second
    }

    updateDisplay(): void {
        const hoursDisplay = document.getElementById('hours-display') as HTMLSpanElement;
        const minutesDisplay = document.getElementById('minutes-display') as HTMLSpanElement;
        const secondsDisplay = document.getElementById('seconds-display') as HTMLSpanElement;

        if (hoursDisplay && minutesDisplay && secondsDisplay) {
            hoursDisplay.textContent = this.model.hours.toString().padStart(2, '0');
            minutesDisplay.textContent = this.model.minutes.toString().padStart(2, '0');
            secondsDisplay.textContent = this.model.seconds.toString().padStart(2, '0');

        }
    }
}
