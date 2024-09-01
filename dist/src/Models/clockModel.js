// model.ts
var ClockModel = /** @class */ (function () {
    function ClockModel() {
        this.mode = 0; // 0 = None, 1 = Editing Hours, 2 = Editing Minutes
        this.isLightOn = false;
        this.currentDate = new Date();
    }
    ClockModel.prototype.getMode = function () {
        return this.mode;
    };
    ClockModel.prototype.setMode = function (newMode) {
        this.mode = newMode;
    };
    ClockModel.prototype.getIsLightOn = function () {
        return this.isLightOn;
    };
    ClockModel.prototype.toggleLight = function () {
        this.isLightOn = !this.isLightOn;
    };
    ClockModel.prototype.getCurrentDate = function () {
        return this.currentDate;
    };
    ClockModel.prototype.setCurrentDate = function (date) {
        this.currentDate = date;
    };
    ClockModel.prototype.increaseHours = function () {
        this.currentDate.setHours((this.currentDate.getHours() + 1) % 24);
    };
    ClockModel.prototype.increaseMinutes = function () {
        this.currentDate.setMinutes((this.currentDate.getMinutes() + 1) % 60);
        if (this.currentDate.getMinutes() === 0) {
            this.currentDate.setHours((this.currentDate.getHours() + 1) % 24);
        }
    };
    return ClockModel;
}());
export { ClockModel };
