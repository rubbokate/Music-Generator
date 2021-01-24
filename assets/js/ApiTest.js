//pull from LastFM, no play funtionality
const lastFmKey = "3b2324e54073b3dc0b3f4e2407ba58d1"
const lastFmSecret = "82409a163bce82966c42be3a35f3d950"
const youtubeKey = "AIzaSyAaQzZrnuJSEVUnyYXGYHcEKoluy22eyu0"

//for artist search need + instead of " " --> loop?
var lfmartist = "the beatles".split(' ').join('+') //$("#example-input").split(' ').join('+')

//YOUTUBE
var tag = document.createElement('script');
var videoID = "A_MjCqQoLLA"


tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoID,
        events: {
            'onError': onPlayerError,
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
//YOUTUBE


// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    $('#player').show();
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
    }
}

function stopVideo() {
    player.stopVideo();
}

function onPlayerError(e) {
  console.log("error on the video id. Iframe is hiding");
  $('#player').hide();
  console.log(e);
};


//$(document).ready(function(){
//function searchQueryURLSimArt() {
var qURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&limit=2&artist=" + lfmartist + "&autocorrect[1]&api_key=" + lastFmKey + "&format=json"
$.ajax({
    url: qURL,
    method: "GET"
}).then(function (lfmResponse) {
    console.log(qURL);
    console.log(lfmResponse)

    //get length of array and iterate to get all artists in array
    var lfmArtistNameArray = lfmResponse.similarartists.artist

    //create array to send to youtube API
    var ytubeTerm = lfmArtistNameArray.map(function (ytubeTermIn) {
        return ytubeTermIn.name;
    });
    //test to see if array works
    //console.log(ytubeTerm);
    //save to local storage
    localStorage.setItem("ytubeTerm", JSON.stringify(ytubeTerm));
});
//retrive array and test

//UNCOMMENT ME LATER
var ytubeSTerm = JSON.parse(localStorage.getItem("ytubeTerm"));

//}
//console.log(searchQueryURLSimArt);

//test item for ytubeSTerm
//let ytubeSTerm = ["A_MjCqQoLLA", "3L4YrGaR8E4","1V_xRb0x9aw"]


//shuffle array 1/20/21 
function shuffleArray(ytubeSTerm) {
    for (let i = ytubeSTerm.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ytubeSTerm[i], ytubeSTerm[j]] = [ytubeSTerm[j], ytubeSTerm[i]];
    }
};
shuffleArray(ytubeSTerm);

//test to see if it shuffles
//console.log(ytubeSTerm);


//Youtube api seperate component, can be moved
ytubeSTerm.forEach(function (yQueryLoop) {
    console.log(yQueryLoop);
    var qURLy = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + yQueryLoop.split(' ').join('+') + "&type=video&key=" + youtubeKey
    $.ajax({
        url: qURLy,
        method: "GET"
    }).then(function (ytResponse) {
        console.log(qURLy);
        console.log(ytResponse);

        //successfully retrives videoId
        var ytReturnVidId = ytResponse.items[0].id.videoId
        console.log(ytReturnVidId);

        //retrieve video title 
        var ytReturnVidTitle = ytResponse.items[0].snippet.title
        console.log(ytReturnVidTitle);
        
        //retrieve video thumbnails
        var ytReturnThumb = ytResponse.items[0].snippet.thumbnails.default
        console.log(ytReturnThumb);

        const dummyTest = "Test is success"
        
    });

});
    console.log(dummyTest);

