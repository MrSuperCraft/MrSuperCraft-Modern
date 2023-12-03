import { audioList } from "./songs";

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const playPauseIcon = document.querySelector('.fa-play');
const skipBtn = document.getElementById('skip');
const shuffleBtn = document.getElementById('shuffle');
const volumeSlider = document.getElementById('volume');
const coverArt = document.getElementById('cover-art');
const progressBar = document.getElementById('progress');
const artistName = document.getElementById('artist-name');
const songTitle = document.getElementById('song-title');


// Shuffling Songs
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
    playPauseIcon.classList.replace('fa-play' , 'fa-pause');
  } else {
    audio.pause();
    playPauseIcon.classList.replace('fa-pause' , 'fa-play');
  }
});

skipBtn.addEventListener('click', playNextSong);

document.addEventListener('DOMContentLoaded', () => {
  const shuffleIcon = document.querySelector('.fa-random');
  const shuffleBtn = document.getElementById('shuffle');

  shuffleBtn.addEventListener('click', () => {
    isShuffleMode = !isShuffleMode;
    shuffleIcon.style.color = isShuffleMode ? '#007aff' : '';
  });
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

//slider progress hover
const progressSlider = document.getElementById('progress');

progressSlider.addEventListener('mouseover', () => {
  progressSlider.classList.remove('thumb-hidden');
});

progressSlider.addEventListener('mouseout', () => {
  progressSlider.classList.add('thumb-hidden');
});



const modal = document.getElementById("myModal");
const modalCoverArt = document.getElementById("modal-cover-art");
const modalDescription = document.getElementById("modal-description");
const closeButton = document.querySelector(".close");

function openModal() {
  const currentReleaseName = audioList[currentAudioIndex].releaseName;
  modalCoverArt.src = coverArt.src;
  modalDescription.innerText = `From the release: ${currentReleaseName}`;

    // Add the fade-in class with a short delay for smoother transition
    setTimeout(() => {
      modal.classList.add("fade-in");
  
      // Use requestAnimationFrame to ensure a repaint before removing hidden class
      requestAnimationFrame(() => {
        modal.classList.remove("hidden");
      });
    }, 10);
}

if (modalDescription && closeButton) {
  const currentReleaseName = audioList[currentAudioIndex].releaseName;
  modalCoverArt.src = coverArt.src;
  modalDescription.innerText = `From the release: ${currentReleaseName}.`;
}

function closeModal() {
  modal.classList.remove("fade-in");
  modal.classList.add("fade-out");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("fade-out");
  }, 500); // Adjust the timeout to match the transition duration
}

document.getElementById("myModal").addEventListener('click', (event) => {
  if (!event.target.matches("#modal-cover-art")) {
    closeModal();
  }
});

document.getElementById("cover-art")?.addEventListener("click", openModal);
document.querySelector(".close")?.addEventListener("click", closeModal);

