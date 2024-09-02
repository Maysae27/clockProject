"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockController = void 0;
const clockModel_1 = require("../Models/clockModel");
require("../index.css");
class ClockController {
    constructor(models, view) {
        this.models = models;
        this.view = view;
        // Set up event listeners for existing clocks and the Add button
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.models.forEach((_, index) => {
            this.setupClockEventListeners(index);
        });
        const addButton = document.getElementById('add-button');
        if (addButton) {
            addButton.addEventListener('click', this.addClock.bind(this));
        }
    }
    setupClockEventListeners(index) {
        const lightButton = document.getElementById(`light-button-${index}`);
        const modeButton = document.getElementById(`mode-button-${index}`);
        const increaseButton = document.getElementById(`increase-button-${index}`);
        const deleteButton = document.getElementById(`delete-button-${index}`);
        if (lightButton) {
            lightButton.addEventListener('click', () => {
                this.models[index].toggleLight();
                this.view.updateClocks();
            });
        }
        if (modeButton) {
            modeButton.addEventListener('click', () => {
                this.models[index].cycleEditable();
                this.view.updateClocks();
            });
        }
        if (increaseButton) {
            increaseButton.addEventListener('click', () => {
                this.view.increaseTime(index);
            });
        }
        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                this.view.deleteClock(index);
            });
        }
    }
    addClock() {
        const newModel = new clockModel_1.ClockModel();
        this.view.addClock(newModel);
        this.setupClockEventListeners(this.models.length - 1);
    }
}
exports.ClockController = ClockController;
//# sourceMappingURL=clockController.js.map