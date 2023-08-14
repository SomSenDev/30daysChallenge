// Define an array of audio tracks
const audioTracks = [
    // Add more audio tracks here
    'Media/109-al-kafirun.mp3',
    'Media/110-an-nasr.mp3',
    'Media/111-al-masad.mp3',
    'Media/112-al-ikhlas.mp3',
    'Media/113-al-falaq.mp3',
    'Media/114-an-nas.mp3',
];

// Initialize the index of the currently playing track
let currentTrackIndex = 0;

// Create an audio element for playing audio tracks
const audio = new Audio(audioTracks[currentTrackIndex]);

// Get references to various elements in the HTML document
const progressBar = document.querySelector('.progressBar');
const startTimestamp = document.querySelector('.start');
const endTimestamp = document.querySelector('.end');
const playPauseButton = document.querySelector('.play');
const previousButton = document.querySelector('.previous');
const forwardButton = document.querySelector('.forward');
const title = document.querySelector('.title');

// Flag to keep track of play/pause state
let isPlaying = false;

// Add event listeners to buttons and audio element
playPauseButton.addEventListener('click', togglePlayPause);
previousButton.addEventListener('click', playPrevious);
forwardButton.addEventListener('click', playForward);
audio.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('input', seek);
audio.addEventListener('ended', ()=>{
    isPlaying =false;
    updatePlayPauseIcon();
});
//add event listeners to keyboard
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        togglePlayPause();
    }
    if (event.code === 'ArrowLeft') {
        playPrevious();
    }
    if (event.code === 'ArrowRight') {
        playForward();
    }
});


window.addEventListener('load', resetAudioPlayer);

// Initialize the first audio track when metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    endTimestamp.textContent = formatTime(audio.duration);
    title.textContent = audioTracks[currentTrackIndex].split('/').pop().split('.')[0];
});

// Function to toggle play and pause
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
}

// Function to play the previous track
function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + audioTracks.length) % audioTracks.length;
    changeTrack();
}

// Function to play the next track
function playForward() {
    currentTrackIndex = (currentTrackIndex + 1) % audioTracks.length;
    changeTrack();
}

// // Function to play the next track when the current track ends
// function playNext() {
//     playForward();
// }

// Function to change the currently playing track
function changeTrack() {
    audio.src = audioTracks[currentTrackIndex];
    audio.load();
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();
}

// Function to update the progress bar and timestamps
function updateProgressBar() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    startTimestamp.textContent = formatTime(currentTime);
    endTimestamp.textContent = formatTime(duration);

    const percent = (currentTime / duration) * 100;
    progressBar.value = percent;

}

// Function to seek to a specific position in the track
function seek() {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

// Function to format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Function to update the play/pause button icon
function updatePlayPauseIcon() {
    playPauseButton.src = isPlaying ? '/images/play.png': '/images/pause.png' ;
}

// Function to reset the audio player when the page is loaded
function resetAudioPlayer() {
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    updatePlayPauseIcon();
    updateProgressBar();
}
