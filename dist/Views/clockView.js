"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockView = void 0;
const clockModel_1 = require("../Models/clockModel");
const TimeZoneOffset_1 = require("../enums/TimeZoneOffset");
const ClockElementId_1 = require("../enums/ClockElementId");
class ClockView {
    constructor(models, containerId) {
        this.models = models;
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with ID ${containerId} not found!`);
        }
        // Fetch template now that the homepage is loaded
        this.template = this.getTemplateElement('clock-template');
        this.renderClocks(); // Render clocks after initializing
    }
    /** Loads the homepage template into the main content area */
    loadHomepageTemplate() {
        console.log('Fetching homepage template...');
        return fetch('templates/homepage.html')
            .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
            .then(html => {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.innerHTML = html;
                this.container = document.getElementById('clock-container');
                if (!this.container) {
                    throw new Error('Clock container not found!');
                }
                this.template = this.getTemplateElement('clock-template');
                this.renderClocks();
            }
            else {
                throw new Error('Main content container not found!');
            }
        })
            .catch(error => {
            console.error('Error in loadHomepageTemplate:', error);
            throw error; // Rethrow to handle in the calling code
        });
    }
    /** Utility method to retrieve template element */
    getTemplateElement(templateId) {
        if (!this.template) {
            const template = document.getElementById(templateId);
            if (!template) {
                throw new Error(`Template with ID ${templateId} not found!`);
            }
            return template;
        }
        return this.template;
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
    createClockElement(index) {
        const clockElement = this.template.content.cloneNode(true);
        this.setElementIds(clockElement, index);
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
            this.updateClockDisplay(index, model);
            this.handleBlinking(model, index);
        });
        this.populateTimezoneSelects();
    }
    /** Updates the display for a specific clock */
    updateClockDisplay(index, model) {
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
}
exports.ClockView = ClockView;
//# sourceMappingURL=clockView.js.map