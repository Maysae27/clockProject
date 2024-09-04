"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHourRotation = getHourRotation;
exports.getMinuteRotation = getMinuteRotation;
exports.getSecondRotation = getSecondRotation;
function getHourRotation(hours, minutes) {
    return (hours % 12) * 30 + (minutes / 60) * 30; // 30 degrees per hour + minute correction
}
function getMinuteRotation(minutes) {
    return minutes * 6; // 6 degrees per minute
}
function getSecondRotation(seconds) {
    return seconds * 6; // 6 degrees per second
}
//# sourceMappingURL=ClockUtils.js.map