```mermaid
classDiagram
    class ClockModel {
        +int hours
        +int minutes
        +int seconds
        +string editable
        +bool isLightOn
        +int editCycleCount
        +bool isEditing
        +int? alarmHours
        +int? alarmMinutes
        +cycleEditable()
        +increaseHours()
        +increaseMinutes()
        +increaseSeconds()
        +toggleLight()
        +advanceTime()
        +setAlarm(hours: int, minutes: int)
        +checkAlarm() bool
    }

    class ClockView {
        -ClockModel model
        -int~blinkIntervalId~
        +ClockView(model: ClockModel)
        +updateDisplay()
        +increaseTime()
        -updateTimeDisplay()
        -updateLightMode()
        -handleBlinking()
    }

    class ClockController {
        -ClockModel model
        -ClockView view
        +ClockController(model: ClockModel, view: ClockView)
        -setupEventListeners()
        -lightButtonEventListener()
        -modeButtonEventListener()
        -increaseButtonEventListener()
        -handleLightButtonClick()
        -handleModeButtonClick()
        -handleIncreaseButtonClick()
    }

    ClockModel --> ClockView : "observes"
    ClockView --> ClockController : "updates"
    ClockController --> ClockModel : "manipulates"
    ClockController --> ClockView : "manipulates"
