"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clockModel_1 = require("./Models/clockModel");
const clockView_1 = require("./Views/clockView");
const clockController_1 = require("./Controllers/clockController");
const clockModel = new clockModel_1.ClockModel();
const clockView = new clockView_1.ClockView(clockModel);
const clockController = new clockController_1.ClockController(clockModel, clockView);
//# sourceMappingURL=index.js.map