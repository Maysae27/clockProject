import { ClockModel } from "../Models/clockModel";
import { ClockView } from "../Views/clockView";
import { EventHandler } from '../Utilities/EventHandler';
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
        EventHandler.addClickListener('add-button', () => this.addClock());
    }

    /** Setup all clocks */
    private setupAllClocks(): void {
        this.models.forEach((_, index) => this.setupClock(index));
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
        this.view.addClock();
        this.setupClock(this.models.length - 1);
        this.view.updateClocks();
    }


    /**Grouping all buttons listeners**/
    private setupButtonListeners(index: number): void {
        EventHandler.addClickListener(`light-button-${index}`, () => this.toggleLight(index));
        EventHandler.addClickListener(`mode-button-${index}`, () => this.cycleEditable(index));
        EventHandler.addClickListener(`increase-button-${index}`, () => this.increaseTime(index));
        EventHandler.addClickListener(`delete-button-${index}`, () => this.deleteClock(index));
        EventHandler.addClickListener(`format-button-${index}`, () => this.toggleFormat(index));
        EventHandler.addClickListener(`reset-button-${index}`, () => this.resetTime(index));
        EventHandler.addClickListener(`display-mode-button-${index}`, () => this.toggleDisplayMode(index));

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
        const timezoneSelectId = `timezone-select-${index}`;

        const timezoneSelect = document.getElementById(timezoneSelectId) as HTMLSelectElement;
        if (timezoneSelect) {
            // Populate the select options
            timezoneSelect.innerHTML = ClockView.generateTimeZoneOptions();

            EventHandler.addChangeListener(timezoneSelectId, (event: Event) => {
                const selectElement = event.target as HTMLSelectElement;
                const offset = parseInt(selectElement.value, 10);
                this.models[index].setTimezoneOffset(offset);
                this.view.updateClocks();
            });
        }
    }


    private toggleLight(index: number): void {
        this.models[index].toggleLight();
        this.view.updateClocks();
    }

    /**Triggering the editing cycle when button: mode is pressed (3 phases) **/
    private cycleEditable(index: number): void {
        console.log("Cycling editable mode for clock index:", index);
        this.models[index].cycleEditable();
        this.view.updateClocks();
    }

    public increaseTime(index: number): void {
        const model = this.models[index];
        if (model.editable === 'hours') {
            model.increaseHours();
        } else if (model.editable === 'minutes') {
            model.increaseMinutes();
        }
        this.view.updateClocks();
    }

    private deleteClock(index: number): void {
        this.view.deleteClock(index);
        this.setupAllClocks(); // Re-setup event listeners for remaining clocks
    }

    private toggleFormat(index: number): void {
        this.models[index].toggleFormat();
        this.view.updateClocks();
    }

    private resetTime(index: number): void {
        this.models[index].resetTime();
        this.view.updateClocks();
    }

    /** Method to handle the toggle of display mode: analog or digital */
    private toggleDisplayMode(index: number): void {
        console.log("Toggling display mode for clock index:", index);
        this.models[index].toggleDisplayMode();
        this.view.updateClocks();
    }


}
