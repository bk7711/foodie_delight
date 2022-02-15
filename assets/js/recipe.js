let searchform = document.querySelector("#search")
let submitEl = document.querySelector(".btn")
let recipeContainerEl = document.querySelector(".recipes-container")

//Add an event listener to the button that runs the function sendApiRequest when it is clicked
submitEl.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("button pressed")
    const recipe = searchform.value;
    console.log(recipe);
    sendApiRequest(recipe)
});


//An asynchronous function to fetch data from the API.
async function sendApiRequest(recipe) {
    let APP_ID = "f2d9105a"
    let API_KEY = "7e7ed414fbe548206f56d07e54706bea"
    
//currently you have to change what you want manualy otherwise you cant search anything new
    let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${recipe}`);
    console.log(response)
    let data = await response.json()

    console.log(data)

    useApiData(data)
}


//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with the data
function useApiData(data) {
   
        document.querySelector(".recipes-container").innerHTML = `
    <div class="row">
    <div class="col s6">
      <div class="card">
        <div class="card-image" id = "0">
          <img src="${data.hits[0].recipe.image}">
        </div>
        <div class="card-content">
        <span>${data.hits[0].recipe.label}</span>
        </div>
      </div>
    </div>
  
  
    <div class="col s6">
      <div class="card">
        <div class="card-image" id = "1">
          <img src="${data.hits[3].recipe.image}">
        </div>
        <div class="card-content">
          <span>${data.hits[3].recipe.label}</span>
        </div>
      </div>
    </div>
  
    <div class="col s6">
      <div class="card">
        <div class="card-image" id="2">
          <img src="${data.hits[1].recipe.image}">
        </div>
        <div class="card-content">
          <span>${data.hits[1].recipe.label}</span>
        </div>
      </div>
    </div>
  
    <div class="col s6">
      <div class="card">
        <div class="card-image" id="3">
          <img src="${data.hits[4].recipe.image}">
        </div>
        <div class="card-content">
          <span>${data.hits[4].recipe.label}</span>
        </div>
      </div>
    </div>

    <div class="row">
    <div class="col s6">
      <div class="card">
        <div class="card-image" id = "5">
          <img src="${data.hits[5].recipe.image}">
        </div>
        <div class="card-content">
        <span>${data.hits[5].recipe.label}</span>
        </div>
      </div>
    </div>
  
  
    <div class="col s6">
      <div class="card">
        <div class="card-image" id = "6">
          <img src="${data.hits[6].recipe.image}">
        </div>
        <div class="card-content">
          <span>${data.hits[6].recipe.label}</span>
        </div>
      </div>
    </div>
  
    <div class="col s6">
      <div class="card">
        <div class="card-image" id="7">
          <img src="${data.hits[7].recipe.image}">
        </div>
        <div class="card-content">
          <span>${data.hits[7].recipe.label}</span>
        </div>
      </div>
    </div>
  
    <div class="col s6">
      <div class="card">
        <div class="card-image" id="8">
          <img src="${data.hits[8].recipe.image}">
        </div>
        <div class="card-content">
          <span>${data.hits[8].recipe.label}</span>
        </div>
      </div>
    </div>
  `
}

$(recipeContainerEl).on("click", function(event){
    var targetRecipe = $(event.target).children(".card")
    console.log(targetRecipe);
    $('.modal').modal();
  });