"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockController = void 0;
require("../index.css");
class ClockController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        // Set up event listeners for buttons
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.lightButtonEventListener();
        this.modeButtonEventListener();
        this.increaseButtonEventListener();
    }
    lightButtonEventListener() {
        const lightButton = document.getElementById('light-button');
        if (lightButton) {
            lightButton.removeEventListener('click', this.handleLightButtonClick);
            lightButton.addEventListener('click', this.handleLightButtonClick.bind(this));
        }
    }
    modeButtonEventListener() {
        const modeButton = document.getElementById('mode-button');
        if (modeButton) {
            modeButton.removeEventListener('click', this.handleModeButtonClick);
            modeButton.addEventListener('click', this.handleModeButtonClick.bind(this));
        }
    }
    increaseButtonEventListener() {
        const increaseButton = document.getElementById('increase-button');
        if (increaseButton) {
            increaseButton.removeEventListener('click', this.handleIncreaseButtonClick);
            increaseButton.addEventListener('click', this.handleIncreaseButtonClick.bind(this));
        }
    }
    handleLightButtonClick() {
        this.model.toggleLight();
        this.view.updateDisplay();
    }
    handleModeButtonClick() {
        this.model.cycleEditable();
        this.view.updateDisplay();
    }
    handleIncreaseButtonClick() {
        console.log('Increase button clicked');
        this.view.increaseTime();
    }
}
exports.ClockController = ClockController;
//# sourceMappingURL=clockController.js.map