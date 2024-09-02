import { ClockModel } from "../Models/clockModel";

export class ClockView {
    private model: ClockModel;
    private blinkIntervalId: number | null = null;

    constructor(model: ClockModel) {
        this.model = model;
        this.updateDisplay();
        setInterval(() => {
            if (!this.model.isEditing) {
                this.model.advanceTime();
                this.updateDisplay();
            }
        }, 1000);  // Update every second
    }

    updateDisplay(): void {
        this.updateTimeDisplay();
        this.updateLightMode();
        this.handleBlinking();
    }

    private updateTimeDisplay(): void {
        const hoursDisplay = document.getElementById('hours-display') as HTMLSpanElement;
        const minutesDisplay = document.getElementById('minutes-display') as HTMLSpanElement;
        const secondsDisplay = document.getElementById('seconds-display') as HTMLSpanElement;

        if (hoursDisplay && minutesDisplay && secondsDisplay) {
            hoursDisplay.textContent = this.model.hours.toString().padStart(2, '0');
            minutesDisplay.textContent = this.model.minutes.toString().padStart(2, '0');
            secondsDisplay.textContent = this.model.seconds.toString().padStart(2, '0');
        }
    }

    private updateLightMode(): void {
        const timeDisplay = document.getElementById('time-display') as HTMLDivElement;

        if (timeDisplay) {
            if (this.model.isLightOn) {
                timeDisplay.style.backgroundColor = '#FBE106';
                timeDisplay.style.color = 'black';
            } else {
                timeDisplay.style.backgroundColor = '';
                timeDisplay.style.color = '';
            }
        }
    }

    private handleBlinking(): void {
        const hoursDisplay = document.getElementById('hours-display') as HTMLSpanElement;
        const minutesDisplay = document.getElementById('minutes-display') as HTMLSpanElement;

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
        } else if (this.model.editable === 'minutes') {
            if (minutesDisplay) {
                minutesDisplay.classList.add('blinking');
            }
        }
    }

    public increaseTime(): void {
        if (this.model.editable === 'hours') {
            this.model.increaseHours();
        } else if (this.model.editable === 'minutes') {
            this.model.increaseMinutes();
        }
        this.updateDisplay();
    }
}
