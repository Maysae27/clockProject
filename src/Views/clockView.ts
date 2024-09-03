import {ClockModel} from "../Models/clockModel";
import { TimeZoneOffset, getTimeZoneLabel } from '../enums/TimeZoneOffset'
import { ClockElementId, getClockElementIds } from '../enums/ClockElementId'

export class ClockView {
    private models: ClockModel[];
    private container: HTMLElement;
    private template: HTMLTemplateElement;

    constructor(models: ClockModel[], containerId: string) {
        this.models = models;
        this.container = document.getElementById(containerId) as HTMLElement;
        this.template = document.getElementById('clock-template') as HTMLTemplateElement;

        if (!this.template) {
            throw new Error("Clock template not found!");
        }

        this.initialize();
    }

    /** Initializes the view by rendering clocks and starting clock updates */
    private initialize(): void {
        this.renderClocks();
        this.startClockUpdates();
        this.setupTimezoneSelect();
    }

    private populateTimezoneSelects(): void {
        this.models.forEach((model, index) => {
            const timezoneSelect = document.getElementById(`timezone-select-${index}`) as HTMLSelectElement;
            if (timezoneSelect) {
                timezoneSelect.innerHTML = ClockView.generateTimeZoneOptions();
                timezoneSelect.value = model.timezoneOffset.toString();
            }
        });
    }

    /**To dynamically load the select options for the TimeZone*/
    static generateTimeZoneOptions(): string {
        return Object.values(TimeZoneOffset)
            .filter(value => typeof value === 'number')
            .map(offset => {
                return `<option value="${offset}">${getTimeZoneLabel(offset as TimeZoneOffset)}</option>`;
            }).join('');
    }

    /** Sets up the time zone dropdowns for each clock */
    private setupTimezoneSelect(): void {
        const timezoneSelects = document.querySelectorAll('.timezone-select');

        timezoneSelects.forEach(select => {
            (select as HTMLSelectElement).innerHTML = ClockView.generateTimeZoneOptions();
        });

        const timezoneSelect = document.getElementById('timezone-select') as HTMLSelectElement;
        if (timezoneSelect) {
            timezoneSelect.innerHTML = ClockView.generateTimeZoneOptions();
            timezoneSelect.addEventListener('change', () => {
                const offset = parseInt(timezoneSelect.value, 10);
                this.models.forEach(model => model.setTimezoneOffset(offset));
                this.updateClocks();
            });
        }
    }

    /** Starts the interval to update clocks every second */
    private startClockUpdates(): void {
        setInterval(() => {
            this.models.forEach(model => model.advanceTime());
            this.updateClocks();
        }, 1000);
    }

    private renderClocks(): void {
        this.container.innerHTML = '';
        this.models.forEach((_, index) => {
            this.container.appendChild(this.createClockElement(index));
        });
        this.updateClocks();
    }

    /** Creating a clock  using teh template */
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



    public addClock(): void {
        const newModel = new ClockModel(0);
        this.models.push(newModel);
        this.container.appendChild(this.createClockElement(this.models.length - 1));
        // Populate the new select element with time zone options
        this.populateTimezoneSelects();
    }


    public deleteClock(index: number): void {
        this.models.splice(index, 1);
        this.renderClocks();
    }

    public increaseTime(index: number): void {
        const model = this.models[index];
        if (model.editable === 'hours') {
            model.increaseHours();
        } else if (model.editable === 'minutes') {
            model.increaseMinutes();
        }
        this.updateClocks();
    }

    public updateClocks(): void {
        this.models.forEach((model, index) => {
            this.updateClockDisplay(index, model);
            this.handleBlinking(model, index);
        });
        this.populateTimezoneSelects();
    }

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

    /**Handling blinking when either hoursor minutes go in editable mode*/
    private handleBlinking(model: ClockModel, index: number): void {
        const hoursDisplay = document.getElementById(`hours-display-${index}`) as HTMLSpanElement;
        const minutesDisplay = document.getElementById(`minutes-display-${index}`) as HTMLSpanElement;

        hoursDisplay?.classList.toggle('blinking', model.editable === 'hours');
        minutesDisplay?.classList.toggle('blinking', model.editable === 'minutes');
    }
}
