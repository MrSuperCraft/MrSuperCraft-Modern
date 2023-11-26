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
    src: "../audio/1. Mind Palace.wav",
    coverArt: "../images/coverart/mindPalace.png",
    artistName: "MrSuperCraft, Brunch Collect",
    releaseName: "Mind Palace",
    songTitle: "Mind Palace",
  },
  {
    src: "../audio/2. Midnight Contemplation.wav",
    coverArt: "../images/coverart/mindPalace.png",
    artistName: "MrSuperCraft, Brunch Collect",
    releaseName: "Mind Palace",
    songTitle: "Midnight Contemplation",
  },
  {
    src: "../audio/3. Fireflies.wav",
    coverArt: "../images/coverart/mindPalace.png",
    artistName: "MrSuperCraft, Brunch Collect",
    releaseName: "Mind Palace",
    songTitle: "Fireflies",
  },
  {
    src: "../audio/4. Solitude.wav",
    coverArt: "../images/coverart/mindPalace.png",
    artistName: "MrSuperCraft, Brunch Collect",
    releaseName: "Mind Palace",
    songTitle: "Solitude",
  },
  {
    src: "../audio/5. Subconscious.wav",
    coverArt: "../images/coverart/mindPalace.png",
    artistName: "MrSuperCraft, Brunch Collect",
    releaseName: "Mind Palace",
    songTitle: "Subconscious",
  },
  {
    src: "../audio/6. Mt. Imagination.wav",
    coverArt: "../images/coverart/mindPalace.png",
    artistName: "MrSuperCraft, Brunch Collect",
    releaseName: "Mind Palace",
    songTitle: "Mt. Imagination",
  },
  {
    src: "../audio/1. Red Skies.wav",
    coverArt: "../images/coverart/SummerStories.png",
    artistName: "MrSuperCraft",
    releaseName: "Summer Stories",
    songTitle: "Red Skies",
  },
  {
    src: "../audio/2. Dusk.wav",
    coverArt: "../images/coverart/SummerStories.png",
    artistName: "MrSuperCraft",
    releaseName: "Summer Stories",
    songTitle: "Dusk",
  },
  {
    src: "../audio/3. Tears Grow Trees.wav",
    coverArt: "../images/coverart/SummerStories.png",
    artistName: "MrSuperCraft",
    releaseName: "Summer Stories",
    songTitle: "Tears Grow Trees",
  },
  {
    src: "../audio/4. False Reality.wav",
    coverArt: "../images/coverart/SummerStories.png",
    artistName: "MrSuperCraft",
    releaseName: "Summer Stories",
    songTitle: "False Reality",
  },
  {
    src: "../audio/5. Heart's Truth.wav",
    coverArt: "../images/coverart/SummerStories.png",
    artistName: "MrSuperCraft",
    releaseName: "Summer Stories",
    songTitle: "Heart's Truth",
  },
  {
    src: "../audio/6. Was then Wasn't.wav",
    coverArt: "../images/coverart/SummerStories.png",
    artistName: "MrSuperCraft",
    releaseName: "Summer Stories",
    songTitle: "Was then Wasn't",
  },
  {
    src: "../audio/7. The End is only The Beginning of Something New.wav",
    coverArt: "../images/coverart/SummerStories.png",
    artistName: "MrSuperCraft",
    releaseName: "Summer Stories",
    songTitle: "The End is only The Beginning of Something New",
  },
  // Add more audio file and cover art objects as needed
];

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
    playPauseBtn.innerHTML = '&#9208;';
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '&#9654;';
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

//slider progress hover
const progressSlider = document.getElementById('progress');

progressSlider.addEventListener('mouseover', () => {
  progressSlider.classList.remove('thumb-hidden');
});

progressSlider.addEventListener('mouseout', () => {
  progressSlider.classList.add('thumb-hidden');
});



// Modal Opener / Closer

// Function to open the modal

const modal = document.getElementById("myModal");
const modalCoverArt = document.getElementById("modal-cover-art");
const modalDescription = document.getElementById("modal-description"); 
const closeButton = document.querySelector(".close");


function openModal() {
  const currentReleaseName = audioList[currentAudioIndex].releaseName;
  // Set modal content based on the active cover art
  modalCoverArt.src = coverArt.src;
  modalDescription.innerText = `From the release: ${currentReleaseName}`;
  modal.classList.remove("hidden");
}

if (modalDescription && closeButton) {
  const currentReleaseName = audioList[currentAudioIndex].releaseName;

  // Set modal content based on the active cover art
  modalCoverArt.src = coverArt.src;
  modalDescription.innerText = `From the release: ${currentReleaseName}`;
  
}


function closeModal() {
  document.getElementById("myModal").classList.add("hidden");
}

// Event listener for opening the modal when cover art is clicked
document.getElementById("cover-art")?.addEventListener("click", openModal);

// Event listener for closing the modal when the close button is clicked
document.querySelector(".close")?.addEventListener("click", closeModal);


