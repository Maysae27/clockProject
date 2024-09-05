```mermaid
classDiagram
    class ClockModel {
        +hours: number
        +minutes: number
        +seconds: number
        +editable: 'hours' | 'minutes' | 'none'
        +isLightOn: boolean
        +editCycleCount: number
        +isEditing: boolean
        +is24HourFormat: boolean
        +timezoneOffset: number
        +isAnalog: boolean
        +constructor(timezoneOffset: number = 0)
        +setTimezoneOffset(offset: number): void
        +finalizeEdit(): void
        +cycleEditable(): void
        +advanceTime(): void
        +resetTime(): void
        +increaseHours(): void
        +increaseMinutes(): void
        +increaseSeconds(): void
        +toggleLight(): void
        +toggleFormat(): void
        +toggleDisplayMode(): void
        +getAmPm(): string
        +getFormattedHours(): string
    }

    class ClockView {
        +models: ClockModel[]
        +container: HTMLElement
        +template: HTMLTemplateElement
        +constructor(models: ClockModel[], containerId: string)
        +renderClocks(): void
        +updateClocks(): void
        +addClock(): void
        +deleteClock(index: number): void
        +toggleDisplayMode(index: number): void
    }

    class ClockController {
        +models: ClockModel[]
        +view: ClockView
        +constructor(models: ClockModel[], view: ClockView)
        +setupGlobalEventListeners(): void
        +setupAllClocks(): void
        +setupClock(index: number): void
        +setupAddButtonListener(): void
        +addClock(): void
        +setupButtonListeners(index: number): void
        +setupButtonListener(buttonId: string, handler: () => void): void
        +setupTimezoneSelect(index: number): void
        +toggleLight(index: number): void
        +cycleEditable(index: number): void
        +increaseTime(index: number): void
        +deleteClock(index: number): void
        +toggleFormat(index: number): void
        +resetTime(index: number): void
        +toggleDisplayMode(index: number): void
    }

    class HomePageView {
        +constructor(containerId: string)
        +loadHomepageTemplate(): Promise<void>
    }

    class HomePageController {
        +homepageView: HomePageView
        +clockView: ClockView | undefined
        +clockController: ClockController | undefined
        +constructor(homepageView: HomePageView)
        +initialize(): void
    }

    class Matrix3x3 {
        +matrix: number[][]
        +constructor(values: number[][])
        +multiply(other: Matrix3x3): Matrix3x3
        +invert(): Matrix3x3 | null
        +transformPoint(x: number, y: number): [number, number]
    }

    class DisplayViewUtils {
        +getElementById<T extends HTMLElement>(id: string): T | null
        +showElement(element: HTMLElement): void
        +hideElement(element: HTMLElement): void
        +toggleDisplayMode(element: HTMLElement, isAnalog: boolean): void
        +setElementIds(clockElement: HTMLElement, index: number, elementIds: string[]): void
        +populateTimezoneSelect(selectElement: HTMLSelectElement, timezoneOffset: number): void
        +generateTimeZoneOptions(): string
    }

    
    ClockModel --> "1" ClockView : manages
    ClockView --> "1" ClockController : uses
    ClockController --> "1" ClockModel : manipulates
    ClockView --> "1" Matrix3x3 : uses
    ClockView --> "1" DisplayViewUtils : uses
    HomePageController --> "1" HomePageView : manages
    HomePageController --> "1" ClockController : uses
    HomePageController --> "1" ClockView : initializes
