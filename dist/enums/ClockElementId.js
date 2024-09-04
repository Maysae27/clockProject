"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClockElementIds = exports.ClockElementId = void 0;
/**This enum is used to define Ids for the clock elements*/
var ClockElementId;
(function (ClockElementId) {
    ClockElementId["TimeDisplay"] = "time-display";
    ClockElementId["TimezoneSelect"] = "timezone-select";
    ClockElementId["HoursDisplay"] = "hours-display";
    ClockElementId["MinutesDisplay"] = "minutes-display";
    ClockElementId["SecondsDisplay"] = "seconds-display";
    ClockElementId["ModeButton"] = "mode-button";
    ClockElementId["IncreaseButton"] = "increase-button";
    ClockElementId["LightButton"] = "light-button";
    ClockElementId["DeleteButton"] = "delete-button";
    ClockElementId["FormatButton"] = "format-button";
    ClockElementId["ResetButton"] = "reset-button";
})(ClockElementId || (exports.ClockElementId = ClockElementId = {}));
// Function to get all enum values as an array
const getClockElementIds = () => {
    return Object.values(ClockElementId);
};
exports.getClockElementIds = getClockElementIds;
//# sourceMappingURL=ClockElementId.js.map