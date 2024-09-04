import { ClockModel } from "../Models/clockModel";
import { TimeZoneOffset, getTimeZoneLabel } from '../enums/TimeZoneOffset'
import { ClockElementId, getClockElementIds } from '../enums/ClockElementId';

export class ClockView {
    private models: ClockModel[];
    private container: HTMLElement;
    private template: HTMLTemplateElement;

    constructor(models: ClockModel[], containerId: string) {
        this.models = models;
        this.container = document.getElementById(containerId) as HTMLElement;
        this.template = this.getTemplateElement('clock-template');

        this.renderClocks();
    }

    /** Utility method to retrieve template element */
    private getTemplateElement(templateId: string): HTMLTemplateElement {
        const template = document.getElementById(templateId) as HTMLTemplateElement;
        if (!template) {
            throw new Error(`Template with ID ${templateId} not found!`);
        }
        return template;
    }

    /** Renders all clocks in the container */
    private renderClocks(): void {
        this.container.innerHTML = '';
        this.models.forEach((_, index) => {
            const clockElement = this.createClockElement(index);
            this.container.appendChild(clockElement);
        });
        this.updateClocks();
    }

    /** Creates a clock element using the template */
    private createClockElement(index: number): HTMLElement {
        const clockElement = this.template.content.cloneNode(true) as HTMLElement;
        this.setElementIds(clockElement, index);
        return clockElement;
    }

    /** Sets unique IDs for elements in a clock based on its index */
    private setElementIds(clockElement: HTMLElement, index: number): void {
        const elementIds = getClockElementIds();
        elementIds.forEach(id => {
            const element = clockElement.querySelector(`.${id}`) as HTMLElement;
            if (element) {
                element.id = `${id}-${index}`;
            }
        });
    }

    /** Public method to add a new clock */
    public addClock(): void {
        const newModel = new ClockModel(0);
        this.models.push(newModel);
        const clockElement = this.createClockElement(this.models.length - 1);
        this.container.appendChild(clockElement);
        this.populateTimezoneSelect(this.models.length - 1);
    }

    /** Public method to delete a clock */
    public deleteClock(index: number): void {
        this.models.splice(index, 1);
        this.renderClocks();
    }

    /** Public method to update all clocks */
    public updateClocks(): void {
        this.models.forEach((model, index) => {
            this.updateClockDisplay(index, model);
            this.handleBlinking(model, index);
        });
        this.populateTimezoneSelects();
    }

    /** Updates the display for a specific clock */
    private updateClockDisplay(index: number, model: ClockModel): void {
        const hoursDisplay = document.getElementById(`hours-display-${index}`) as HTMLSpanElement;
        const minutesDisplay = document.getElementById(`minutes-display-${index}`) as HTMLSpanElement;
        const secondsDisplay = document.getElementById(`seconds-display-${index}`) as HTMLSpanElement;
        const timeDisplay = document.getElementById(`time-display-${index}`) as HTMLDivElement;

        if (hoursDisplay && minutesDisplay && secondsDisplay) {
            hoursDisplay.textContent = model.getFormattedHours();
            minutesDisplay.textContent = model.minutes.toString().padStart(2, '0');
            secondsDisplay.textContent = model.seconds.toString().padStart(2, '0');

            const amPmText = model.getAmPm();
            if (amPmText) {
                secondsDisplay.textContent += ` ${amPmText}`;
            }
        }

        if (timeDisplay) {
            timeDisplay.style.backgroundColor = model.isLightOn ? '#FBE106' : '';
            timeDisplay.style.color = model.isLightOn ? 'black' : '';
        }
    }

    /** To handle blinking effect for editable fields: hours or minutes */
    private handleBlinking(model: ClockModel, index: number): void {
        const hoursDisplay = document.getElementById(`hours-display-${index}`) as HTMLSpanElement;
        const minutesDisplay = document.getElementById(`minutes-display-${index}`) as HTMLSpanElement;

        hoursDisplay?.classList.toggle('blinking', model.editable === 'hours');
        minutesDisplay?.classList.toggle('blinking', model.editable === 'minutes');
    }

    /** Populates the timezone select dropdown for all clocks */
    private populateTimezoneSelects(): void {
        this.models.forEach((_, index) => this.populateTimezoneSelect(index));
    }

    /** Populates the timezone select dropdown for a specific clock */
    private populateTimezoneSelect(index: number): void {
        const timezoneSelect = document.getElementById(`timezone-select-${index}`) as HTMLSelectElement;
        if (timezoneSelect) {
            timezoneSelect.innerHTML = ClockView.generateTimeZoneOptions();
            timezoneSelect.value = this.models[index].timezoneOffset.toString();
        }
    }

    /** Static method to generate timezone options */
    static generateTimeZoneOptions(): string {
        return Object.values(TimeZoneOffset)
            .filter(value => typeof value === 'number')
            .map(offset => `<option value="${offset}">${getTimeZoneLabel(offset as TimeZoneOffset)}</option>`)
            .join('');
    }
}
