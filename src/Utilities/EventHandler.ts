// src/Utilities/EventHandler.ts
export class EventHandler {
    static addClickListener(elementId: string, handler: () => void): void {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('click', handler);
        }
    }

    static addChangeListener(elementId: string, handler: (event: Event) => void): void {
        const element = document.getElementById(elementId) as HTMLSelectElement;
        if (element) {
            element.addEventListener('change', handler);
        }
    }
}
