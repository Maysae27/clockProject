"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HomePageView_1 = require("./Views/HomePageView");
const HomePageController_1 = require("./Controllers/HomePageController");
document.addEventListener('DOMContentLoaded', () => {
    const homepageView = new HomePageView_1.HomePageView('main-content');
    new HomePageController_1.HomePageController(homepageView);
});
//# sourceMappingURL=index.js.map