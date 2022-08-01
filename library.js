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

console.clear();

// ------------------------------------------------------------------------------------
// prints a list of all playlists, in the form:
// p01: Coding Music - 2 tracks
// p02: Other Playlist - 1 tracks
const printPlaylists = () => {
  for (let each in library) {
    if (each === "playlists") {
      let tmp = library[each];
      for (let list in tmp) {
        console.log(`${conColorCyan}Playlist ID: ${list}\tPlaylist Name: ${tmp[list]["name"]}\tNumber of Tracks: ${tmp[list]["tracks"].length}${conColorReset}`);
      }
    }
  }
};


console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Print Playlists${conColorReset}`);
printPlaylists();
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);


// ------------------------------------------------------------------------------------
// prints a list of all tracks, using the following format:
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
// t03: Four Thirty-Three by John Cage (Woodstock 1952)
const printTracks = () => {
  for (let each in library) {
    if (each === "tracks") {
      let tmp = library[each];
      for (let list in tmp) {
        console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
        
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
        // one would still need to fuss a bit to come up with the right numbers for padEnd, but it's more consistent than tabs. 
        console.log(`${conColorCyan}Track ID: ${list.padEnd(17, '.')} Track Name: ${tmp[list]["name"]}`);
        console.log(`Artist: ${tmp[list]["artist"].padEnd(19, '.')} Album: ${tmp[list]["album"]}${conColorReset}`);

        console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
      }
    }
  }
};


console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Print Tracks${conColorReset}`);
printTracks();
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// prints a list of tracks for a given playlist, using the following format:
// p01: Coding Music - 2 tracks
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
const printPlaylist = playlistId => {
  if (!playlistId) {
    return console.log(`${conColorRed}Missing playlist ID${conColorReset}`);
  }
  for (let each in library) {
    if (each === "playlists") {
      let tmp = library[each];
      for (let list in tmp) {
        if (list === playlistId) {
          let tmp1 = tmp[list];
          console.log(`${conColorMagenta}Playlist ID: ${playlistId.padEnd(16)}Playlist Name: ${tmp[list]["name"]}\tNumber of Tracks: ${tmp[list]["tracks"].length}${conColorReset}`);
          trackNames(tmp1["tracks"]);
        }
        
      }
    }
  }
  return;
};

const trackNames = (trackList) => {
  for (let each in library) {
    if (each === "tracks") {
      let tmp = library[each];
      for (let list in trackList) {
        for (let jam in tmp) {
          if (jam === trackList[list]) {
            console.log(`${conColorCyan}Track ID: ${trackList[list].padEnd(18)} Track Name: ${tmp[jam]["name"]}`);
            console.log(`Artist: ${tmp[jam]["artist"].padEnd(20)} Album: ${tmp[jam]["album"]}${conColorReset}`);
          }
        }
      }
    }
  }
  return;
};

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Print Specific Playlist${conColorReset}`);
printPlaylist("p02");
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// adds an existing track to an existing playlist
const addTrackToPlaylist = (trackId, playlistId) => {
  for (let double in library["playlists"][playlistId]["tracks"]) {
    if (trackId === library["playlists"][playlistId]["tracks"][double]) {
      return console.log(`${conColorRed} Whoops - Looks like this track(${trackId}) already exists in the playlist(${playlistId})!${conColorReset}`);
    }

  }
  for (let each in library) {
    if (each === "playlists") {
      let tmp = library[each];
      for (let list in tmp) {
        if (list === playlistId) {
          tmp[list]["tracks"].push(trackId);
          printPlaylists();
          console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
          printPlaylist(playlistId);
        }
      }
    }
  }
};

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Add Existing Track to Playlist${conColorReset}`);
addTrackToPlaylist("t03", "p01");
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// generates a unique id
// (already implemented: use this for addTrack and addPlaylist)
const generateUid = () => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};
//
// I asssumed to generate new track and playlist identifiers instead of reading & creating them in sequence like you did.
//
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Generate a unique ID${conColorReset}`);
console.log(generateUid());
console.log(`${conColorBright}${conColorCyan}Don't understand intent of this section - moving on.${conColorReset}`);
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// adds a track to the library
const addTrack = (name, artist, album) => {
  let newIdNumber = Object.keys(library["tracks"]).length + 1;
  let newId = "";
  if (newIdNumber < 10) {
    newId = "t0" + newIdNumber;
  } else {
    newId = "t" + newIdNumber;
  }
  library["tracks"][newId] = {"id" : newId, "name" : name, "artist" : artist, "album" : album};
  printTracks();
  return;
};

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Add a New Track${conColorReset}`);
addTrack("guinness", "ej&jr","fuzzyman");
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// adds a playlist to the library
const addPlaylist = (name) => {
  let newIdNumber = Object.keys(library["playlists"]).length + 1;
  let newId = "";
  if (newIdNumber < 10) {
    newId = "p0" + newIdNumber;
  } else {
    newId = "p" + newIdNumber;
  }
  library["playlists"][newId] = {"id" : newId, "name" : name, "tracks" : []};
  printPlaylists();
  return;
};

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Add a New Playlist${conColorReset}`);
addPlaylist("fluffy tail");
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);

// ------------------------------------------------------------------------------------
// STRETCH:
// given a query string string, prints a list of tracks
// where the name, artist or album contains the query string (case insensitive)
// tip: use "string".search("tri")
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
const printSearchResults = (query) => {
  let resultTracker = 0;
  for (let each in library["tracks"]) {
    let tmpTrackList = library["tracks"][each];
    resultTracker += searchResults(tmpTrackList, query);
  }
  if (resultTracker <= 0) {
    console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
    console.log(`${conColorRed}Sorry - No tracks match your search${conColorReset}`);
    console.log(conColorRed + conColorBright + consoleThreeQuarterLine + conColorReset);
  }


};

const searchResults = (searchItem, query) => {
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
};

console.log(conColorCyan + conColorBright + consoleLine + conColorReset);
console.log(`${conColorGreen}Search for a track${conColorReset}`);
printSearchResults("fuzzy");
console.log(conColorCyan + conColorBright + consoleLine + conColorReset);