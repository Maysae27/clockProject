import {getTimeZoneLabel, TimeZoneOffset} from "../enums/TimeZoneOffset";

export class DisplayViewUtils {
    /** Utility to safely get an element by its ID */
    public static getElementById<T extends HTMLElement>(id: string): T | null {
        return document.getElementById(id) as T;
    }

    /** Show elements by removing hidden class */
    public static showElement(element: HTMLElement): void {
        element.classList.remove('hidden');
    }

    /** Hide elements by adding hidden class */
    public static hideElement(element: HTMLElement): void {
        element.classList.add('hidden');
    }

    /** Toggle display mode between analog and digital */
    public static toggleDisplayMode(element: HTMLElement, isAnalog: boolean): void {
        if (isAnalog) {
            element.classList.remove('analog-mode');
            element.classList.add('digital-mode');
        } else {
            element.classList.remove('digital-mode');
            element.classList.add('analog-mode');
        }
    }

    /** Set unique IDs for clock elements */
    public static setElementIds(clockElement: HTMLElement, index: number, elementIds: string[]): void {
        elementIds.forEach(id => {
            const element = clockElement.querySelector(`.${id}`) as HTMLElement;
            if (element) {
                element.id = `${id}-${index}`;
            }
        });

        const clockContainer = clockElement.querySelector('.clock-container') as HTMLElement;
        if (clockContainer) {
            clockContainer.id = `clock-${index}`;
        }
    }

    /** Populate timezone select with options */
    public static populateTimezoneSelect(selectElement: HTMLSelectElement, timezoneOffset: number): void {
        selectElement.innerHTML = DisplayViewUtils.generateTimeZoneOptions();
        selectElement.value = timezoneOffset.toString();
    }

    /** Generate timezone options */
    public static generateTimeZoneOptions(): string {
        return Object.values(TimeZoneOffset)
            .filter(value => typeof value === 'number')
            .map(offset => `<option value="${offset}">${getTimeZoneLabel(offset as TimeZoneOffset)}</option>`)
            .join('');
    }
}
