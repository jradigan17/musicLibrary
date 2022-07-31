//
//  Music Library Challenge (working with objects)
//  https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m01w3/activities/249?journey_step=31&workbook=6
//  2022-07-18
//

// GLOBAL console.log color and style variables
// 
const conColorCyan = "\x1b[36m", conColorRed = '\x1b[91m', conColorGreen = '\x1b[92m', 
      conColorGrey = '\x1b[90m', conColorReset = "\x1b[0m";
const conColorBright = "\x1b[1m", conColorDim = "\x1b[2m", conColorItalics = "\x1b[3m", conColorReverse = "\x1b[7m";
const consoleLine = '-'.repeat(process.stdout.columns);
const consoleHalfLine = '-'.repeat((process.stdout.columns)/2);

// header & borderColor is color in our library
function drawHeaderBox(headerText,headerColor,borderColor) {
  return (`${borderColor}${'-'.repeat(headerText.length+4)}${conColorReset}${borderColor}\n| ${headerColor}${headerText} ${borderColor}|${conColorReset}\n${borderColor}${'-'.repeat(headerText.length+4)}${conColorReset}`);
}

// lineColor is variable in our library // lineLength as % of console width // borderColor as variable in library
function drawDivideLine(lineColor,lineLength,lineMessage) { 
  if(lineMessage) {
    lineMessage = '--[ ' + lineMessage + ' ]';
  } else { lineMessage = '';}
  const consoleLine = '-'.repeat((process.stdout.columns)*((lineLength/100))-((lineMessage.length)));
  return (`${lineColor}${lineMessage}${consoleLine}${conColorReset}`);
}

// TEXT INPUT LIBRARY & INFO
const readline = require("readline"); // just need for our search function
// 


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

// prints a list of all playlists, in the form:
// p01: Coding Music - 2 tracks
// p02: Other Playlist - 1 tracks
const printPlaylists = function() {
  console.log(drawDivideLine(conColorGreen,50,"Music Library Playlists"));
  // library.tracks.txx.name (and count of .tracks)

  console.log(`\n${conColorGreen}ID\tList Name\t\t# of Tracks${conColorReset}`);
  for ( key in library.playlists) {
    trackList = library.playlists[key].tracks;
    
    console.log(`${key}:\t${library.playlists[key].name}\t\t${trackList.length}`);
  }
}
// printPlaylists(); // TEST ok 2022-07-21


// prints a list of all tracks, using the following format:
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
// t03: Four Thirty-Three by John Cage (Woodstock 1952)
const printTracks = function() {
  // console.clear(); // clear console screen (not ideal during test phases) // TODO
  console.log(drawDivideLine(conColorGreen,50,"All Tracks in Library"));
  // library.playlists.pxx.name (and count of .tracks)

  console.log(`\n${conColorGreen}ID\tTrack Name & Details${conColorReset}`);
  for ( key in library.tracks) {
    console.log(`${key}:\t${conColorCyan}${library.tracks[key].name}${conColorReset} by ${library.tracks[key].artist} (${conColorItalics}${library.tracks[key].album}${conColorReset})`);
  }
}
// printTracks(); // TEST ok 2022-07-21


// HELPER FUNCTION - fetch track based on TrackID passed
const fetchTrack =  function(trackID) {
  if(!trackID) { return; }
  returnObject={};
  returnObject.name = library.tracks[trackID].name;
  returnObject.artist = library.tracks[trackID].artist;
  returnObject.album = library.tracks[trackID].album;
  return (returnObject);
}
// console.log(fetchTrack("t02").artist); // TEST OK 2022-07-21


// prints a list of tracks for a given playlist, using the following format:
// p01: Coding Music - 2 tracks
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
const printPlaylist = function(playlistId) {
  console.log(drawDivideLine(conColorGreen,50,"Play List Details"));
  trackList = library.playlists[playlistId].tracks;
  console.log(`${playlistId}: \t${library.playlists[playlistId].name}\t${trackList.length} tracks`);
  trackList.forEach(element => {
    console.log(`${element}: \t${fetchTrack(element).name} by ${fetchTrack(element).artist} (${fetchTrack(element).album})`);
  });
}
// printPlaylist("p01"); // TEST OK 2022-07-21

// adds an existing track to an existing playlist
const addTrackToPlaylist = function(trackId, playlistId) {

}


// generates a unique id
// (already implemented: use this for addTrack and addPlaylist)
const generateUid = function() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
// TESTS ok 2022-07-21


// adds a track to the library
const addTrack = function(name, artist, album) {
  let tid =  generateUid();
  addTrackObject = {'id': tid, 'name': name, 'artist': artist, 'album': album};
  library.tracks[tid] = addTrackObject;
  console.log(`${conColorReverse} added ${conColorReset} ${conColorCyan}${name}${conColorReset} to the music library.${conColorReset}`)
}
function addTrackDemo() {
  console.log(drawDivideLine(conColorGreen,50,"DEMO - Add Tracks to Library"));
  console.log();
  addTrack("Our House","Frog Leap","YT2021");
  addTrack("Where is My Mind","Pixies","unknown");
  addTrack("Once in a Lifetime","Talking Heads","unknown");
}

// adds a playlist (empty) to the library
const addPlaylist = function(name) {
  let pid =  generateUid();
  addPlaylistObject ={'id':pid, 'name':name, 'tracks':[]};
  library.playlists[pid] = addPlaylistObject;
  console.log(`${conColorReverse} added ${conColorReset} ${conColorCyan}${name}${conColorReset} as a playlist.${conColorReset}`)
}
// addPlaylist("ej\'s tune list");
// printPlaylists(); // TEST OK 2022-07-21

// STRETCH:
// given a query string string, prints a list of tracks
// where the name, artist or album contains the query string (case insensitive)
// tip: use "string".search("tri") 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
const printSearchResults = function(query) {
  const searchString = query.toLowerCase();
  let searchResult = 0, finalSearch = 1;

  console.log(`${conColorGreen}Searched for ${conColorRed}|${query}|${conColorGreen}:${conColorReset}`);
  for ( key in library.tracks) {
    let findInHere = library.tracks[key].name + library.tracks[key].artist + library.tracks[key].album;
    findInHere = findInHere.toLowerCase();
    // console.log(findInHere + ' -- '+searchString); // DEBUG
    searchResult = findInHere.search(searchString); 
    
    if (searchResult > -1) {
      finalSearch = 0; // toggle a final search to say we did find a match
      console.log(`\nFound track: ${conColorCyan}${library.tracks[key].id}${conColorReset} - ${conColorCyan}${library.tracks[key].name}${conColorReset}`);
    }
  }
  if (finalSearch === 1 ) {
    console.log(`${conColorGreen}No results found for search: ${conColorRed}${query}${conColorGreen}.${conColorReset}`);
  }
}
// printSearchResults('Four'); // testok // TODO finish output line
function searchDemo() { 
  console.log(drawDivideLine(conColorGreen,50,"Search Demo"));
  console.log();
  // printSearchResults('Frog');  // FIXED search for demo purposes

  const rl = readline.createInterface({  // create new interface for our search function
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.question("Search for: ", function (answer) {
    console.log(`Your search is ${answer}`);
    console.log("Closing the readLine interface");
    rl.close();
    printSearchResults(answer);
    grabKeys();
  });
}

// searchDemo();

function main() {
  grabKeys();
}

function showHeader() {
  console.clear();
  console.log(drawHeaderBox("Our LHL Music Library",conColorGreen,conColorCyan));
}
function showMenu() {
  console.log(`\n${conColorGreen}a ${conColorReset}Show Playlists | ${conColorGreen}w ${conColorReset}Show Tracks\n${conColorGreen}s${conColorReset} Add Tracks Demo | ${conColorGreen}d ${conColorReset}Search Demo | ${conColorGreen}x${conColorReset} exit`);
}

function grabKeys() {
  let searchMode = false, searchstring = []; // toggle if we're in search mode or not - default FALSE (off)
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  
  // console.clear();
  showHeader();

  // UNICODE character reference: https://www.rapidtables.com/code/text/unicode-characters.html
  stdin.on('data', function myHandler(key)  {
    console.clear(); 
    if (key === '\u0078' || key === '\u0003') { // x or ctrl-c to exit
      process.exit();
    }
    if (key === '\u0061') {  // 'a' 
      printPlaylists();
      showMenu();
    }
    if (key === '\u0077') {  // 'w'
      printTracks();
      showMenu();
    }
    if (key === '\u0073') {  // 'w'
      addTrackDemo();
      showMenu();
    }
    if (key === '\u0064') {  // 'd'
      searchMode =  true;
      key =''; // clear existing key inputs
      searchstring.length = 0; // clear our search string
      stdin.removeListener('data',myHandler);
      searchDemo(); 
      // * READ THIS:
      // https://stackoverflow.com/questions/10166104/nodejs-removing-event-listeners
      // ! HOW do we exit the key callback prior to calling searchDemo() as we have other input there
      // ! research this maybe? https://www.knowledgehut.com/tutorials/node-js/handling-data
      showMenu();
    }
  });
  showMenu();  
}

main();