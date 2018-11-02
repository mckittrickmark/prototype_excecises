var library = {
  tracks: { t01: { id: "t01",
                   name: "Code Monkey",
                   artist: "Jonathan Coulton",
                   album: "Thing a Week Three" },
            t02: { id: "t02",
                   name: "Model View Controller",
                   artist: "James Dempsey",
                   album: "WWDC 2003"},
            t03: { id: "t03",
                   name: "Four Thirty-Three",
                   artist: "John Cage",
                   album: "Woodstock 1952"}
          },
  playlists: { p01: { id: "p01",
                      name: "Coding Music",
                      tracks: ["t01", "t02"]
                    },
               p02: { id: "p02",
                      name: "Other Playlist",
                      tracks: ["t03"]
                    }
             },
  printPlaylists: function () {
    var playlists = this.playlists
    for (playlist in playlists) {
      console.log(`${playlist}\: ${playlists[playlist]['name']} \- ${playlists[playlist]['tracks'].length} tracks`)
  }
},
  printTracks: function () {
    var tracks = this['tracks']
    for (track in tracks) {
      console.log(`${track}\: ${tracks[track]["name"]} ${tracks[track]["artist"]} (${tracks[track]["album"]})`)
    }
  },

  printListOfTracks: function(tracks) {
    tracksMain = this['tracks']

    for (track of tracks) {
     console.log(`${track}\: ${tracksMain[track]["name"]} ${tracksMain[track]["artist"]} (${tracksMain[track]["album"]})`)
    }
  },

  printPlaylist: function (playlistId) {
    var playlists = this['playlists']
    var tracksPlaylist = playlists[playlistId]['tracks']
    var tracksMain = this['tracks']

    console.log(`${playlists[playlistId]['id']}: ${playlists[playlistId]['name']} \- ${playlists[playlistId]['tracks'].length} tracks`)

    for (var track of tracksPlaylist) {
      console.log(`${tracksMain[track]['id']}: ${tracksMain[track]['name']} ${tracksMain[track]['artist']} (${tracksMain[track]["album"]})`)
    }
  },




// method for playlist ??
  addTrackToPlaylist: function (trackId, playlistId) {
    var playlists = this['playlists']
    playlists[playlistId]['tracks'].push(trackId)
   },
  uid: function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  },
  addTrack: function (name, artist, album) {
    var tracks = this['tracks']
    var generatedId = this.uid()

    tracks[generatedId] = {
      id: generatedId,
      "name": name,
      "artist": artist,
      "album": album
    }
  },
  addPlaylist: function (name) {
    var playlists = this['playlists']
    var generatedPlaylistId = this.uid()

    playlists[generatedPlaylistId] = {
      id: generatedPlaylistId,
      "name": name,
      "tracks": []
    }
  },
  printSearchResults: function(query) {
    var tracks = this['tracks']
    var matchingTracks = []
    var queryLCase = query.toLowerCase()

    for (track in tracks) {
      var alreadyPrinted = 0
      var keys = Object.keys(tracks[track])
      for (key of keys) {
        var searchString = tracks[track][key].toLowerCase()
        if (searchString.search(queryLCase) !== -1 && alreadyPrinted === 0 ) {
          matchingTracks.push(tracks[track]['id'])
          alreadyPrinted += 1
       }
      }
    }
    if (matchingTracks.length > 0) {
      this.printListOfTracks(matchingTracks)
    }
    else {
      console.log("No results match your search.")
    }
  }
}

// Library Prototype
let Library = function (name, creator) {
  this.playlists = []
  this.libName = name
  this.creator = creator
}

Library.prototype.addPlaylist = function (id) {
  this.playlists.push(id)
}

// Playlist
let Playlist = function (name, id) {
  this.tracks = []
  this.playlistName = name
  this.id = id
}
Playlist.prototype.addTrack = function (id) {
  this.tracks.push(id)

}

Playlist.prototype.averageRating = function() {
  let sumRating = 0
  for (track of this.tracks) {
    sumRating += track.getRating()
  }
  return sumRating / this.tracks.length
}

Playlist.prototype.totalDuration = function() {
  let totalDuration = 0
  for (track of this.tracks) {
    totalDuration += track.getLength()
  }
  return totalDuration
}

//  Tracks

let Track = function (title, rating, length, id) {
  this.title = title
  this.rating = rating
  this.length = length
  this.id = id
}

Track.prototype.getRating = function () {
  return this.rating
}

Track.prototype.getLength = function () {
  return this.length
}

// Instance of Library
let lib1 = new Library("Cool Zic", "Mark")


// Instance of Playlist
let A1 = new Playlist("Boom!", "A1")
lib1.addPlaylist("A1")

// Instances of Playlist
let B1 = new Track("Happy Birthday", 5, 90, "B1")
A1.addTrack(B1)

let B2 = new Track("Dancing Queen", 5, 240, "B2")
A1.addTrack(B2)

let B3 = new Track("Halo", 4, 70, "B3")
A1.addTrack(B3)

let B4 = new Track("Food Glorious Food", 4, 200, "B4")
A1.addTrack(B4)


console.log("average Rating", A1.averageRating())
console.log("Total Duration", A1.totalDuration())

//Tests:

//library.printPlaylists()

//library.printTracks()

//library.printListOfTracks(["t01", "t02"])

//library.printPlaylist("p01")

//library.addTrackToPlaylist("t03", "p01")
//console.log(library["playlists"]["p01"]["tracks"])

//library.addTrack("For Elise", "Motzart", "Not Applicable")
//library.printTracks()

//library.addPlaylist("Classical Music")
//library.printPlaylists()

//library.printSearchResults("co")


//-----------------------------------------------------

// FUNCTIONS TO IMPLEMENT:

// prints a list of all playlists, in the form:
// p01: Coding Music - 2 tracks
// p02: Other Playlist - 1 tracks


// prints a list of all tracks, in the form:
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
// t03: Four Thirty-Three by John Cage (Woodstock 1952)






// prints a list of tracks for a given playlist, in the form:
// p01: Coding Music - 2 tracks
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)




// adds an existing track to an existing playlist





// generates a unique id
// (use this for addTrack and addPlaylist)




// adds a track to the library





// adds a playlist to the library




// STRETCH:
// given a query string string, prints a list of tracks
// where the name, artist or album contains the query string (case insensitive)
// tip: use "string".search("tri")
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search


