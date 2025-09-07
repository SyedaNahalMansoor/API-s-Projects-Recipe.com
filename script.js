let allRecipe = [];
let getData = () => {
    fetch("https://dummyjson.com/recipes")
    .then ((res) => res.json())
    .then (res => {
        allRecipe = res.recipes;
        cardRecipe(allRecipe)
    });
};

let container = document.getElementById("container");


let cardRecipe = (recipe) => {
    container.innerHTML = "";
    recipe.forEach((recipes , index ) => {
        console.log(recipes)
        let {name , instructions , image} = recipes;
        let instructionText = instructions.join("")
        container.innerHTML +=`
        <div class="card mt-3 mb-5"  style="width: 350px;" id="my-card">
            <img src="${image}" class="card-img-top" id="card-img" alt="...">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${instructionText.slice(0,100)}.....</p>
              <a  href="#" class="buttons btn btn-primary" data-bs-toggle="modal" data-bs-target="#recipeModal" onclick="details(${index})">Show More.....</a>
            </div>
        </div>`
    }); 

};
getData()

let searchBar = document.getElementById("input");

let searchBtn = () => {
    console.log(searchBar.value);
    let searchRecipes = searchBar.value.toLowerCase();
    let filterRecipes = allRecipe.filter((recipes) => {
        let {name , tags , mealType , cuisine} = recipes
        return name.toLowerCase().includes(searchRecipes) || 
        (tags && tags.some(tag => tag.toLowerCase().includes(searchRecipes))) ||
        (mealType && mealType.some(mealType => mealType.toLowerCase().includes(searchRecipes))) ||
        (cuisine && cuisine.toLowerCase().includes(searchRecipes))

    });
    searchBar.value = "";
    if (filterRecipes.length > 0) {
        cardRecipe(filterRecipes);
    } else {
        container.innerHTML = `
            <h2 style="text-align:center; margin-top: 250px; color:red;">
                🚫 Sorry No recipe found for ${searchRecipes};
            </h2>`;
    };
};

searchBar.addEventListener ("keypress" , (e) => {
    if (e.key === "Enter") {
        searchBtn()
    };
});

let dropDown = document.querySelectorAll(".dropDownItems");
let navbarDropdown = document.getElementById("navbarDropdown");


dropDown.forEach((item) => {
    item.addEventListener ("click" , (e) => {
        e.preventDefault();
        console.log(item.textContent);
        navbarDropdown.textContent = item.textContent;
        let selectedDropDown = item.textContent.toLowerCase();
        let filterRecipes;
            if (selectedDropDown.toLowerCase() === "All Recipes".toLowerCase()) {
                filterRecipes = allRecipe;
            } else {
                filterRecipes = allRecipe.filter((recipes) => {
                let {tags} = recipes;
                return (tags && tags.some(tag => tag.toLowerCase().includes(selectedDropDown)));
                });
            };
        
        cardRecipe(filterRecipes);
    });
});

function details(index) {
    let recipes = allRecipe[index]; 
    let {name , image , instructions , ingredients , servings , cuisine , rating} = recipes

  document.getElementById("modalTitle").innerHTML = `${name}`;
  document.getElementById("modalImage").src = image;
  document.getElementById("modalInstructions").innerHTML = `<h5 class="mdl-heading">📖 Instructions: </h5> ${instructions.join(" ")}`
  document.getElementById("modalIngrediants").innerHTML = `<h5 class="mdl-heading">🥗 Ingrediants:</h5> ${ingredients.join(" , ")}`
  document.getElementById("modalServing").innerHTML = `<h5 class="mdl-heading">🍽 Serving:</h5> ${servings} Persons`;
  document.getElementById("modalCuisine").innerHTML = `<h5 class="mdl-heading">🌍 Cuisine:</h5> ${cuisine}`;
  document.getElementById("modalRating").innerHTML = `<h5 class="mdl-heading">⭐ Rating:</h5> ${rating}`;
};