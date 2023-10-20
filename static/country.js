window.onload = () => {
    // Dark - light theme: 
    const htmlTag = document.querySelector("html");
    const themeToggle = document.getElementById("theme-toggle");

    themeToggle.addEventListener("click", function () {
    if (htmlTag.style.colorScheme === "light") {
        htmlTag.style.colorScheme = "dark";
        // change icon from the button TODO!
        themeToggle.querySelector('i').classList.remove("fa-solid");
        themeToggle.querySelector('i').classList.add("fa-regular");
    } else {
        htmlTag.style.colorScheme = "light";
        themeToggle.querySelector('i').classList.add("fa-solid");
        themeToggle.querySelector('i').classList.remove("fa-regular");
    }
    });

    // Initial theme setup
    toggleTheme();

    // Add an event listener to listen for changes in system preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', toggleTheme);

};

function toggleTheme() {
  const htmlTag = document.documentElement;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlTag.style.setProperty('--clr-bg', 'var(--clr-bg-dark)');
    htmlTag.style.setProperty('--clr-el', 'var(--clr-el-dark)');
    htmlTag.style.setProperty('--clr-txt', 'var(--clr-txt-dark)');
    htmlTag.style.setProperty('--clr-inp', 'var(--clr-inp-dark)');
  } else {
    htmlTag.style.setProperty('--clr-bg', 'var(--clr-bg-light)');
    htmlTag.style.setProperty('--clr-el', 'var(--clr-el-light)');
    htmlTag.style.setProperty('--clr-txt', 'var(--clr-txt-light)');
    htmlTag.style.setProperty('--clr-inp', 'var(--clr-inp-light)');
  }
}

