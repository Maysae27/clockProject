export class HomePageview {
    private containerId: string;

    constructor(containerId: string) {
        this.containerId = containerId;
    }

    public loadHomepageTemplate(): Promise<void> {
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
                } else {
                    throw new Error('Main content container not found!');
                }
            })
            .catch(error => {
                console.error('Error loading homepage template:', error);
                throw error;
            });
    }
}
