"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HomePageview_1 = require("./Views/HomePageview");
const HomePageController_1 = require("./Controllers/HomePageController");
document.addEventListener('DOMContentLoaded', () => {
    const homepageView = new HomePageview_1.HomePageview('main-content');
    new HomePageController_1.HomePageController(homepageView);
});
//# sourceMappingURL=index.js.map