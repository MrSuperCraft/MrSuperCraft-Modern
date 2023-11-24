document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.getElementById("slides");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const imageSources = ["../images/coverart/Lost In Thoughts-.jpg", "../images/coverart/Star Chaser.jpg", "../images/coverart/I Once Knew-.jpg"];
  let counter = 0;

  function showSlides() {
    slidesContainer.style.transform = `translateX(-${counter * 100}%)`;
  }

  function slideNext() {
    counter = (counter + 1) % imageSources.length;
    showSlides();
  }

  function slidePrev() {
    counter = (counter - 1 + imageSources.length) % imageSources.length;
    showSlides();
  }

  function autoSlide() {
    slideNext();
  }

  // Initial slide display
  showSlides();

  // Automatic slide every 5 seconds
  setInterval(autoSlide, 5000);

  // Manual navigation
  const controls = document.querySelectorAll("#controls label");
  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      counter = index;
      showSlides();
    });
  });

  // Manual arrow navigation
  nextBtn.addEventListener("click", slideNext);
  prevBtn.addEventListener("click", slidePrev);
});



document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const labels = document.querySelectorAll('[id^="labelSlide"]'); // Select all labels starting with "labelSlide"
  let currentSlideIndex = 1; // Initial active slide index

  function updateActiveButton(index) {
    // Remove active class from all buttons
    labels.forEach(label => {
      label.classList.remove("active-btn");
    });

    // Add active class to the button related to the active slide
    labels[index - 1].classList.add("active-btn");
  }

  // Example: Add event listeners to update active button on manual navigation
  prevBtn.addEventListener("click", function () {
    currentSlideIndex = (currentSlideIndex - 1 + labels.length) % labels.length + 1;
    // Your existing code for navigating to the previous slide
    updateActiveButton(currentSlideIndex);
  });

  nextBtn.addEventListener("click", function () {
    currentSlideIndex = (currentSlideIndex % labels.length) + 1;
    // Your existing code for navigating to the next slide
    updateActiveButton(currentSlideIndex);
  });

  // Example: Add event listener for automatic slide change
  setInterval(function () {
    currentSlideIndex = (currentSlideIndex % labels.length) + 1;
    // Your existing code for automatic slide change
    updateActiveButton(currentSlideIndex);
  }, 5000);
});

//   const imageSources = ["../images/coverart/Lost In Thoughts-.jpg", "../images/coverart/Star Chaser.jpg", "../images/coverart/I Once Knew-.jpg"]; // Add your image sources here