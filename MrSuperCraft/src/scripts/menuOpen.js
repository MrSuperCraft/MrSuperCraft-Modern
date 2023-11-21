document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuBtn = document.getElementById("mobileMenu");
    const menu = document.getElementById("navbar-default");

    if (mobileMenuBtn && menu) {
      mobileMenuBtn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
      });
    }
  });