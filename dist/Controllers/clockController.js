"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockController = void 0;
require("../index.css");
class ClockController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.initialize();
    }
    initialize() {
        var _a, _b, _c;
        (_a = document.getElementById('mode-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.handleModeButton());
        (_b = document.getElementById('increase-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.handleIncreaseButton());
        (_c = document.getElementById('light-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => this.handleLightButton());
        setInterval(() => {
            if (this.model.editable === 'none') {
                // Update the model time
                const now = new Date();
                this.model.hours = now.getHours();
                this.model.minutes = now.getMinutes();
                this.view.updateDisplay();
            }
        }, 1000);
    }
    handleModeButton() {
        if (this.model.editable === 'none') {
            this.model.editable = 'hours';
        }
        else if (this.model.editable === 'hours') {
            this.model.editable = 'minutes';
        }
        else {
            this.model.editable = 'none';
        }
        this.view.updateDisplay();
    }
    handleIncreaseButton() {
        this.model.incrementTime();
        this.view.updateDisplay();
    }
    handleLightButton() {
        const body = document.body;
        if (body.classList.contains('light-on')) {
            body.classList.remove('light-on');
            body.classList.add('light-off');
        }
        else {
            body.classList.remove('light-off');
            body.classList.add('light-on');
        }
        this.view.updateDisplay();
    }
}
exports.ClockController = ClockController;
//# sourceMappingURL=clockController.js.map