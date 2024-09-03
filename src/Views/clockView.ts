import { ClockModel } from "../Models/clockModel";

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

        this.renderClocks();
        this.startClockUpdates(); // Start the clock updates
        this.setupTimezoneSelect(); // Set up timezone selection
    }

    private setupTimezoneSelect(): void {
        const timezoneSelect = document.getElementById('timezone-select') as HTMLSelectElement;
        if (timezoneSelect) {
            timezoneSelect.onchange = () => {
                const offset = parseInt(timezoneSelect.value, 10);
                this.models.forEach(model => model.setTimezoneOffset(offset));
                this.updateClocks(); // Refresh the view with the new timezone
            };
        }
    }

    private startClockUpdates(): void {
        setInterval(() => {
            this.models.forEach(model => model.advanceTime()); // Update the time in each model
            this.updateClocks(); // Refresh the view
        }, 1000); // Update every second
    }

    private renderClocks(): void {
        this.container.innerHTML = ''; // Clear existing clocks
        this.models.forEach((_, index) => {
            const clockElement = this.createClockElement(index);
            this.container.appendChild(clockElement);
        });
        this.updateClocks();
    }


    private createClockElement(index: number): HTMLElement {
        const clockElement = this.template.content.cloneNode(true) as HTMLElement;

        // Add unique IDs to elements to avoid conflicts
        const timeDisplay = clockElement.querySelector('.time-display') as HTMLElement;
        timeDisplay.id = `time-display-${index}`;

        const timezoneSelect = clockElement.querySelector('.timezone-select') as HTMLSelectElement;
        timezoneSelect.id = `timezone-select-${index}`;

        const hoursDisplay = clockElement.querySelector('.hours-display') as HTMLSpanElement;
        hoursDisplay.id = `hours-display-${index}`;

        const minutesDisplay = clockElement.querySelector('.minutes-display') as HTMLSpanElement;
        minutesDisplay.id = `minutes-display-${index}`;

        const secondsDisplay = clockElement.querySelector('.seconds-display') as HTMLSpanElement;
        secondsDisplay.id = `seconds-display-${index}`;

        const modeButton = clockElement.querySelector('.mode-button') as HTMLButtonElement;
        modeButton.id = `mode-button-${index}`;

        const increaseButton = clockElement.querySelector('.increase-button') as HTMLButtonElement;
        increaseButton.id = `increase-button-${index}`;

        const lightButton = clockElement.querySelector('.light-button') as HTMLButtonElement;
        lightButton.id = `light-button-${index}`;

        const deleteButton = clockElement.querySelector('.delete-button') as HTMLButtonElement;
        deleteButton.id = `delete-button-${index}`;

        const formatButton = clockElement.querySelector('.format-button') as HTMLButtonElement;
        formatButton.id = `format-button-${index}`;

        const resetButton = clockElement.querySelector('.reset-button') as HTMLButtonElement;
        resetButton.id = `reset-button-${index}`;


        return clockElement;
    }

    public addClock(): void {
        const defaultTimezoneOffset = 0; // Default
        const newModel = new ClockModel(defaultTimezoneOffset);
        this.models.push(newModel);
        const newClockElement = this.createClockElement(this.models.length - 1);
        this.container.appendChild(newClockElement);
    }


    deleteClock(index: number): void {
        this.models.splice(index, 1);
        this.renderClocks(); // Re-render all clocks
    }

    public increaseTime(index: number): void {
        if (this.models[index].editable === 'hours') {
            this.models[index].increaseHours();
        } else if (this.models[index].editable === 'minutes') {
            this.models[index].increaseMinutes();
        }
        this.updateClocks();
    }

    public updateClocks(): void {
        console.log('updating... Clocks coco')
        this.models.forEach((model, index) => {
            console.log("updating clock: ", index)
            const hoursDisplay = document.getElementById(`hours-display-${index}`) as HTMLSpanElement;
            const minutesDisplay = document.getElementById(`minutes-display-${index}`) as HTMLSpanElement;
            const secondsDisplay = document.getElementById(`seconds-display-${index}`) as HTMLSpanElement;

            if (hoursDisplay && minutesDisplay && secondsDisplay) {
                hoursDisplay.textContent = model.getFormattedHours();
                minutesDisplay.textContent = model.minutes.toString().padStart(2, '0');
                secondsDisplay.textContent = model.seconds.toString().padStart(2, '0');

                const amPmText = model.getAmPm();
                if (amPmText) {
                    secondsDisplay.textContent += ` ${amPmText}`;
                }
            }

            const timeDisplay = document.getElementById(`time-display-${index}`) as HTMLDivElement;
            if (timeDisplay) {
                timeDisplay.style.backgroundColor = model.isLightOn ? '#FBE106' : '';
                timeDisplay.style.color = model.isLightOn ? 'black' : '';
            }

            this.handleBlinking(model, index);
        });
    }



    private handleBlinking(model: ClockModel, index: number): void {
        const hoursDisplay = document.getElementById(`hours-display-${index}`) as HTMLSpanElement;
        const minutesDisplay = document.getElementById(`minutes-display-${index}`) as HTMLSpanElement;

        if (hoursDisplay) {
            hoursDisplay.classList.remove('blinking');
        }
        if (minutesDisplay) {
            minutesDisplay.classList.remove('blinking');
        }

        if (model.editable === 'hours') {
            if (hoursDisplay) {
                hoursDisplay.classList.add('blinking');
            }
        } else if (model.editable === 'minutes') {
            if (minutesDisplay) {
                minutesDisplay.classList.add('blinking');
            }
        }
    }
}
