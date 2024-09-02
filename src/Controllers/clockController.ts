import { ClockModel } from "../Models/clockModel";
import { ClockView } from "../Views/clockView"
import '../index.css'

export class ClockController {
    private model: ClockModel;
    private view: ClockView;

    constructor(model: ClockModel, view: ClockView) {
        this.model = model;
        this.view = view;

        // Set up event listeners for buttons
        this.setupEventListeners();
    }
    private setupEventListeners(): void {
        this.lightButtonEventListener();
        this.modeButtonEventListener();
        this.increaseButtonEventListener();
    }

    private lightButtonEventListener(): void {
        const lightButton = document.getElementById('light-button') as HTMLButtonElement;
        if (lightButton) {
            lightButton.removeEventListener('click', this.handleLightButtonClick);
            lightButton.addEventListener('click', this.handleLightButtonClick.bind(this));
        }
    }

    private modeButtonEventListener(): void {
        const modeButton = document.getElementById('mode-button') as HTMLButtonElement;
        if (modeButton) {
            modeButton.removeEventListener('click', this.handleModeButtonClick);
            modeButton.addEventListener('click', this.handleModeButtonClick.bind(this));
        }
    }

    private increaseButtonEventListener(): void {
        const increaseButton = document.getElementById('increase-button') as HTMLButtonElement;
        if (increaseButton) {
            increaseButton.removeEventListener('click', this.handleIncreaseButtonClick);
            increaseButton.addEventListener('click', this.handleIncreaseButtonClick.bind(this));
        }
    }

    private handleLightButtonClick(): void {
        this.model.toggleLight();
        this.view.updateDisplay();
    }

    private handleModeButtonClick(): void {
        this.model.cycleEditable();
        this.view.updateDisplay();
    }

    private handleIncreaseButtonClick(): void {
        console.log('Increase button clicked');
        this.view.increaseTime();
    }


}
