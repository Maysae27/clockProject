"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeZoneOffset = void 0;
exports.getTimeZoneLabel = getTimeZoneLabel;
/**This enum is used to display the list of option for the slect TimeZone Button in the clock*/
var TimeZoneOffset;
(function (TimeZoneOffset) {
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_12"] = -12] = "GMT_MINUS_12";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_11"] = -11] = "GMT_MINUS_11";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_10"] = -10] = "GMT_MINUS_10";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_9"] = -9] = "GMT_MINUS_9";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_8"] = -8] = "GMT_MINUS_8";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_7"] = -7] = "GMT_MINUS_7";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_6"] = -6] = "GMT_MINUS_6";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_5"] = -5] = "GMT_MINUS_5";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_4"] = -4] = "GMT_MINUS_4";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_3"] = -3] = "GMT_MINUS_3";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_2"] = -2] = "GMT_MINUS_2";
    TimeZoneOffset[TimeZoneOffset["GMT_MINUS_1"] = -1] = "GMT_MINUS_1";
    TimeZoneOffset[TimeZoneOffset["GMT"] = 0] = "GMT";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_1"] = 1] = "GMT_PLUS_1";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_2"] = 2] = "GMT_PLUS_2";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_3"] = 3] = "GMT_PLUS_3";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_4"] = 4] = "GMT_PLUS_4";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_5"] = 5] = "GMT_PLUS_5";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_6"] = 6] = "GMT_PLUS_6";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_7"] = 7] = "GMT_PLUS_7";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_8"] = 8] = "GMT_PLUS_8";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_9"] = 9] = "GMT_PLUS_9";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_10"] = 10] = "GMT_PLUS_10";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_11"] = 11] = "GMT_PLUS_11";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_12"] = 12] = "GMT_PLUS_12";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_13"] = 13] = "GMT_PLUS_13";
    TimeZoneOffset[TimeZoneOffset["GMT_PLUS_14"] = 14] = "GMT_PLUS_14";
})(TimeZoneOffset || (exports.TimeZoneOffset = TimeZoneOffset = {}));
// Function to get the label for the time zone offset
function getTimeZoneLabel(offset) {
    return `GMT${offset >= 0 ? `+${offset}` : offset}`;
}
//# sourceMappingURL=TimeZoneOffset.js.map