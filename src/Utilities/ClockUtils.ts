export function getHourRotation(hours: number, minutes: number): number {
    return (hours % 12) * 30 + (minutes / 60) * 30; // 30 degrees per hour + minute correction
}

export function getMinuteRotation(minutes: number): number {
    return minutes * 6; // 6 degrees per minute
}

export function getSecondRotation(seconds: number): number {
    return seconds * 6; // 6 degrees per second
}
