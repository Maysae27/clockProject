import { HomePageview} from "./Views/HomePageview";
import { HomePageController} from "./Controllers/HomePageController";

document.addEventListener('DOMContentLoaded', () => {
    const homepageView = new HomePageview('main-content');
    new HomePageController(homepageView);
});
