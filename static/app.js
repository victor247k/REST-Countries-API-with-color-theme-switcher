class Country {
    constructor (element) {
        this.element = element;
    }

    region() {
        return this.element.querySelector(".region").value;
    }
}

window.onload = () => {
    // get dom elements
    const articles = document.querySelectorAll(".gridItem");
    const selectElement = document.querySelector("#dropdownSelect");

    const countries = Array.from(articles).map((e) => new Country(e));


    selectElement.addEventListener('change', () => {
        const value = selectElement.value;
        hide_elemets(value, countries);

        
    });
};

function isLike(text, pattern) {
  // Escape special characters in the pattern and replace % with .*
  const regexPattern = new RegExp('^' + pattern.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1').replace(/%/g, '.*') + '$');
  return regexPattern.test(text);
};

function hide_elemets(value, countries) {
    switch (value) {
        case "africa":
            countries.forEach(obj => {
                if (isLike(obj.region(), "%africa%")) {
                    obj.element.classList.add("display-none");
                }
                else {
                    obj.element.classList.remove("display-none");
                }
            });
            break;
        case "asia":
            
            break;
        case "america":
            
            break;
        case "europe":
            
            break;
        case "oceania":
            
            break;
        default:
            countries.forEach(obj => obj.element.classList.remove("display-none"));
            break;
    };
};

