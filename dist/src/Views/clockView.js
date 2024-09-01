// view.ts
var ClockView = /** @class */ (function () {
    function ClockView(model) {
        this.model = model;
        this.updateClockDisplay();
    }
    ClockView.prototype.getTimeDisplayElement = function () {
        return document.getElementById('time-display');
    };
    ClockView.prototype.updateClockDisplay = function () {
        var timeDisplay = this.getTimeDisplayElement();
        if (timeDisplay) {
            var now = this.model.getCurrentDate();
            var hours = now.getHours().toString().padStart(2, '0');
            var minutes = now.getMinutes().toString().padStart(2, '0');
            var seconds = now.getSeconds().toString().padStart(2, '0');
            // Display time with editable parts highlighted
            var mode = this.model.getMode();
            if (mode === 1) {
                timeDisplay.textContent = "".concat(hours).concat(minutes, ":").concat(seconds);
                timeDisplay.style.color = 'red';
            }
            else if (mode === 2) {
                timeDisplay.textContent = "".concat(hours, ":").concat(minutes).concat(seconds);
                timeDisplay.style.color = 'blue';
            }
            else {
                timeDisplay.textContent = "".concat(hours, ":").concat(minutes, ":").concat(seconds);
                timeDisplay.style.color = this.model.getIsLightOn() ? '#000' : '#0f0'; // Adjust color based on light mode
            }
        }
    };
    ClockView.prototype.setLightMode = function (isLightOn) {
        var body = document.body;
        if (isLightOn) {
            body.classList.add('light-on');
            body.classList.remove('light-off');
        }
        else {
            body.classList.add('light-off');
            body.classList.remove('light-on');
        }
    };
    return ClockView;
}());
export { ClockView };
