var resultsEl = document.querySelector(".results");
var buttonEl = document.querySelector(".btn");
var searchEl = document.querySelector("#search");
var buttonEl = document.querySelector(".btn");


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
                    <a href="https://www.youtube.com/watch?v=${videos[i].id.videoId}" target="_blank"><img width="300" height="200" src="${videos[i].snippet.thumbnails.medium.url}" alt="${videos[i].snippet.description}"></a>
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

//get value of search field
var searchItem = function(){
    
    var search = searchEl.value;
    event.preventDefault();
    newUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=" + searchEl.value + "&type=video&key=AIzaSyCH8PUHPaF-bU95k7xnQcjjG9U740oLEI8";
    apiUrl = newUrl
}

//when search button is clicked, display api results
buttonEl.addEventListener("click", function(){
    searchItem();
    getVideo();
    // search = "";
});


// $(resultsEl).on("click", function(event){
//     var targetUrl = $(event.target).parent(["<div>"]).attr("id");
//     var src = "https://www.youtube.com/watch?v=" + targetUrl + "autoplay=1";
//     console.log(src);
//     $("#myModal").modal('show');
//     $("#myModal iframe").attr('src',src);
// });  
// $("#myModal button").click(function(){

// })
