document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      var target = document.querySelector(this.getAttribute('href'));

      if (target) {
        event.preventDefault();

        var hash = this.hash;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var startTime = null;

        function animateScroll(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = timestamp - startTime;
          var easing = function (t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          };
          var increment = easing(progress / 800) * distance;

          window.scrollTo(0, startPosition + increment);

          if (progress < 800) {
            requestAnimationFrame(animateScroll);
          } else {
            window.location.hash = hash;
          }
        }

        requestAnimationFrame(animateScroll);
      }
    });
  });
});

