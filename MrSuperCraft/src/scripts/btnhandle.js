import { releases } from "../scripts/songs";


// Get all elements with class "swiper-slide"

const swiperSlides = document.querySelectorAll('.swiper-slide');

// Loop through each swiper slide
    swiperSlides.forEach(function (slide, index) {
        // Get the corresponding release data
    const releaseData = releases[index];

        // Update the href attributes based on the links array
    releaseData.links.forEach(function (link, linkIndex) {
        const releaseLink = slide.querySelectorAll('a')[linkIndex];
        if (releaseLink) {
            releaseLink.href = link;
            releaseLink.target = "_blank";
        }
    });
});
