// Controllers/clockController.ts
import { ClockModel } from "../Models/clockModel";
import { ClockView } from "../Views/clockView"
import '../index.css'

export class ClockController {
    private model: ClockModel;
    private view: ClockView;

    constructor(model: ClockModel, view: ClockView) {
        this.model = model;
        this.view = view;
    }


}
