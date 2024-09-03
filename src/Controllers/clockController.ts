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

        this.setupTimezoneSelect(); // Setup timezone select
    }

    private setupTimezoneSelect(): void {
        const timezoneSelect = document.getElementById('timezone-select') as HTMLSelectElement;
        if (timezoneSelect) {
            timezoneSelect.onchange = () => {
                const offset = parseInt(timezoneSelect.value, 10);
                this.models.forEach(model => model.setTimezoneOffset(offset));
                this.view.updateClocks(); // Refresh the view with the new timezone
            };
        }
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
        const lightButton = document.getElementById(`light-button-${index}`) as HTMLButtonElement;
        const modeButton = document.getElementById(`mode-button-${index}`) as HTMLButtonElement;
        const increaseButton = document.getElementById(`increase-button-${index}`) as HTMLButtonElement;
        const deleteButton = document.getElementById(`delete-button-${index}`) as HTMLButtonElement;
        const formatButton = document.getElementById(`format-button-${index}`) as HTMLButtonElement;
        const timezoneSelect = document.getElementById(`timezone-select-${index}`) as HTMLSelectElement;

        if (timezoneSelect) {
            timezoneSelect.onchange = (event: Event) => {
                const selectElement = event.target as HTMLSelectElement;
                const offset = parseInt(selectElement.value, 10);
                this.models[index].setTimezoneOffset(offset);
                this.view.updateClocks();
            };
        }

        if (lightButton) {
            lightButton.onclick = () => {
                this.models[index].toggleLight();
                this.view.updateClocks();
            };
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


}
