// main.ts
import { ClockModel } from "./Models/clockModel";
import { ClockView } from "./Views/clockView";
import { ClockController } from "./Controllers/clockController";
import './index.css';
var model = new ClockModel();
var view = new ClockView(model);
var controller = new ClockController(model, view);
