let searchform = document.querySelector("#search")
let submitEl = document.querySelector(".btn")
let recipeContainerEl = document.querySelector(".recipes-container")

//Add an event listener to the button that runs the function sendApiRequest when it is clicked

submitEl.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("button pressed")
    const recipe = searchform.value;
    $("#searched").textContent = recipe
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
    
    console.log(data);
    for(var i = 0; i<data.hits.length; i++){
        //create container
        var recipe = document.createElement('div');
        recipe.setAttribute("class", "recipe");
        var imageBox = document.createElement('div');
        imageBox.setAttribute("class", "picture");
        //create Img and p tag
        var recipeImg = document.createElement('img');
        var recipeTitle = document.createElement('p');
        //fill in image and p tag with data results
        recipeTitle.textContent = data.hits[i].recipe.label;
        recipeImg.setAttribute("src", data.hits[i].recipe.image);
        //append img and p tag to recipe div
        imageBox.appendChild(recipeImg);
        imageBox.appendChild(recipeTitle);
        recipe.appendChild(imageBox);

        //create ingredients container
        var ingredients = document.createElement('div');
        ingredients.setAttribute("id", "ingredients")
        //create ul for ingredients
        var list = document.createElement('ul');
        list.setAttribute("id","list");
        //loop through ingredientsList array and create li for each ingredient line
        var ingredientsArray = data.hits[i].recipe.ingredientLines
        for (var k = 0; k < ingredientsArray.length; k++){
            var item = document.createElement('li');
            //enter ingredient into li
            item.textContent = ingredientsArray[k];
            // append list item to ul
            list.appendChild(item);
        }
        //append ul to ingredients div
        ingredients.appendChild(list);
        //append recipe and ingredients divs to recipe container
        recipeContainerEl.appendChild(recipe);
        recipe.appendChild(ingredients);
    }
   
};
//         document.querySelector(".recipes-container").innerHTML = `
// <div class="row">
//     <div class="col s6">
//       <div class="card">
//         <div class="card-image" id = "0">
//           <img src="${data.hits[0].recipe.image}">
//         </div>
//         <div class="card-content">
//         <span>${data.hits[0].recipe.label}</span>
//         </div>
//     </div>
//     <div class="card ingredients displayIngredients">
//           <h4>Ingredients</h4>
//             <div class="card-content">
//                 <ul class="ingredient-items">
//                 <li>${data.hits[0].recipe.ingredientLines[0]}</li>
//                 <li>${data.hits[1].recipe.ingredientLines[0]}</li>
//                 <li>${data.hits[2].recipe.ingredientLines[0]}</li>
//                 <li>${data.hits[3].recipe.ingredientLines[0]}</li>
//                 <li>${data.hits[4].recipe.ingredientLines[0]}</li>
//                 <li>${data.hits[5].recipe.ingredientLines[0]}</li>
//                 </ul>
//             </div>
//           </div>
    
//     </div>
  
  
//     <div class="col s6">
//       <div class="card">
//         <div class="card-image" id = "1">
//           <img src="${data.hits[1].recipe.image}">
//         </div>
//         <div class="card-content">
//           <span>${data.hits[1].recipe.label}</span>
//         </div>
//       </div>
//     </div>
  
//     <div class="col s6">
//       <div class="card">
//         <div class="card-image" id="2">
//           <img src="${data.hits[2].recipe.image}">
//         </div>
//         <div class="card-content">
//           <span>${data.hits[2].recipe.label}</span>
//         </div>
//       </div>
//     </div>
  
//     <div class="col s6">
//       <div class="card">
//         <div class="card-image" id="3">
//           <img src="${data.hits[3].recipe.image}">
//         </div>
//         <div class="card-content">
//           <span>${data.hits[3].recipe.label}</span>
//         </div>
//       </div>
//     </div>

//     <div class="row">
//     <div class="col s6">
//       <div class="card">
//         <div class="card-image" id = "5">
//           <img src="${data.hits[4].recipe.image}">
//         </div>
//         <div class="card-content">
//         <span>${data.hits[4].recipe.label}</span>
//         </div>
//       </div>
//     </div>
  
  
//     <div class="col s6">
//       <div class="card">
//         <div class="card-image" id = "6">
//           <img src="${data.hits[5].recipe.image}">
//         </div>
//         <div class="card-content">
//           <span>${data.hits[5].recipe.label}</span>
//         </div>
//       </div>
//     </div>
  
//   `
// }

