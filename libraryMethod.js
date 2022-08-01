const library = {
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
  printPlaylists: function() {
    for (let each in this) {
      if (each === "playlists") {
        let tmp = this[each];
        for (let list in tmp) {
          console.log(`${conColorCyan}Playlist ID: ${list}\tPlaylist Name: ${tmp[list]["name"]}\tNumber of Tracks: ${tmp[list]["tracks"].length}${conColorReset}`);
        }
      }
    }
  },
  printTracks: function() {
    for (let each in this) {
      if (each === "tracks") {
        let tmp = this[each];
        for (let list in tmp) {
          console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
          console.log(`${conColorCyan}Track ID: ${list}\t\t\tTrack Name: ${tmp[list]["name"]}\nArtist: ${tmp[list]["artist"]}\t\tAlbum: ${tmp[list]["album"]}${conColorReset}`);
          console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
        }
      }
    }
  },
  printPlaylist : function(playlistId) {
    if (!playlistId) {
      return console.log(`${conColorRed}Missing playlist ID${conColorReset}`);
    }
    for (let each in this) {
      if (each === "playlists") {
        let tmp = this[each];
        for (let list in tmp) {
          if (list === playlistId) {
            let tmp1 = tmp[list];
            console.log(`${conColorMagenta}Playlist ID: ${playlistId}\tPlaylist Name: ${tmp[list]["name"]}\tNumber of Tracks: ${tmp[list]["tracks"].length}${conColorReset}`);
            this.trackNames(tmp1["tracks"]);
          }
          
        }
      }
    }
    return;
  },
  trackNames : function(trackList) {
    for (let each in this) {
      if (each === "tracks") {
        let tmp = this[each];
        for (let list in trackList) {
          for (let jam in tmp) {
            if (jam === trackList[list]) {
              console.log(`${conColorCyan}Track ID: ${trackList[list]}\t\tTrack Name: ${tmp[jam]["name"]}\nArtist: ${tmp[jam]["artist"]}\tAlbum: ${tmp[jam]["album"]}${conColorReset}`);
            }
          }
        }
      }
    }
    return;
  },
  addTrackToPlaylist : function(trackId, playlistId) {
    for (let double in this["playlists"][playlistId]["tracks"]) {
      if (trackId === this["playlists"][playlistId]["tracks"][double]) {
        return console.log(`${conColorRed} Whoops - Looks like this track(${trackId}) already exists in the playlist(${playlistId})!${conColorReset}`);
      }
    }
    for (let each in this) {
      if (each === "playlists") {
        let tmp = this[each];
        for (let list in tmp) {
          if (list === playlistId) {
            tmp[list]["tracks"].push(trackId);
            this.printPlaylists();
            console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
            this.printPlaylist(playlistId);
          }
        }
      }
    }
  },
  generateUid : function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  },
  addTrack : function(name, artist, album) {
    let newIdNumber = Object.keys(this["tracks"]).length + 1;
    let newId = "";
    if (newIdNumber < 10) {
      newId = "t0" + newIdNumber;
    } else {
      newId = "t" + newIdNumber;
    }
    this["tracks"][newId] = {"id" : newId, "name" : name, "artist" : artist, "album" : album};
    this.printTracks();
    return;
  },
  addPlaylist : function(name) {
    let newIdNumber = Object.keys(this["playlists"]).length + 1;
    let newId = "";
    if (newIdNumber < 10) {
      newId = "p0" + newIdNumber;
    } else {
      newId = "p" + newIdNumber;
    }
    this["playlists"][newId] = {"id" : newId, "name" : name, "tracks" : []};
    this.printPlaylists();
    return;
  },
  printSearchResults : function(query) {
    let resultTracker = 0;
    for (let each in this["tracks"]) {
      let tmpTrackList = this["tracks"][each];
      resultTracker += library.searchResults(tmpTrackList, query);
    }
    if (resultTracker <= 0) {
      console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
      console.log(`${conColorRed}Sorry - No tracks match your search${conColorReset}`);
      console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
    }
  },
  searchResults : function(searchItem, query) {
    query = query.toUpperCase();
    for (let each in searchItem) {
      if (each === "id") {
        continue;
      } else {
        let searchIt = searchItem[each].toUpperCase();
        let searchFind = -1;
        searchFind = searchIt.search(query);
        if (searchFind >= 0) {
          console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
          console.log(`${conColorCyan}Track ID: ${searchItem["id"]}\t\tTrack Name: ${searchItem["name"]}\nArtist: ${searchItem["artist"]}\t\tAlbum: ${searchItem["album"]}${conColorReset}`);
          console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
          return 1;
        }
      }
    }
    return 0;
  }
};


/////////////////////////////
// FUNCTIONS TO IMPLEMENT:
/////////////////////////////

// ------------------------------------------------------------------------------------
// GLOBAL color variables

const conColorCyan = "\x1b[36m", conColorRed = '\x1b[31m', conColorGreen = '\x1b[92m', conColorGrey = '\x1b[90m', conColorReset = "\x1b[0m", conColorMagenta = `\x1b[95m`;
const conColorBright = "\x1b[1m", conColorDim = "\x1b[2m", conColorItalics = "\x1b[3m", conColorReverse = "\x1b[7m";
const consoleLine = '-'.repeat(process.stdout.columns);
const consoleHalfLine = '-'.repeat((process.stdout.columns) / 2);
const consoleThreeQuarterLine = '-'.repeat((process.stdout.columns) / 4 * 3);
// console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// prints a list of all playlists, in the form:
// p01: Coding Music - 2 tracks
// p02: Other Playlist - 1 tracks

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Print Playlists${conColorReset}`);
library.printPlaylists();
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// prints a list of all tracks, using the following format:
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
// t03: Four Thirty-Three by John Cage (Woodstock 1952)

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Print Tracks${conColorReset}`);
library.printTracks();
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// prints a list of tracks for a given playlist, using the following format:
// p01: Coding Music - 2 tracks
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Print Specific Playlist${conColorReset}`);
library.printPlaylist("p02");
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// adds an existing track to an existing playlist

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Add Existing Track to Playlist${conColorReset}`);
library.addTrackToPlaylist("t03", "p01");
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// generates a unique id
// (already implemented: use this for addTrack and addPlaylist)

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Generate a unique ID${conColorReset}`);
console.log(library.generateUid());
console.log(`${conColorBright}${conColorCyan}Don't understand intent of this section - moving on.${conColorReset}`);
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// adds a track to the library

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Add a New Track${conColorReset}`);
library.addTrack("guinness", "ej&jr","fuzzyman");
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// adds a playlist to the library

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Add a New Playlist${conColorReset}`);
library.addPlaylist("fluffy tail");
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// STRETCH:
// given a query string string, prints a list of tracks
// where the name, artist or album contains the query string (case insensitive)
// tip: use "string".search("tri")
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search


console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Search for a track${conColorReset}`);
library.printSearchResults("fuzzy");
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);