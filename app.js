document.addEventListener("DOMContentLoaded", function(){
    const heroSearch = document.getElementById("heroSearch");
    const searchInput = document.getElementById("searchInput");
    const result = document.getElementById("result");

heroSearch.addEventListener("submit", async function(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    try{
        const params = new URLSearchParams({ query: query });
        const response = await fetch("superheroes.php?" + params.toString());
        const heroes = await response.json();
        result.replaceChildren();

            if (heroes.length === 0) {
                const heading = document.createElement("h2");
                heading.textContent = "RESULT";
                result.appendChild(heading);
                const item = document.createElement("p");
                item.textContent = ("SUPERHERO NOT FOUND");
                item.classList.add("not-found");
                result.appendChild(item);
                return;
            }

        if (query === "") {
            const heading = document.createElement("h2");
            heading.textContent = "RESULT";
            result.appendChild(heading);
            
            const list = document.createElement("ul");

            heroes.forEach(function (hero) {
                const item = document.createElement("li");
                item.textContent = hero.alias;
                list.appendChild(item);
            });

            result.appendChild(list);
            return;
        }

        heroes.forEach(function (hero) {
                const heroDiv = document.createElement("div");

                const alias = document.createElement("h3");
                alias.textContent = hero.alias;

                const name = document.createElement("h4");
                name.textContent = ("A.K.A " + hero.name);

                const biography = document.createElement("p");
                biography.textContent = hero.biography;

                heroDiv.append(alias, name, biography);
                result.appendChild(heroDiv);
            });
        //const heroList = heroes.map(hero => hero.alias).join("\n");
        //alert(heroList);
    }
    
    catch(error){
        alert("Error returning list.");
        console.error(error);
    }
    });
});
