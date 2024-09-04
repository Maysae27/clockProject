"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockController = void 0;
const clockView_1 = require("../Views/clockView");
const EventHandler_1 = require("../Utilities/EventHandler");
require("../index.css");
class ClockController {
    constructor(models, view) {
        this.models = models;
        this.view = view;
        this.setupGlobalEventListeners();
        this.models.forEach((_, index) => this.setupClock(index));
    }
    /**Global event listeners taht aren't tide to an instance of a clock*/
    setupGlobalEventListeners() {
        EventHandler_1.EventHandler.addClickListener('add-button', () => this.addClock());
    }
    /** Setup all clocks */
    setupAllClocks() {
        this.models.forEach((_, index) => this.setupClock(index));
    }
    /**Setup related to an instance of a clock: time zone && all buttons listners**/
    setupClock(index) {
        this.setupTimezoneSelect(index);
        this.setupButtonListeners(index);
    }
    /**Event listner setup for add button that allows adding a new instance of a clock*/
    setupAddButtonListener() {
        const addButton = document.getElementById('add-button');
        if (addButton) {
            addButton.onclick = () => {
                this.addClock();
            };
        }
    }
    /**Adding a new clock */
    addClock() {
        this.view.addClock();
        this.setupClock(this.models.length - 1);
        this.view.updateClocks();
    }
    /**Grouping all buttons listeners**/
    setupButtonListeners(index) {
        EventHandler_1.EventHandler.addClickListener(`light-button-${index}`, () => this.toggleLight(index));
        EventHandler_1.EventHandler.addClickListener(`mode-button-${index}`, () => this.cycleEditable(index));
        EventHandler_1.EventHandler.addClickListener(`increase-button-${index}`, () => this.increaseTime(index));
        EventHandler_1.EventHandler.addClickListener(`delete-button-${index}`, () => this.deleteClock(index));
        EventHandler_1.EventHandler.addClickListener(`format-button-${index}`, () => this.toggleFormat(index));
        EventHandler_1.EventHandler.addClickListener(`reset-button-${index}`, () => this.resetTime(index));
        EventHandler_1.EventHandler.addClickListener(`display-mode-button-${index}`, () => this.toggleDisplayMode(index));
    }
    /**Setting up a button listener **/
    setupButtonListener(buttonId, handler) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.onclick = handler;
        }
    }
    /**Time zone setup using an offset**/
    setupTimezoneSelect(index) {
        const timezoneSelectId = `timezone-select-${index}`;
        const timezoneSelect = document.getElementById(timezoneSelectId);
        if (timezoneSelect) {
            // Populate the select options
            timezoneSelect.innerHTML = clockView_1.ClockView.generateTimeZoneOptions();
            EventHandler_1.EventHandler.addChangeListener(timezoneSelectId, (event) => {
                const selectElement = event.target;
                const offset = parseInt(selectElement.value, 10);
                this.models[index].setTimezoneOffset(offset);
                this.view.updateClocks();
            });
        }
    }
    toggleLight(index) {
        this.models[index].toggleLight();
        this.view.updateClocks();
    }
    /**Triggering the editing cycle when button: mode is pressed (3 phases) **/
    cycleEditable(index) {
        console.log("Cycling editable mode for clock index:", index);
        this.models[index].cycleEditable();
        this.view.updateClocks();
    }
    increaseTime(index) {
        const model = this.models[index];
        if (model.editable === 'hours') {
            model.increaseHours();
        }
        else if (model.editable === 'minutes') {
            model.increaseMinutes();
        }
        this.view.updateClocks();
    }
    deleteClock(index) {
        this.view.deleteClock(index);
        this.setupAllClocks(); // Re-setup event listeners for remaining clocks
    }
    toggleFormat(index) {
        this.models[index].toggleFormat();
        this.view.updateClocks();
    }
    resetTime(index) {
        this.models[index].resetTime();
        this.view.updateClocks();
    }
    /** Method to handle the toggle of display mode: analog or digital */
    toggleDisplayMode(index) {
        console.log("Toggling display mode for clock index:", index);
        this.models[index].toggleDisplayMode();
        this.view.updateClocks();
    }
}
exports.ClockController = ClockController;
//# sourceMappingURL=clockController.js.map