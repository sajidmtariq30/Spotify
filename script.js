console.log("Welcome to spotify");
// Initializing the variables
let songIndex = 0;
let audioElement = new Audio('/songs/Baller.mp3');
let masterPlay = document.getElementById('masterPlay')
let progressbar = document.getElementById('progessbar')
let gif = document.getElementById('gif')
let mastersonginfo = document.getElementById('mastersonginfo')
let songsItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Baller", filepath: "/songs/Baller.mp3", coverpath: "/covers/Baller.jpeg" },
    { songName: "Daku", filepath: "/songs/Daku.mp3", coverpath: "/covers/Daku.jpeg" },
    { songName: "Rubicon_Drill", filepath: "/songs/Rubicon_Drill.mp3", coverpath: "/covers/Rubicon_Drill.jpeg" },
    { songName: "Sarkar", filepath: "/songs/Sarkar.mp3", coverpath: "/covers/Sarkar.jpeg" },
    { songName: "We_Rollin", filepath: "/songs/We_Rollin.mp3", coverpath: "/covers/We_Rollin.jpeg" }

]

songsItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songName;
})

// audioElement.play;

// Handle play pause event
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Event Listening
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressbar.value = progress;
})

// Search bar
document.getElementById("searchButton").addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput").value;
    // You can perform search-related actions here, such as filtering content.
    console.log("Searching for:", searchInput);
})

progressbar.addEventListener('change', () => {
    audioElement.currentTime = progressbar.value * audioElement.duration / 100;
})

const makeallpalys = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeallpalys();
        const songId = e.target.id; // Get the clicked song ID
        const selectedSong = songs.find(song => song.songName === songId); // Find the selected song in the songs array
        if (selectedSong) {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = selectedSong.filepath; // Set the source to the selected song's filepath
            mastersonginfo.innerText = selectedSong.songName; // Update song name in the bottom bar
            gif.style.opacity = 1; // Show GIF
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});



document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Increment songIndex and wrap around
    updateSongAndPlay();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Decrement songIndex and wrap around
    updateSongAndPlay();
});

function updateSongAndPlay() {
    const selectedSong = songs[songIndex];
    audioElement.src = selectedSong.filepath;
    mastersonginfo.innerText = selectedSong.songName; // Update the song name in the bottom bar
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeallpalys();
    const songItemplay = document.getElementById(selectedSong.songName);
    songItemplay.classList.remove('fa-play-circle');
    songItemplay.classList.add('fa-pause-circle');
    gif.style.opacity = 1; // Show GIF
}



