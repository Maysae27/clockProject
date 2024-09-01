// controller.ts
var ClockController = /** @class */ (function () {
    function ClockController(model, view) {
        var _this = this;
        var _a, _b, _c;
        this.model = model;
        this.view = view;
        // Set up event listeners
        (_a = document.getElementById('mode-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.handleModeButton(); });
        (_b = document.getElementById('increase-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.handleIncreaseButton(); });
        (_c = document.getElementById('light-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.handleLightButton(); });
        // Update time every second
        setInterval(function () {
            _this.model.setCurrentDate(new Date());
            _this.updateView();
        }, 1000);
        // Initial call to display the time immediately
        this.updateView();
    }
    ClockController.prototype.handleModeButton = function () {
        var newMode = (this.model.getMode() + 1) % 3;
        this.model.setMode(newMode);
        this.updateView();
    };
    ClockController.prototype.handleIncreaseButton = function () {
        if (this.model.getMode() === 1) {
            this.model.increaseHours();
        }
        else if (this.model.getMode() === 2) {
            this.model.increaseMinutes();
        }
        this.updateView();
    };
    ClockController.prototype.handleLightButton = function () {
        this.model.toggleLight();
        this.updateView();
    };
    ClockController.prototype.updateView = function () {
        this.view.updateClockDisplay();
        this.view.setLightMode(this.model.getIsLightOn());
    };
    return ClockController;
}());
export { ClockController };
