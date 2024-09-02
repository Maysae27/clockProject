import { ClockModel } from "../Models/clockModel";
import { ClockView } from "../Views/clockView";
import '../index.css'

export class ClockController {
    private models: ClockModel[];
    private view: ClockView;

    constructor(models: ClockModel[], view: ClockView) {
        this.models = models;
        this.view = view;

        // Set up event listeners for existing clocks and the Add button
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.models.forEach((_, index) => {
            this.setupClockEventListeners(index);
        });

        const addButton = document.getElementById('add-button') as HTMLButtonElement;
        if (addButton) {
            addButton.addEventListener('click', this.addClock.bind(this));
        }
    }

    private setupClockEventListeners(index: number): void {
        const lightButton = document.getElementById(`light-button-${index}`) as HTMLButtonElement;
        const modeButton = document.getElementById(`mode-button-${index}`) as HTMLButtonElement;
        const increaseButton = document.getElementById(`increase-button-${index}`) as HTMLButtonElement;
        const deleteButton = document.getElementById(`delete-button-${index}`) as HTMLButtonElement;
        const formatButton = document.getElementById(`format-button-${index}`) as HTMLButtonElement;

        if (lightButton) {
            lightButton.addEventListener('click', () => {
                this.models[index].toggleLight();
                this.view.updateClocks();
            });
        }

        if (modeButton) {
            modeButton.addEventListener('click', () => {
                this.models[index].cycleEditable();
                this.view.updateClocks();
            });
        }

        if (increaseButton) {
            increaseButton.addEventListener('click', () => {
                this.view.increaseTime(index);
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                this.view.deleteClock(index);
            });
        }
        if (formatButton) {
            formatButton.addEventListener('click', () => {
                console.log(`Format button clicked for clock index: ${index}`);
                this.models[index].toggleFormat(); // Toggle the format in the model
                this.view.updateClocks(); // Update the clocks to reflect the change
            });
        }

    }

    private addClock(): void {
        const newModel = new ClockModel();
        this.view.addClock(newModel);
        this.setupClockEventListeners(this.models.length - 1);
    }
}
