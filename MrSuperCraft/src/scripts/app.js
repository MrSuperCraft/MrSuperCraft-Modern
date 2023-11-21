document.addEventListener("DOMContentLoaded", function () {
    const sunIcon = document.getElementById("theme-toggle-dark-icon");
    const moonIcon = document.getElementById("theme-toggle-light-icon");

    let userTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    const iconToggle = () => {
      sunIcon.classList.toggle("hidden", userTheme !== "dark");
      moonIcon.classList.toggle("hidden", userTheme === "dark");
    };

    // Initial Theme Check
    const themeCheck = () => {
      document.documentElement.classList.toggle("dark", userTheme === "dark");
      iconToggle(); // Show/hide icons based on the initial theme
    };

    // Manual Theme Switch
    const themeSwitch = () => {
      userTheme = (userTheme === "dark") ? "light" : "dark";
      localStorage.setItem("theme", userTheme);
      themeCheck();
    };

    sunIcon.addEventListener("click", themeSwitch);
    moonIcon.addEventListener("click", themeSwitch);

    // Invoke themeCheck on initial load
    themeCheck();
  });