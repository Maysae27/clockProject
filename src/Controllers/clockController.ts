import { ClockModel } from "../Models/clockModel";
import { ClockView } from "../Views/clockView";
import '../index.css';

export class ClockController {
    private models: ClockModel[];
    private view: ClockView;

    constructor(models: ClockModel[], view: ClockView) {
        this.models = models;
        this.view = view;
        this.setupGlobalEventListeners();
        this.models.forEach((_, index) => this.setupClock(index));
    }

    /**Global event listeners taht aren't tide to an instance of a clock*/
    private setupGlobalEventListeners(): void {
        this.setupAddButtonListener();
    }

    /**Setup related to an instance of a clock: time zone && all buttons listners**/
    private setupClock(index: number): void {
        this.setupTimezoneSelect(index);
        this.setupButtonListeners(index);
    }

    /**Event listner setup for add button that allows adding a new instance of a clock*/
    private setupAddButtonListener(): void {
        const addButton = document.getElementById('add-button') as HTMLButtonElement;
        if (addButton) {
            addButton.onclick = () => {
                this.addClock();
            };
        }
    }

    /**Adding a new clock */
    private addClock(): void {
        const defaultTimezoneOffset = 0; // Default
        const newModel = new ClockModel(defaultTimezoneOffset);
        this.models.push(newModel);
        this.view.addClock(newModel);
        this.setupClock(this.models.length - 1);
        this.view.updateClocks();
    }


    /**Grouping all buttons listeners**/
    private setupButtonListeners(index: number): void {
        this.setupButtonListener(`light-button-${index}`, () => this.toggleLight(index));
        this.setupButtonListener(`mode-button-${index}`, () => this.cycleEditable(index));
        this.setupButtonListener(`increase-button-${index}`, () => this.increaseTime(index));
        this.setupButtonListener(`delete-button-${index}`, () => this.deleteClock(index));
        this.setupButtonListener(`format-button-${index}`, () => this.toggleFormat(index));
        this.setupButtonListener(`reset-button-${index}`, () => this.resetTime(index));
    }

    /**Setting up a button listener **/
    private setupButtonListener(buttonId: string, handler: () => void): void {
        const button = document.getElementById(buttonId) as HTMLButtonElement;
        if (button) {
            button.onclick = handler;
        }
    }

    /**Time zone setup using an offset**/
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

    private toggleLight(index: number): void {
        this.models[index].toggleLight();
        this.view.updateClocks();
    }

    /**Triggering the editing cycle when button: mode is pressed (3 phases) **/
    private cycleEditable(index: number): void {
        this.models[index].cycleEditable();
        this.view.updateClocks();
    }

    private increaseTime(index: number): void {
        this.view.increaseTime(index);
    }

    private deleteClock(index: number): void {
        this.view.deleteClock(index);
    }

    private toggleFormat(index: number): void {
        this.models[index].toggleFormat();
        this.view.updateClocks();
    }

    private resetTime(index: number): void {
        this.models[index].resetTime();
        this.view.updateClocks();
    }
}
