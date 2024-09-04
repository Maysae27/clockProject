```mermaid
classDiagram
    %% Model
    class ClockModel {
        +int hours
        +int minutes
        +int seconds
        +string editable
        +bool isLightOn
        +int editCycleCount
        +bool isEditing
        +bool is24HourFormat
        +int timezoneOffset
        +constructor(timezoneOffset: number)
        +void setTimezoneOffset(offset: number)
        +void finalizeEdit()
        +void cycleEditable()
        +void advanceTime()
        +void resetTime()
        +void increaseHours()
        +void increaseMinutes()
        +void increaseSeconds()
        +void toggleLight()
        +void toggleFormat()
        +string getAmPm()
        +string getFormattedHours()
        -void updateTime(date: Date)
    }

    %% View
    class ClockView {
        -ClockModel[] models
        -HTMLElement container
        -HTMLTemplateElement template
        +constructor(models: ClockModel[], containerId: string)
        +void addClock()
        +void deleteClock(index: number)
        +void updateClocks()
        -void startClockUpdates()
        -HTMLTemplateElement getTemplateElement(templateId: string)
        -void renderClocks()
        -HTMLElement createClockElement(index: number)
        -void setElementIds(clockElement: HTMLElement, index: number)
        -void updateClockDisplay(index: number, model: ClockModel)
        -void handleBlinking(model: ClockModel, index: number)
        -void populateTimezoneSelects()
        -void populateTimezoneSelect(index: number)
        +static string generateTimeZoneOptions()
    }

    %% Controller
    class ClockController {
        -ClockModel[] models
        -ClockView view
        +constructor(models: ClockModel[], view: ClockView)
        -void setupGlobalEventListeners()
        -void setupClock(index: number)
        -void setupTimezoneSelect(index: number)
        -void setupButtonListeners(index: number)
        +void addClock()
        -void toggleLight(index: number)
        -void cycleEditable(index: number)
        +void increaseTime(index: number)
        -void deleteClock(index: number)
        -void toggleFormat(index: number)
        -void resetTime(index: number)
    }

    %% HomePage View
    class HomePageView {
        -string containerId
        +constructor(containerId: string)
        +Promise<void> loadHomepageTemplate()
    }

    %% HomePage Controller
    class HomePageController {
        -HomePageView homepageView
        -ClockView clockView
        -ClockController clockController
        +constructor(homepageView: HomePageView)
        -void initialize()
    }

    %% Relationships
    ClockController --> ClockModel : uses
    ClockController --> ClockView : manages
    ClockView --> ClockModel : displays
    HomePageController --> HomePageView : uses
    HomePageController --> ClockView : initializes
    HomePageController --> ClockController : initializes
