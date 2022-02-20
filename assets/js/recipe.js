let searchform = document.querySelector("#search")
let submitEl = document.querySelector(".btn")
let recipeContainerEl = document.querySelector(".recipes-container")
let carouselEl = document.querySelector(".carousel");


//Add an event listener to the button that runs the function sendApiRequest when it is clicked

submitEl.addEventListener("click", function(event) {
    event.preventDefault();
    $(recipeContainerEl).empty();
    console.log("button pressed")
    const recipe = searchform.value;
    $("#searched").textContent = recipe
    console.log(recipe);
    sendApiRequest(recipe)
});
// var showIngredients = function(){
//     var modalIngredients = $(event.target).parent();
//     console.log(modalIngredients);
//     var modalTwo = document.querySelector(".modalTwo");
//     modalTwo.innerHTML = modalIngredients;
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, "inDuration");
// }

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
        //create Img and p tag and save button
        var recipeImg = document.createElement('img');
        var recipeTitle = document.createElement('p');
        var saveRecipe = document.createElement('div');
        //fill in image and p tag with data results
        recipeTitle.textContent = data.hits[i].recipe.label;
        recipeImg.setAttribute("src", data.hits[i].recipe.image);
        saveRecipe.setAttribute("id", "btn" + [i]);
        saveRecipe.setAttribute("class", "recipeButton")
        saveRecipe.innerHTML = `
        <a class="waves-effect waves-light btn-small save"><i class="small material-icons">save</i></a>
        `
        
        //append img and p tag to recipe div
        imageBox.appendChild(recipeImg);
        imageBox.appendChild(recipeTitle);
        imageBox.appendChild(saveRecipe);
        recipe.appendChild(imageBox);

        //create ingredients container
        var ingredients = document.createElement('div');
        ingredients.setAttribute("id", "ingredients")
        //create ul for ingredients
        var list = document.createElement('ul');
        list.setAttribute("class","list");
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
    $('.recipeButton').on("click", function(){
            var j = 1
             console.log('click');
             console.log(event.currentTarget);
             //create a carousel link with innerHTML
             var savePicture = ($(event.currentTarget)).parent().children(['img']);
             var savedPicture = savePicture.attr("src");
            var saveIngredients = ($(event.currentTarget)).parent().siblings();
            var savedIngredients = saveIngredients[0].innerHTML;
            console.log(savedIngredients);
            var carouselPage = document.createElement('div');
            var carouselPageImg = document.createElement('img');
            var cPageIngredients = document.createElement('div')
            cPageIngredients.innerHTML = savedIngredients;
            carouselPageImg.setAttribute('src',savedPicture);
            $(carouselPageImg).on('click', showIngredients());
            carouselPage.appendChild(carouselPageImg);
            carouselPage.appendChild(cPageIngredients);
            var carouselItem = document.createElement('a');
            carouselItem.setAttribute('class', 'carousel-item');
            carouselItem.setAttribute('href', '#'+ [j]);
            // carouselItem.appendChild(carouselPageImg);
            carouselItem.appendChild(carouselPage);
            carouselEl.appendChild(carouselItem);
            var elems = document.querySelectorAll('.carousel');
            j++;
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems,{
        padding: 20,
        dist: -20
    })
   }); 
};

// var save = $(recipeContainerEl).on('click','.picture', function(event){
//     console.log("click");
//     console.log($(event.target));
//     console.log($(event.target).parent(['div']));
//     // console.log($(event.target).parent([div]));
//     // console.log($(event.target).parent([div]).siblings([div]));

// })

    



