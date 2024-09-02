"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clockModel_1 = require("./Models/clockModel");
const clockView_1 = require("./Views/clockView");
const clockController_1 = require("./Controllers/clockController");
// Initial setup
const initialModels = [new clockModel_1.ClockModel()]; // Create initial models
const containerId = 'clock-container'; // Ensure this matches the ID in your HTML
const clockView = new clockView_1.ClockView(initialModels, containerId);
const clockController = new clockController_1.ClockController(initialModels, clockView);
//# sourceMappingURL=index.js.map