const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const skipBtn = document.getElementById('skip');
const shuffleBtn = document.getElementById('shuffle');
const volumeSlider = document.getElementById('volume');
const coverArt = document.getElementById('cover-art');
const progressBar = document.getElementById('progress');
const artistName = document.getElementById('artist-name');
const songTitle = document.getElementById('song-title');

const audioList = [
  {
    src: "../audio/Endless Tide.mp3",
    coverArt: "../images/coverart/feelingsAlbum.png",
    artistName: "Artist 1",
    songTitle: "Endless Tide",
  },
  {
    src: "../audio/Elevator Music.mp3",
    coverArt: "../images/coverart/Memories Of You.png",
    artistName: "Artist 2",
    songTitle: "Elevator Music",
  },
  // Add more audio file and cover art objects as needed
];

let currentAudioIndex = 0;
let isShuffleMode = false;
let shuffledIndices = Array.from({ length: audioList.length }, (_, index) => index);

let lastShuffledIndex = -1;

function loadCurrentAudio() {
  audio.src = audioList[currentAudioIndex].src;
  updateCoverArt();
  updateTitleAndArtist();
}

function updateCoverArt() {
  coverArt.src = audioList[currentAudioIndex].coverArt;
}

function updateTitleAndArtist() {
  artistName.textContent = audioList[currentAudioIndex].artistName;
  songTitle.textContent = audioList[currentAudioIndex].songTitle;
}

function playNextSong() {
    if (isShuffleMode) {
      let nextShuffledIndex;
      do {
        shuffledIndices = shuffledIndices.sort(() => Math.random() - 0.5);
        nextShuffledIndex = shuffledIndices[0];
      } while (nextShuffledIndex === lastShuffledIndex);
  
      lastShuffledIndex = nextShuffledIndex;
      currentAudioIndex = nextShuffledIndex;
    } else {
      currentAudioIndex = (currentAudioIndex + 1) % audioList.length;
    }
  
    loadCurrentAudio();
    audio.play();
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

skipBtn.addEventListener('click', playNextSong);

shuffleBtn.addEventListener('click', () => {
  isShuffleMode = !isShuffleMode;
  shuffleBtn.textContent = isShuffleMode ? 'Shuffle On' : 'Shuffle Off';
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

audio.addEventListener('ended', playNextSong);

// Load the first audio file on initial setup
loadCurrentAudio();