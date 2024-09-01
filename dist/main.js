"use strict";
// main.ts
Object.defineProperty(exports, "__esModule", { value: true });
const clockModel_1 = require("./Models/clockModel");
const clockView_1 = require("./Views/clockView");
const clockController_1 = require("./Controllers/clockController");
require("./index.css");
const model = new clockModel_1.ClockModel();
const view = new clockView_1.ClockView(model);
const controller = new clockController_1.ClockController(model, view);
//# sourceMappingURL=main.js.map