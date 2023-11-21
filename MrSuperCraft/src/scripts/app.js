document.addEventListener("DOMContentLoaded", function () {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const sunIcon = document.getElementById("theme-toggle-dark-icon");
    const moonIcon = document.getElementById("theme-toggle-light-icon");
  
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    const iconToggle = () => {
      sunIcon.classList.toggle("hidden", !document.documentElement.classList.contains("dark"));
      moonIcon.classList.toggle("hidden", document.documentElement.classList.contains("dark"));
    };
  
    // Initial Theme Check
    const themeCheck = () => {
      if (userTheme === "dark" || (!userTheme && systemTheme)) {
        document.documentElement.classList.add("dark");
      }
      iconToggle(); // Show/hide icons based on the initial theme
    };
  
    // Manual Theme Switch
    const themeSwitch = () => {
      document.documentElement.classList.toggle("dark");
      const newTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      iconToggle();
    };
  
    themeToggleBtn.addEventListener("click", themeSwitch); // Use the button for theme switch
  
    // Invoke themeCheck on initial load
    themeCheck();
  });
  