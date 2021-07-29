const FoodItem = document.querySelector("#SearchItem")
const SearchBtn = document.querySelector("#SearchButton")
const ResultsDiv = document.querySelector(".Results")



SearchBtn.addEventListener('click', ()=>{
    console.log('clicked');

    FetchApi();
})


// asynchronous fetch
async function FetchApi(){
    const SearchItem = FoodItem.value
    console.log(SearchItem);
    let BaseUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${SearchItem}&app_id=fb2b7359&app_key=7ff614ea6be84cc44b122799650f6834&imageSize=SMALL`
    let response = await fetch(BaseUrl)
    let data = await response.json();
    let result  = data.hits
    console.log(result);
    ShowCards(result);
    FoodItem.value = '';
}


function ShowCards(Resources){
    let Output = '';
    Resources.map(Resource =>{

        Output +=
         `
        <div class="food-item">
                <div class="imageHolder">
                    <img src="${Resource.recipe.image}" alt="loading image">
                </div>
                <div class="details">
                        <h2 class="label">Title: <span id="Title">${Resource.recipe.label}</span></h2>
                        <h2 class="label">Dish Type: <span id="Dishtype">${Resource.recipe.dishType}</span></h2>
                        <h2 class="label">Cuisine: <span id="Cuisine">${Resource.recipe.cuisineType}</span></h2>
                        <h2 class="label">Calories: <span id="Calories">${Resource.recipe.calories.toFixed(2)}</span></h2>
                        <h2 class="label">Meal Type: <span id="Data">${Resource.recipe.mealType}</span></h2>
                        <h2 class="label">Diet Labels: <span id="Labels">${Resource.recipe.dietLabels}</span></h2>
                        <button> <a id="link" href="${Resource.recipe.url}" target="_blank">View Recipe </a></button>
                </div>
        </div>
        `
    })

    ResultsDiv.innerHTML = Output;
}