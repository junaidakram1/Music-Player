const musicWrapper = document.querySelector('.music-wrapper');
const title = document.querySelector('#title');
const logo = document.querySelector('#logo');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('audio');
const progress = document.querySelector('.progress');
const progressWrapper = document.querySelector('.progress-wrapper');
const currentTimeDisplay = document.querySelector('#current-time');


// Loading songs

const songs = ['Big Dawgs - Hanumankind', 'Lalala - bbno$', 'MVP - Shubh'];

let songIndex = 0;


function loadSong(songs) {
    title.innerText = songs;
    audio.src = `songs/${songs}.mp3`;
    logo.src = `img/${songs}.jpg`;
}

loadSong(songs[songIndex]);

// Functions

function pauseSong() {
    musicWrapper.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function playSong() {
    musicWrapper.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function timeProgress(e) {
    const { duration, currentTime } = e.srcElement; //Fetching duration and currentTime from audio tag
    const bar = (currentTime / duration) * 100;
    progress.style.width = `${bar}%`;
}

function timeSlider(e) {
    const width = this.clientWidth; // Gives us full width
    const clickX = e.offsetX; //Gives us width along x-axis as we click
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Formats the time getting from timer fumction into minutes-seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // Calculating minutes
    const remainingSeconds = Math.floor(seconds % 60); // Calculating remaining seconds
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function timer() {
    const currentTime = Math.floor(audio.currentTime);
    currentTimeDisplay.textContent = formatTime(currentTime);
}

function nextSong() {
    songIndex += 1;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Event Listeners

playBtn.addEventListener('click', () => {

    const isPlaying = musicWrapper.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();

    }

});


nextBtn.addEventListener('click', nextSong);

//Event Listener for Previous Song

prevBtn.addEventListener('click', () => {

    songIndex -= 1;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
});

audio.addEventListener('timeupdate', (e) => {

    timeProgress(e);
    timer();
});


progressWrapper.addEventListener('click', timeSlider);

audio.addEventListener('ended', nextSong);




