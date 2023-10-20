class Country {
    constructor (element) {
        this.element = element;
    }

    region() {
        const box = this.element.querySelector(".text");
        const div = box.querySelector("div");
        const region = div.querySelector("#region").innerText;
        return region;
    }

    name() {
        const name = this.element.querySelector(".text");
        return name.querySelector(".countryName").innerText;
    }
}

window.onload = () => {
    // get dom elements
    const articles = document.querySelectorAll(".gridItem");
    const selectElement = document.querySelector("#dropdownSelect");

    const searchForm = document.querySelector("#searchForm");
    const input = searchForm.querySelector("#search");

    const countries = Array.from(articles).map((e) => new Country(e));


    // Region Filter
    selectElement.addEventListener('change', () => {
        const value = selectElement.value;
        hide_elemets(value, countries);
    });

    // Search function
    input.addEventListener('keyup', () => {
        const value = input.value;
        hide_elemets_search(value, countries); 
    });

    searchForm.addEventListener("click", function(event){
        event.preventDefault();
    });


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

function isLike(text, pattern) {
  // Escape special characters in the pattern and replace % with .*
  const regexPattern = new RegExp('^' + pattern.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1').replace(/%/g, '.*') + '$');
  return regexPattern.test(text);
};

function isSimilar(name, value) {
    return name.toLowerCase().includes(value.toLowerCase());
};

function hide_elemets(value, countries) {
    switch (value) {
        case "africa":
            countries.forEach(obj => {
                if (isLike(obj.region(), "Africa%")) {
                    obj.element.classList.remove("display-none");
                }
                else {
                    obj.element.classList.add("display-none");
                }
            });
            break;
        case "asia":
            countries.forEach(obj => {
                if (isLike(obj.region(), "Asia%")) {
                    obj.element.classList.remove("display-none");
                }
                else {
                    obj.element.classList.add("display-none");
                }
            });
            break;
        case "america":
            countries.forEach(obj => {
                if (isLike(obj.region(), "America%")) {
                    obj.element.classList.remove("display-none");
                }
                else {
                    obj.element.classList.add("display-none");
                }
            });
            break;
        case "europe":
            countries.forEach(obj => {
                if (isLike(obj.region(), "Europe%")) {
                    obj.element.classList.remove("display-none");
                }
                else {
                    obj.element.classList.add("display-none");
                }
            });
            
            break;
        case "oceania":
            countries.forEach(obj => {
                if (isLike(obj.region(), "Oceania%")) {
                    obj.element.classList.remove("display-none");
                }
                else {
                    obj.element.classList.add("display-none");
                }
            });
            
            break;
        default:
            countries.forEach(obj => obj.element.classList.remove("display-none"));
            break;
    };
};

function hide_elemets_search (value, countries){
    countries.forEach(obj => {
        if (isSimilar(obj.name(), value)) {
            obj.element.classList.remove("display-none");
        }
        else {
            obj.element.classList.add("display-none");
        }
    });
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

