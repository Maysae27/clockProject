"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockView = void 0;
class ClockView {
    constructor(models, containerId) {
        this.models = models;
        this.container = document.getElementById(containerId);
        this.template = document.getElementById('clock-template');
        if (!this.template) {
            throw new Error("Clock template not found!");
        }
        this.renderClocks();
        this.startClockUpdates(); // Start the clock updates
    }
    startClockUpdates() {
        setInterval(() => {
            this.models.forEach(model => model.advanceTime()); // Update the time in each model
            this.updateClocks(); // Refresh the view
        }, 1000); // Update every second
    }
    renderClocks() {
        this.container.innerHTML = ''; // Clear existing clocks
        this.models.forEach((_, index) => {
            const clockElement = this.createClockElement(index);
            this.container.appendChild(clockElement);
        });
        this.updateClocks();
    }
    createClockElement(index) {
        const clockElement = this.template.content.cloneNode(true);
        // Add unique IDs to elements to avoid conflicts when querying them
        const timeDisplay = clockElement.querySelector('.time-display');
        timeDisplay.id = `time-display-${index}`;
        const hoursDisplay = clockElement.querySelector('.hours-display');
        hoursDisplay.id = `hours-display-${index}`;
        const minutesDisplay = clockElement.querySelector('.minutes-display');
        minutesDisplay.id = `minutes-display-${index}`;
        const secondsDisplay = clockElement.querySelector('.seconds-display');
        secondsDisplay.id = `seconds-display-${index}`;
        const modeButton = clockElement.querySelector('.mode-button');
        modeButton.id = `mode-button-${index}`;
        const increaseButton = clockElement.querySelector('.increase-button');
        increaseButton.id = `increase-button-${index}`;
        const lightButton = clockElement.querySelector('.light-button');
        lightButton.id = `light-button-${index}`;
        const deleteButton = clockElement.querySelector('.delete-button');
        deleteButton.id = `delete-button-${index}`;
        this.setupClockEventListeners(index); // Ensure event listeners are set up for the new clock
        return clockElement;
    }
    setupClockEventListeners(index) {
        const lightButton = document.getElementById(`light-button-${index}`);
        const modeButton = document.getElementById(`mode-button-${index}`);
        const increaseButton = document.getElementById(`increase-button-${index}`);
        const deleteButton = document.getElementById(`delete-button-${index}`);
        if (lightButton) {
            lightButton.addEventListener('click', () => {
                this.models[index].toggleLight();
                this.updateClocks();
            });
        }
        if (modeButton) {
            modeButton.addEventListener('click', () => {
                this.models[index].cycleEditable();
                this.updateClocks();
            });
        }
        if (increaseButton) {
            increaseButton.addEventListener('click', () => {
                this.increaseTime(index);
            });
        }
        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                this.deleteClock(index);
            });
        }
    }
    addClock(model) {
        this.models.push(model);
        const newClockElement = this.createClockElement(this.models.length - 1);
        this.container.appendChild(newClockElement);
        this.updateClocks();
        this.setupClockEventListeners(this.models.length - 1);
    }
    deleteClock(index) {
        this.models.splice(index, 1);
        this.renderClocks(); // Re-render all clocks
    }
    increaseTime(index) {
        if (this.models[index].editable === 'hours') {
            this.models[index].increaseHours();
        }
        else if (this.models[index].editable === 'minutes') {
            this.models[index].increaseMinutes();
        }
        this.updateClocks();
    }
    updateClocks() {
        this.models.forEach((model, index) => {
            const hoursDisplay = document.getElementById(`hours-display-${index}`);
            const minutesDisplay = document.getElementById(`minutes-display-${index}`);
            const secondsDisplay = document.getElementById(`seconds-display-${index}`);
            if (hoursDisplay && minutesDisplay && secondsDisplay) {
                hoursDisplay.textContent = model.hours.toString().padStart(2, '0');
                minutesDisplay.textContent = model.minutes.toString().padStart(2, '0');
                secondsDisplay.textContent = model.seconds.toString().padStart(2, '0');
            }
            const timeDisplay = document.getElementById(`time-display-${index}`);
            if (timeDisplay) {
                if (model.isLightOn) {
                    timeDisplay.style.backgroundColor = '#FBE106';
                    timeDisplay.style.color = 'black';
                }
                else {
                    timeDisplay.style.backgroundColor = '';
                    timeDisplay.style.color = '';
                }
            }
            this.handleBlinking(model, index);
        });
    }
    handleBlinking(model, index) {
        const hoursDisplay = document.getElementById(`hours-display-${index}`);
        const minutesDisplay = document.getElementById(`minutes-display-${index}`);
        if (hoursDisplay) {
            hoursDisplay.classList.remove('blinking');
        }
        if (minutesDisplay) {
            minutesDisplay.classList.remove('blinking');
        }
        if (model.editable === 'hours') {
            if (hoursDisplay) {
                hoursDisplay.classList.add('blinking');
            }
        }
        else if (model.editable === 'minutes') {
            if (minutesDisplay) {
                minutesDisplay.classList.add('blinking');
            }
        }
    }
}
exports.ClockView = ClockView;
//# sourceMappingURL=clockView.js.map