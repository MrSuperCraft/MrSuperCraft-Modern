document.addEventListener("DOMContentLoaded", function () {
    // Simulate image loading time (replace with actual image loading event)
    setTimeout(function () {
      document.querySelector(".hero-background").style.backgroundImage =
        "url('../images/Website3-1200px.png')";
    }, 2000); // Adjust the time delay as needed
  });


  document.addEventListener('DOMContentLoaded', function () {
    var heroSection = document.getElementById('Home');
    var heroBackground = document.querySelector('.hero-background');

    var backgroundImage = new Image();
    backgroundImage.src = heroBackground.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');

    backgroundImage.onload = function () {
      // Image is fully loaded, remove skeleton loader class
      heroBackground.classList.remove('hero-background');
    };
  });