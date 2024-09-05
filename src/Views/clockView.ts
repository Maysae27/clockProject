import { ClockModel } from "../Models/clockModel";
import { getHourRotation, getSecondRotation, getMinuteRotation } from "../Utilities/ClockUtils";
import { createRotationMatrix, Matrix3x3 } from "../Utilities/Matrix3x3";
import {getClockElementIds, } from "../enums/ClockElementId";
import {DisplayViewUtils} from "../Utilities/DisplayUtils";

export class ClockView {

    models: ClockModel[];
    container: HTMLElement;
    template: HTMLTemplateElement;

    constructor(models: ClockModel[], containerId: string) {
        this.models = models;
        this.container = document.getElementById(containerId) as HTMLElement;
        this.template = this.getTemplateElement('clock-template');
        this.renderClocks();
        this.startClockUpdates();
    }

    /** Start updating clock at intervals */
    private startClockUpdates(): void {
        setInterval(() => {
            this.models.forEach(model => model.advanceTime());
            this.updateClocks();
        }, 1000);
    }

    /** Utility method to retrieve template element */
    private getTemplateElement(templateId: string): HTMLTemplateElement {
        const template = document.getElementById(templateId) as HTMLTemplateElement;
        if (!template) throw new Error(`Template with ID ${templateId} not found!`);
        return template;
    }

    /** Render all clocks */
    private renderClocks(): void {
        this.container.innerHTML = ''; // Clear the container
        this.models.forEach((_, index) => this.createAndAppendClock(index));
        this.updateClocks(); // Ensure clocks start in the correct mode
    }

    /** Create and append a new clock element */
    private createAndAppendClock(index: number): void {
        const clockElement = this.createClockElement(index);
        this.container.appendChild(clockElement);
        this.populateTimezoneSelect(index); // Initialize timezones
    }

    /** Create a clock element from template */
    private createClockElement(index: number): HTMLElement {
        const clockElement = this.template.content.cloneNode(true) as HTMLElement;
        DisplayViewUtils.setElementIds(clockElement, index, getClockElementIds());
        this.attachDisplayModeToggle(clockElement, index);
        return clockElement;
    }

    /** Attach display mode toggle button functionality */
    private attachDisplayModeToggle(clockElement: HTMLElement, index: number): void {
        const switchDisplayButton = clockElement.querySelector('.display-mode-button') as HTMLButtonElement;
        if (switchDisplayButton) {
            switchDisplayButton.addEventListener('click', () => this.toggleDisplayMode(index));
        }
    }

    /** Adding a clock */
    public addClock(): void {
        const newModel = new ClockModel(0); // Adding default time offset (can be adjusted)
        this.models.push(newModel);
        this.createAndAppendClock(this.models.length - 1);
    }

    /** Deleting a clock */
    public deleteClock(index: number): void {
        this.models.splice(index, 1); // Remove clock model
        this.renderClocks(); // Rerender all clocks
    }

    /** Updating all clocks */
    public updateClocks(): void {
        this.models.forEach((model, index) => this.updateClockDisplay(index, model));
        this.populateTimezoneSelects(); // Update timezone options if necessary
    }

    /** Update a specific clock display */
    private updateClockDisplay(index: number, model: ClockModel): void {
        if (model.isAnalog) {
            this.updateAnalogClockDisplay(index, model);
        } else {
            this.updateDigitalClockDisplay(index, model);
            this.handleBlinkingEffect(index, model);
        }
    }

    /** Update the digital clock display */
    private updateDigitalClockDisplay(index: number, model: ClockModel): void {
        const hoursDisplay = DisplayViewUtils.getElementById<HTMLSpanElement>(`hours-display-${index}`);
        const minutesDisplay = DisplayViewUtils.getElementById<HTMLSpanElement>(`minutes-display-${index}`);
        const secondsDisplay = DisplayViewUtils.getElementById<HTMLSpanElement>(`seconds-display-${index}`);
        const timeDisplay = DisplayViewUtils.getElementById<HTMLDivElement>(`time-display-${index}`);

        if (hoursDisplay && minutesDisplay && secondsDisplay) {
            hoursDisplay.textContent = model.getFormattedHours();
            minutesDisplay.textContent = model.minutes.toString().padStart(2, '0');
            secondsDisplay.textContent = `${model.seconds.toString().padStart(2, '0')} ${model.getAmPm() || ''}`;
        }

        if (timeDisplay) {
            timeDisplay.style.backgroundColor = model.isLightOn ? '#FBE106' : '';
            timeDisplay.style.color = model.isLightOn ? 'black' : '';
        }
    }

    /** Update the analog clock display */
    private updateAnalogClockDisplay(index: number, model: ClockModel): void {
        const clockElement = DisplayViewUtils.getElementById<HTMLElement>(`clock-${index}`);
        if (!clockElement) return;

        const hoursHand = clockElement.querySelector('.hour-hand') as HTMLElement;
        const minutesHand = clockElement.querySelector('.minute-hand') as HTMLElement;
        const secondsHand = clockElement.querySelector('.second-hand') as HTMLElement;

        this.updateClockHands(hoursHand, minutesHand, secondsHand, model);

        const clockHands = clockElement.querySelector('.clock-hands') as HTMLElement;
        const timeDisplay = clockElement.querySelector('.time-display') as HTMLElement;
        DisplayViewUtils.toggleDisplayMode(clockHands, model.isAnalog);
    }

    /** Update the clock hands rotation */
    private updateClockHands(hoursHand: HTMLElement, minutesHand: HTMLElement, secondsHand: HTMLElement, model: ClockModel): void {
        // Get the rotation angles for each hand
        const hoursRotation = getHourRotation(model.hours, model.minutes);
        const minutesRotation = getMinuteRotation(model.minutes);
        const secondsRotation = getSecondRotation(model.seconds);

        // Create rotation matrices for each hand
        const hoursRotationMatrix = createRotationMatrix(hoursRotation);
        const minutesRotationMatrix = createRotationMatrix(minutesRotation);
        const secondsRotationMatrix = createRotationMatrix(secondsRotation);

        // Convert each matrix to a CSS transform string and apply it to the corresponding hand
        hoursHand.style.transform = this.matrixToCssTransform(hoursRotationMatrix);
        minutesHand.style.transform = this.matrixToCssTransform(minutesRotationMatrix);
        secondsHand.style.transform = this.matrixToCssTransform(secondsRotationMatrix);
    }

    /** Convert a Matrix3x3 to a CSS transform string */
    private matrixToCssTransform(matrix: Matrix3x3): string {
        const m = matrix.matrix;
        return `matrix(${m[0][0]}, ${m[1][0]}, ${m[0][1]}, ${m[1][1]}, ${m[0][2]}, ${m[1][2]})`;
    }

    /** Handle blinking effect for editable fields */
    private handleBlinkingEffect(index: number, model: ClockModel): void {
        const hoursDisplay = DisplayViewUtils.getElementById<HTMLSpanElement>(`hours-display-${index}`);
        const minutesDisplay = DisplayViewUtils.getElementById<HTMLSpanElement>(`minutes-display-${index}`);

        hoursDisplay?.classList.toggle('blinking', model.editable === 'hours');
        minutesDisplay?.classList.toggle('blinking', model.editable === 'minutes');
    }

    /** Populate timezone select for all clocks */
    private populateTimezoneSelects(): void {
        this.models.forEach((_, index) => this.populateTimezoneSelect(index));
    }

    /** Populate timezone select for a specific clock */
    private populateTimezoneSelect(index: number): void {
        const timezoneSelect = DisplayViewUtils.getElementById<HTMLSelectElement>(`timezone-select-${index}`);
        if (timezoneSelect) {
            DisplayViewUtils.populateTimezoneSelect(timezoneSelect, this.models[index].timezoneOffset);
        }
    }

    /** Toggle display mode between analog and digital */
    private toggleDisplayMode(index: number): void {
        const clockElement = DisplayViewUtils.getElementById<HTMLElement>(`clock-${index}`);

        if (!clockElement) return;

        const isAnalog = clockElement.classList.contains('analog-mode');  // Check if it's in analog mode

        DisplayViewUtils.toggleDisplayMode(clockElement, isAnalog);

        this.updateClockDisplay(index, this.models[index]); // Update clock display on mode change
    }
}
