var resultsEl = document.querySelector(".results");
var buttonEl = document.querySelector(".btn");
var apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=lasgna&type=video&key=AIzaSyCH8PUHPaF-bU95k7xnQcjjG9U740oLEI8'

var getVideo = function(){
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                var videos = data.items
                console.log(videos);
                for(var i = 0; i<videos.length; i++){
                    var videoEl = document .createElement('div');
                    videoEl.innerHTML = `
                        <div class="card">
                        <a href="https://www.youtube.com/watch?v=${videos[i].id.videoId}"><img width="300" height="200" src="${videos[i].snippet.thumbnails.medium.url}" alt="${videos[i].snippet.description}"></a>
                        <p class="card-title"><a target= "_blank" href="https://www.youtube.com/watch?v=${videos[i].id.videoId}">${videos[i].snippet.title}</a></p>
                        </div>`;
                    resultsEl.appendChild(videoEl);
                }
            })
        }else{
            console.log(error)
        }
    })
};

getVideo();

// //initialize youtube api
// function begin() {
//     // 2. Initialize the JavaScript client library.
//     gapi.client.init({
//       'apiKey': 'AIzaSyCH8PUHPaF-bU95k7xnQcjjG9U740oLEI8',
//       // Your API key will be automatically added to the Discovery Document URLs.
//       'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
//       // clientId and scope are optional if auth is not required.
//       'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
//       'scope': 'profile',
//     }).then(function() {
//       // 3. Initialize and make the API request.
//       return gapi.client.people.people.get({
//         'resourceName': 'people/me',
//         'requestMask.includeField': 'person.names'
//       });
//     }).then(function(response) {
//       console.log(response.result);
//     }, function(reason) {
//       console.log('Error: ' + reason.result.error.message);
//     });
//   };
//   // 1. Load the JavaScript client library.
//   gapi.load('client', begin());



//   function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setApiKey("AIzaSyCH8PUHPaF-bU95k7xnQcjjG9U740oLEI8");
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {
//     return gapi.client.youtube.search.list({
//       "part": [
//         "snippet",
//         "contentDetails",
//         "player"
//       ],
//       "eventType": "completed",
//       "maxResults": 20,
//       "order": "rating",
//       "regionCode": "United States",
//       "relevanceLanguage": "english",
//       "topicId": "lasagna",
//       "videoLicense": "youtube",
//       "videoType": "any"
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//                 response.json().then(function(data){
//                     console.log(data)
//                 })
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
//   });

// <buttonEl onclick="authenticate().then(loadClient)">authorize and load</button>
// <buttonEl onclick="execute()">execute</button>