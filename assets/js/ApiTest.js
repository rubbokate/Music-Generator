//pull from LastFM, no play funtionality
var lastFmKey = '3b2324e54073b3dc0b3f4e2407ba58d1'
var lastFmSecret = '82409a163bce82966c42be3a35f3d950'
var artist = ""
var lastFmCallgetsimilar = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&limit=2&artist=" + artist + "&autocorrect[1]&api_key=" + lastFmKey + "&format=json"
console.log(lastFmCallgetsimilar)
//