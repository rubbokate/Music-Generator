//pull from LastFM, no play funtionality
const lastFmKey = "3b2324e54073b3dc0b3f4e2407ba58d1"
const lastFmSecret = "82409a163bce82966c42be3a35f3d950"
const youtubeKey = "AIzaSyAaQzZrnuJSEVUnyYXGYHcEKoluy22eyu0"

//for artist search need + instead of " " --> loop?
var lfmartist = "the beatles".split(' ').join('+') //$("#example-input").split(' ').join('+')


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
        var ytubeTerm = lfmArtistNameArray.map(function(ytubeTermIn) {
            return ytubeTermIn.name;
        });
        //test to see if array works
        //console.log(ytubeTerm);
        //save to local storage
        localStorage.setItem("ytubeTerm", JSON.stringify(ytubeTerm));
    });
    //retrive array and test
    var ytubeSTerm = JSON.parse(localStorage.getItem("ytubeTerm"));
  //  console.log(ytubeSTerm);

//}
//console.log(searchQueryURLSimArt);


//Youtube api seperate component, can be moved
ytubeSTerm.forEach(function(yQueryLoop) {
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

    //example of JSON syntax for youtube API, video title 
    var ytReturnVidTitle = ytResponse.items[0].snippet.title
    console.log(ytReturnVidTitle);
});
});
