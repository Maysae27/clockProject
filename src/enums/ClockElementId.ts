/**This enum is used to define Ids for the clock elements*/
export enum ClockElementId {
    TimeDisplay = 'time-display',
    TimezoneSelect = 'timezone-select',
    HoursDisplay = 'hours-display',
    MinutesDisplay = 'minutes-display',
    SecondsDisplay = 'seconds-display',
    ModeButton = 'mode-button',
    IncreaseButton = 'increase-button',
    LightButton = 'light-button',
    DeleteButton = 'delete-button',
    FormatButton = 'format-button',
    ResetButton = 'reset-button',
    DisplayModeButton = 'display-mode-button'
}

// Function to get all enum values as an array
export const getClockElementIds = (): string[] => {
    return Object.values(ClockElementId);
};