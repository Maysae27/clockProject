import { ClockModel } from "./Models/clockModel";
import { ClockView } from "./Views/clockView";
import { ClockController } from "./Controllers/clockController";

// Initial setup
const initialModels = [new ClockModel()]; // Create initial models
const containerId = 'clock-container'; // Ensure this matches the ID in your HTML
const clockView = new ClockView(initialModels, containerId);
const clockController = new ClockController(initialModels, clockView);
