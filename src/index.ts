import { HomePageView} from "./Views/HomePageView";
import { HomePageController} from "./Controllers/HomePageController";

document.addEventListener('DOMContentLoaded', () => {
    const homepageView = new HomePageView('main-content');
    new HomePageController(homepageView);
});
