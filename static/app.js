class Country {
    constructor (element) {
        this.element = element;
    }

    region() {
        return this.element.querySelector(".region").value;
    }
}

window.onload = () => {
    const display = "block";

    // get dom elements
    const articles = document.querySelectorAll(".gridItem");
    const selectElement = document.querySelector("#dropdownSelect");

    const countries = Array.from(articles).map((e) => new Country(e));

    // console.log(countries);

    selectElement.addEventListener('change', () => {
        const value = selectElement.value;
        console.log(articles[0]);

        // hide_elemets(value, articles);

        
    });
};

function hide_elemets(value, articles) {
    switch (value) {
        case "africa":
            
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
            break;
    };
}