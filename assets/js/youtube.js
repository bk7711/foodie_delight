var resultsEl = document.querySelector(".results");
var buttonEl = document.querySelector(".btn");
var searchEl = document.querySelector("#search");
var buttonEl = document.querySelector(".btn");
var modalEl = document.querySelector(".modal-trigger");
var modalBoxEl = document.querySelector(".modal-content");
var searchHistory = [];

var apiUrl = "";
var apiUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=rating&maxResults=24&q=" + searchEl.value + "&type=video&key=AIzaSyCH8PUHPaF-bU95k7xnQcjjG9U740oLEI8";
;
//get and display api results
var getVideo = function(){
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                var videos = data.items
                console.log(videos);
                for(var i = 0; i<videos.length; i++){
                    var videoEl = document.createElement('div');
                    videoEl.setAttribute("id", videos[i].id.videoId);
                    videoEl.setAttribute("class", "card");
                    videoEl.innerHTML = `
                    <a href="https://www.youtube.com/watch?v=${videos[i].id.videoId}" target="_blank"><img width="200" height="150" src="${videos[i].snippet.thumbnails.medium.url}" alt="${videos[i].snippet.description}"></a>
                        <p class="card-title"><a target= "_blank" href="https://www.youtube.com/watch?v=${videos[i].id.videoId}">${videos[i].snippet.title}</a></p>
                        `;
                    resultsEl.appendChild(videoEl);
                }
            })
        }else{
            console.log(error)
        }
    })
};

var getHistory = function(){
    searchHistory = [];
    $(modalBoxEl).empty();
    //get local storage data
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    //create ul and an li for each item in storage array
    var searchList = document.createElement('ul')
    
    for (var i = 0; i < searchHistory.length; i++){
        var searchedRecipe = document.createElement('li');
        searchedRecipe.textContent = searchHistory[i];
        searchList.appendChild(searchedRecipe);
    }
    //append ul list to modal in html
    modalBoxEl.append(searchList);
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, "inDuration");
    // instances.open();

};

//get value of search field
var searchItem = function(){
    
    var search = searchEl.value;
    event.preventDefault();
    newUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=" + searchEl.value + "&type=video&key=AIzaSyCH8PUHPaF-bU95k7xnQcjjG9U740oLEI8";
    apiUrl = newUrl
    searchHistory.push(search);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

//load carousel
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems,{
        padding: 10,
        dist: -50
    })
  });

//when search button is clicked, display api results
buttonEl.addEventListener("click", function(){
    searchItem();
    // getVideo();
    searchEl.value = "";
    $(resultsEl).empty();
});

modalEl.addEventListener("click", getHistory());
