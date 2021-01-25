const lastFmKey = "3b2324e54073b3dc0b3f4e2407ba58d1"
const lastFmSecret = "82409a163bce82966c42be3a35f3d950"


//const youtubeKey = "AIzaSyDhTehhaCl-IoNtfuRz4ePLHX7iO98lljw" Kaitlyn's yt key

// const youtubeKey = "AIzaSyAaQzZrnuJSEVUnyYXGYHcEKoluy22eyu0" //Javier's 1st api key
 const youtubeKey = "AIzaSyBsUSXEw1JU8u8efirUOm8mhbuVJD3YZVE" //Javier 2nd test key
//const youtubeKey ="AIzaSyA3bUZtYtaKf3MzhjEqjf3RznY_1E2LuQY" //Cole's yt api key


$(document).ready(function() {
});

function findArtist() {
    //variable for # of results returned
    var resLength = "1"
    //for artist search need + instead of " " --> loop?
    //var lfmartist = $(".input");  //"the beatles" //$(".input")
    //need to work on jquery to save input from form and submit on btn press

    var lfmartist = document.getElementById("artistInput").value
    console.log("lfmartist is:" + lfmartist)

    // console.log(lfmartist);
    //needs on click jquery somewhere around here

    //function searchQueryURLSimArt() {
    var qURL = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&limit=${resLength}&artist=${lfmartist.split(' ').join('+')}&autocorrect[1]&api_key=${lastFmKey}&format=json`
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
    //retrieve array and test

    //UNCOMMENT ME LATER
    var ytubeSTerm = JSON.parse(localStorage.getItem("ytubeTerm"));

    //}
    //console.log(searchQueryURLSimArt);

    //shuffle array 1/20/21 
    function shuffleArray(ytubeSTerm) {
        if (ytubeSTerm.length == 0) {
            console.log('ytubeSTerm is 0')
        }
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
        var qURLy = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${yQueryLoop.split(' ').join('+')}&type=video&key=${youtubeKey}`
        $.ajax({
            url: qURLy,
            method: "GET"
        }).then(function (ytResponse) {
            console.log("qURLy is: " + qURLy);
            console.log(ytResponse);

            //successfully retrives videoId

            var ytReturnVidId = ytResponse.items[0].id.videoId
            console.log("ytReturnVidId is: " + ytReturnVidId);

            //placeholder for video id 
           // var ytReturnVidId = "1V_xRb0x9aw"

            //pl for vid title
            //var ytReturnVidTitle = "Example Title"
            //retrieve video title 
           var ytReturnVidTitle = ytResponse.items[0].snippet.title
            console.log(ytReturnVidTitle);

            //retrieve video thumbnails
            var ytReturnThumb = ytResponse.items[0].snippet.thumbnails.default.url
            console.log(ytReturnThumb);

            var comboResults = `<li> <img src="${ytReturnThumb}" alt="thumnail"> <a href="https://www.youtube.com/watch?v=${ytReturnVidId}" target="_blank" rel="noopener noreferrer">${ytReturnVidTitle}</a></li>`

            //append to document with above results, use comboResults as inside html text
            $("#ytResults").append(comboResults);
localStorage.clear()
            return ytReturnVidId

        });
    });
};
 
   /* var tag = document.createElement('script');


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
            videoId: 'NdSMeBrNp4A',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }


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
    } */
//YOUTUBE
