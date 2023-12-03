// updateNavLinks.js

const pageConfigs = {
    'HomePage': {
        refs: [
            { ref0: '#Home', ref1: '#AboutMe', ref2: '#Discography', ref3: '#Releases', ref4: '#Stream' },
            // Add more refs as needed
        ],
        selector: '.nav', // Adjust the selector based on your HTML structure
    },
    'AboutMePage': {
        refs: [
            { ref0: '/', ref1: '/', ref2: '/about-me/', ref3: '/discography/', ref4: '/releases/' },
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
        nav.forEach(function (navElement, navIndex) {
            // Get the corresponding reference data
            const refData = pageConfig.refs[navIndex];

            // Check if reference data exists
            if (refData) {
                // Get all anchor links inside the current nav element
                const navLinks = navElement.querySelectorAll('a');

                // Loop through each link and update the href attribute
                navLinks.forEach(function (navLink, linkIndex) {
                    // Get the corresponding reference key (ref0, ref1, ...)
                    const refKey = 'ref' + linkIndex;

                    // Check if the refKey exists in the reference data
                    if (refKey in refData) {
                        // Update the href attribute with the corresponding reference value
                        navLink.href = refData[refKey];
                    }
                });
            }
        });
    }
});