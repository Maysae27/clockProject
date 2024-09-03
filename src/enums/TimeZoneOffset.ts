/**This enum is used to display the list of option for the slect TimeZone Button in the clock*/
export enum TimeZoneOffset {
    GMT_MINUS_12 = -12,
    GMT_MINUS_11 = -11,
    GMT_MINUS_10 = -10,
    GMT_MINUS_9 = -9,
    GMT_MINUS_8 = -8,
    GMT_MINUS_7 = -7,
    GMT_MINUS_6 = -6,
    GMT_MINUS_5 = -5,
    GMT_MINUS_4 = -4,
    GMT_MINUS_3 = -3,
    GMT_MINUS_2 = -2,
    GMT_MINUS_1 = -1,
    GMT = 0,
    GMT_PLUS_1 = 1,
    GMT_PLUS_2 = 2,
    GMT_PLUS_3 = 3,
    GMT_PLUS_4 = 4,
    GMT_PLUS_5 = 5,
    GMT_PLUS_6 = 6,
    GMT_PLUS_7 = 7,
    GMT_PLUS_8 = 8,
    GMT_PLUS_9 = 9,
    GMT_PLUS_10 = 10,
    GMT_PLUS_11 = 11,
    GMT_PLUS_12 = 12,
    GMT_PLUS_13 = 13,
    GMT_PLUS_14 = 14
}

// Function to get the label for the time zone offset
export function getTimeZoneLabel(offset: TimeZoneOffset): string {
    return `GMT${offset >= 0 ? `+${offset}` : offset}`;
}
