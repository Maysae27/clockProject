import { HomePageview} from "../Views/HomePageview";
import { ClockView} from "../Views/clockView";
import { ClockModel} from "../Models/clockModel";
import { ClockController} from "./clockController";

export class HomePageController {
    private homepageView: HomePageview;
    private clockView: ClockView | undefined;
    private clockController: ClockController | undefined;

    constructor(homepageView: HomePageview) {
        this.homepageView = homepageView;
        this.initialize();
    }

    private initialize(): void {
        this.homepageView.loadHomepageTemplate()
            .then(() => {
                const models = [new ClockModel(0)];
                this.clockView = new ClockView(models, 'clock-container');
                this.clockController = new ClockController(models, this.clockView);
                console.log('Homepage loaded and ClockView initialized.');
            })
            .catch((error) => {
                console.error('Failed to load homepage template:', error);
            });
    }
}
