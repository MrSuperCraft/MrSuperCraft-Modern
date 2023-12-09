// navhandle.js

const pageConfigs = {
    'HomePage': {
        refs: [
            './', '#Home', '#AboutMe', '#Discography', '/contact/', '#Stream'
            // Add more refs as needed
        ],
        selector: '.nav', // Adjust the selector based on your HTML structure
    },
    'AboutMePage': {
        refs: [
            '../', '../', '/about-me/', '/discography/', '/contact/', '/stream/'
            // Add more refs as needed
        ],
        selector: '.nav', // Adjust the selector based on your HTML structure
    },
    'DiscographyPage': {
        refs: [
            '../', '../', '/about-me/', '/discography', '/contact' , '/stream/'
            // Add more refs as needed
        ],
        selector: '.nav', // Adjust the selector based on your HTML structure
    },
    'ContactPage': {
        refs: [
            '../', '../', '/about-me/', '/discography/', './', '/stream/'
            // Add more refs as needed
        ],
        selector: '.nav', // Adjust the selector based on your HTML structure
    },
    // Add configurations for other pages
};

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = document.body.dataset.page; // Assuming you set a data attribute on the body element to identify the current page

    const pageConfig = pageConfigs[currentPage];

    if (pageConfig) {
        // Select the navigation element(s) based on the page selector
        const nav = document.querySelectorAll(pageConfig.selector);

        // Loop through each nav element
        nav.forEach(function (navElement) {
            // Get all anchor links inside the current nav element
            const navLinks = navElement.querySelectorAll('a');

            // Loop through each link and update the href attribute
            navLinks.forEach(function (navLink, linkIndex) {
                // Check if the linkIndex exists in the reference data
                if (linkIndex < pageConfig.refs.length) {
                    // Update the href attribute with the corresponding reference value
                    navLink.href = pageConfig.refs[linkIndex];
                }
            });
        });
    }
});