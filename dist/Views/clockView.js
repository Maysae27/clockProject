"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockView = void 0;
const clockModel_1 = require("../Models/clockModel");
const TimeZoneOffset_1 = require("../enums/TimeZoneOffset");
const ClockElementId_1 = require("../enums/ClockElementId");
const ClockUtils_1 = require("../Utilities/ClockUtils");
class ClockView {
    constructor(models, containerId) {
        this.models = models;
        this.container = document.getElementById(containerId);
        this.template = this.getTemplateElement('clock-template');
        this.renderClocks();
        this.startClockUpdates();
    }
    startClockUpdates() {
        setInterval(() => {
            this.models.forEach(model => model.advanceTime());
            this.updateClocks();
        }, 1000);
    }
    /** Utility method to retrieve template element */
    getTemplateElement(templateId) {
        const template = document.getElementById(templateId);
        if (!template) {
            throw new Error(`Template with ID ${templateId} not found!`);
        }
        return template;
    }
    /** Renders all clocks in the container */
    renderClocks() {
        this.container.innerHTML = '';
        this.models.forEach((_, index) => {
            const clockElement = this.createClockElement(index);
            this.container.appendChild(clockElement);
        });
        this.updateClocks();
    }
    /** Creates a clock element using the template */
    /** Creates a clock element using the template */
    createClockElement(index) {
        const clockElement = this.template.content.cloneNode(true);
        this.setElementIds(clockElement, index);
        // Add event listener for switching display mode
        const switchDisplayButton = clockElement.querySelector('.display-mode-button');
        if (switchDisplayButton) {
            switchDisplayButton.addEventListener('click', () => this.toggleDisplayMode(index));
        }
        return clockElement;
    }
    /** Sets unique IDs for elements in a clock based on its index */
    setElementIds(clockElement, index) {
        const elementIds = (0, ClockElementId_1.getClockElementIds)();
        elementIds.forEach(id => {
            const element = clockElement.querySelector(`.${id}`);
            if (element) {
                element.id = `${id}-${index}`;
            }
        });
    }
    /** Public method to add a new clock */
    addClock() {
        const newModel = new clockModel_1.ClockModel(0);
        this.models.push(newModel);
        const clockElement = this.createClockElement(this.models.length - 1);
        this.container.appendChild(clockElement);
        this.populateTimezoneSelect(this.models.length - 1);
    }
    /** Public method to delete a clock */
    deleteClock(index) {
        this.models.splice(index, 1);
        this.renderClocks();
    }
    /** Public method to update all clocks */
    updateClocks() {
        this.models.forEach((model, index) => {
            if (model.isAnalog) {
                this.updateAnalogClockDisplay(index, model);
            }
            else {
                this.updateDigitalClockDisplay(index, model);
                this.handleBlinking(model, index);
            }
        });
        this.populateTimezoneSelects();
    }
    /** Updates the display for a specific clock */
    updateDigitalClockDisplay(index, model) {
        const hoursDisplay = document.getElementById(`hours-display-${index}`);
        const minutesDisplay = document.getElementById(`minutes-display-${index}`);
        const secondsDisplay = document.getElementById(`seconds-display-${index}`);
        const timeDisplay = document.getElementById(`time-display-${index}`);
        if (hoursDisplay && minutesDisplay && secondsDisplay) {
            hoursDisplay.textContent = model.getFormattedHours();
            minutesDisplay.textContent = model.minutes.toString().padStart(2, '0');
            secondsDisplay.textContent = model.seconds.toString().padStart(2, '0');
            const amPmText = model.getAmPm();
            if (amPmText) {
                secondsDisplay.textContent += ` ${amPmText}`;
            }
        }
        if (timeDisplay) {
            timeDisplay.style.backgroundColor = model.isLightOn ? '#FBE106' : '';
            timeDisplay.style.color = model.isLightOn ? 'black' : '';
        }
    }
    updateAnalogClockDisplay(index, model) {
        console.log('Updating analog clock', index);
        const clockElement = document.querySelector(`#clock-${index}`);
        if (!clockElement) {
            console.error(`Clock element with index ${index} not found`);
            return;
        }
        const clockHands = clockElement.querySelector('.clock-hands');
        const timeDisplay = clockElement.querySelector('.time-display');
        const hoursHand = clockElement.querySelector('.hour-hand');
        const minutesHand = clockElement.querySelector('.minute-hand');
        const secondsHand = clockElement.querySelector('.second-hand');
        if (hoursHand && minutesHand && secondsHand) {
            const hoursRotation = (0, ClockUtils_1.getHourRotation)(model.hours, model.minutes);
            const minutesRotation = (0, ClockUtils_1.getMinuteRotation)(model.minutes);
            const secondsRotation = (0, ClockUtils_1.getSecondRotation)(model.seconds);
            hoursHand.style.transform = `rotate(${hoursRotation}deg)`;
            minutesHand.style.transform = `rotate(${minutesRotation}deg)`;
            secondsHand.style.transform = `rotate(${secondsRotation}deg)`;
        }
        // Show/Hide elements based on mode
        if (clockHands && timeDisplay) {
            if (model.isAnalog) {
                clockHands.classList.remove('hidden');
                timeDisplay.classList.add('hidden');
            }
            else {
                clockHands.classList.add('hidden');
                timeDisplay.classList.remove('hidden');
            }
        }
    }
    /** To handle blinking effect for editable fields: hours or minutes */
    handleBlinking(model, index) {
        const hoursDisplay = document.getElementById(`hours-display-${index}`);
        const minutesDisplay = document.getElementById(`minutes-display-${index}`);
        hoursDisplay === null || hoursDisplay === void 0 ? void 0 : hoursDisplay.classList.toggle('blinking', model.editable === 'hours');
        minutesDisplay === null || minutesDisplay === void 0 ? void 0 : minutesDisplay.classList.toggle('blinking', model.editable === 'minutes');
    }
    /** Populates the timezone select dropdown for all clocks */
    populateTimezoneSelects() {
        this.models.forEach((_, index) => this.populateTimezoneSelect(index));
    }
    /** Populates the timezone select dropdown for a specific clock */
    populateTimezoneSelect(index) {
        const timezoneSelect = document.getElementById(`timezone-select-${index}`);
        if (timezoneSelect) {
            timezoneSelect.innerHTML = ClockView.generateTimeZoneOptions();
            timezoneSelect.value = this.models[index].timezoneOffset.toString();
        }
    }
    /** Static method to generate timezone options */
    static generateTimeZoneOptions() {
        return Object.values(TimeZoneOffset_1.TimeZoneOffset)
            .filter(value => typeof value === 'number')
            .map(offset => `<option value="${offset}">${(0, TimeZoneOffset_1.getTimeZoneLabel)(offset)}</option>`)
            .join('');
    }
    /**Code for handling analog mode***/
    /** Toggle display mode between analog and digital for a specific clock */
    toggleDisplayMode(index) {
        const clockElement = document.getElementById(`clock-${index}`);
        const isAnalogMode = clockElement.classList.contains('analog-mode');
        if (isAnalogMode) {
            // Switch to digital mode
            clockElement.classList.remove('analog-mode');
            clockElement.classList.add('digital-mode');
            this.hideAnalogElements(clockElement);
            this.showDigitalElements(clockElement);
        }
        else {
            // Switch to analog mode
            clockElement.classList.remove('digital-mode');
            clockElement.classList.add('analog-mode');
            this.showAnalogElements(clockElement);
            this.hideDigitalElements(clockElement);
        }
    }
    /** Hide elements specific to analog mode */
    hideAnalogElements(clockElement) {
        const handsContainer = clockElement.querySelector('.clock-hands');
        if (handsContainer) {
            handsContainer.classList.add('hidden');
        }
    }
    /** Show elements specific to analog mode */
    showAnalogElements(clockElement) {
        const handsContainer = clockElement.querySelector('.clock-hands');
        if (handsContainer) {
            handsContainer.classList.remove('hidden');
        }
    }
    /** Hide elements specific to digital mode */
    hideDigitalElements(clockElement) {
        const timeDisplay = clockElement.querySelector('.time-display');
        if (timeDisplay) {
            timeDisplay.classList.add('hidden');
        }
    }
    /** Show elements specific to digital mode */
    showDigitalElements(clockElement) {
        const timeDisplay = clockElement.querySelector('.time-display');
        if (timeDisplay) {
            timeDisplay.classList.remove('hidden');
        }
    }
}
exports.ClockView = ClockView;
//# sourceMappingURL=clockView.js.map