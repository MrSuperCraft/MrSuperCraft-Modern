// Importing jQuery

// Plain JavaScript equivalent of $(document).ready()
document.addEventListener("DOMContentLoaded", function () {
  $("a").on("click", function (event) {
    // Explicitly cast 'this' to HTMLAnchorElement
    var anchor = this;

    // Make sure anchor.hash has a value before overriding default behavior
    if (anchor.hash !== undefined && anchor.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = anchor.hash;

      // Using jQuery's animate() method for smooth page scroll
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    }
  });
});
