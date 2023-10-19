class Country {
    constructor (element) {
        this.element = element;
    }

    region() {
        const text = this.element.querySelector(".region");
        const region = text.querySelector("#region").innerText;
        return region;
    }

    name() {
        const name = this.element.querySelector(".countryName").innerText;
        return name;
    }
}

window.onload = () => {
    // get dom elements
    const articles = document.querySelectorAll(".gridItem");
    const selectElement = document.querySelector("#dropdownSelect");

    const searchForm = document.querySelector("#searchForm");
    const input = searchForm.querySelector("#search");
    const button = searchForm.querySelector("button");

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