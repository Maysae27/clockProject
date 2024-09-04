"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePageView = void 0;
class HomePageView {
    constructor(containerId) {
        this.containerId = containerId;
    }
    loadHomepageTemplate() {
        console.log('Fetching homepage template...');
        return fetch('templates/homepage.html')
            .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
            .then(html => {
            const mainContent = document.getElementById(this.containerId);
            if (mainContent) {
                mainContent.innerHTML = html;
                console.log('Homepage content loaded successfully.');
            }
            else {
                throw new Error('Main content container not found!');
            }
        })
            .catch(error => {
            console.error('Error loading homepage template:', error);
            throw error;
        });
    }
}
exports.HomePageView = HomePageView;
//# sourceMappingURL=HomePageView.js.map