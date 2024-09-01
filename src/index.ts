import { ClockModel } from "./Models/clockModel";
import { ClockView } from "./Views/clockView";
import { ClockController } from "./Controllers/clockController";


const clockModel = new ClockModel();
const clockView = new ClockView(clockModel);
const clockController = new ClockController(clockModel, clockView);
