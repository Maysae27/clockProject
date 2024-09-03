import {ClockModel} from "../Models/clockModel";
import {ClockView} from "../Views/clockView";
import '../index.css'

export class ClockController {
    private models: ClockModel[];
    private view: ClockView;

    constructor(models: ClockModel[], view: ClockView) {
        this.models = models;
        this.view = view;
        this.setupEventListeners(); //Global listeners


        this.models.forEach((_, index) => {
            this.setupClockEventListeners(index);
        });
    }

    private setupEventListeners(): void {
        const addButton = document.getElementById('add-button') as HTMLButtonElement;

        // Remove all existing event listeners before adding a new one
        const newButton = addButton.cloneNode(true) as HTMLButtonElement;
        addButton.parentNode?.replaceChild(newButton, addButton);

        newButton.onclick = () => {
            console.log("Add button clicked!");
            this.addClock();
        };


    }


    private addClock(): void {
        console.log("addClock method called.");
        const defaultTimezoneOffset = 0; // Default to GMT
        const newModel = new ClockModel(defaultTimezoneOffset);
        this.view.addClock(newModel);
        this.setupClockEventListeners(this.models.length - 1);
        this.view.updateClocks()
    }


    private setupClockEventListeners(index: number): void {
        this.setupTimezoneSelect(index);
        this.setupLightButton(index);
        this.setupModeButton(index);
        this.setupIncreaseButton(index);
        this.setupDeleteButton(index);
        this.setupFormatButton(index);
        this.setupResetButton(index);
    }

    private setupTimezoneSelect(index: number): void {
        const timezoneSelect = document.getElementById(`timezone-select-${index}`) as HTMLSelectElement;

        if (timezoneSelect) {
            timezoneSelect.onchange = (event: Event) => {
                const selectElement = event.target as HTMLSelectElement;
                const offset = parseInt(selectElement.value, 10);
                this.models[index].setTimezoneOffset(offset);
                this.view.updateClocks();
            };
        }
    }

    private setupLightButton(index: number): void {
        const lightButton = document.getElementById(`light-button-${index}`) as HTMLButtonElement;

        if (lightButton) {
            lightButton.onclick = () => {
                this.models[index].toggleLight();
                this.view.updateClocks();
            };
        }
    }

    private setupModeButton(index: number): void {
        const modeButton = document.getElementById(`mode-button-${index}`) as HTMLButtonElement;

        if (modeButton) {
            modeButton.addEventListener('click', () => {
                this.models[index].cycleEditable();
                this.view.updateClocks();
            });
        }
    }

    private setupIncreaseButton(index: number): void {
        const increaseButton = document.getElementById(`increase-button-${index}`) as HTMLButtonElement;

        if (increaseButton) {
            increaseButton.addEventListener('click', () => {
                this.view.increaseTime(index);
            });
        }
    }

    private setupDeleteButton(index: number): void {
        const deleteButton = document.getElementById(`delete-button-${index}`) as HTMLButtonElement;

        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                this.view.deleteClock(index);
            });
        }
    }

    private setupFormatButton(index: number): void {
        const formatButton = document.getElementById(`format-button-${index}`) as HTMLButtonElement;

        if (formatButton) {
            formatButton.addEventListener('click', () => {
                console.log(`Format button clicked for clock index: ${index}`);
                this.models[index].toggleFormat();
                this.view.updateClocks();
            });
        }
    }

    private setupResetButton(index: number): void {
        const resetButton = document.getElementById(`reset-button-${index}`) as HTMLButtonElement;

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.models[index].resetTime();
                this.view.updateClocks();
            });
        }
    }


}
