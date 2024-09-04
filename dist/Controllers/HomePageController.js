"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePageController = void 0;
const clockView_1 = require("../Views/clockView");
const clockModel_1 = require("../Models/clockModel");
const clockController_1 = require("./clockController");
class HomePageController {
    constructor(homepageView) {
        this.homepageView = homepageView;
        this.initialize();
    }
    initialize() {
        this.homepageView.loadHomepageTemplate()
            .then(() => {
            const models = [new clockModel_1.ClockModel(0)];
            this.clockView = new clockView_1.ClockView(models, 'clock-container');
            this.clockController = new clockController_1.ClockController(models, this.clockView);
            console.log('Homepage loaded and ClockView initialized.');
        })
            .catch((error) => {
            console.error('Failed to load homepage template:', error);
        });
    }
}
exports.HomePageController = HomePageController;
//# sourceMappingURL=HomePageController.js.map