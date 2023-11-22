
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const skipBtn = document.getElementById('skip');
const volumeSlider = document.getElementById('volume');
const coverArt = document.getElementById('cover-art');
const progressBar = document.getElementById('progress');

const audioList = [
  {
    src: "../audio/Endless Tide.mp3",
    coverArt: "../images/coverart/feelingsAlbum.png",
  },
  {
    src: "../audio/Elevator Music.mp3",
    coverArt: "../images/coverart/Memories Of You.png",
  },
  // Add more audio file and cover art objects as needed
];

let currentAudioIndex = 0;

function loadCurrentAudio() {
  audio.src = audioList[currentAudioIndex].src;
  updateCoverArt();
}

function updateCoverArt() {
  coverArt.src = audioList[currentAudioIndex].coverArt;
}

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    audio.pause();
    playPauseBtn.textContent = 'Play';
  }
});

skipBtn.addEventListener('click', () => {
  // Implement logic to skip to the next track
  currentAudioIndex = (currentAudioIndex + 1) % audioList.length;
  loadCurrentAudio();
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value / 100;
});

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
});

progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value * audio.duration) / 100;
  audio.currentTime = seekTime;
});

// Load the first audio file on initial setup
loadCurrentAudio();

// Add console logs for debugging
audio.addEventListener('play', () => console.log('Playing'));
audio.addEventListener('pause', () => console.log('Paused'));