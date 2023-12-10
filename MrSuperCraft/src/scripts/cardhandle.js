// Assume you have your Spotify API credentials
const SPOTIFY_CLIENT_ID = import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.PUBLIC_SPOTIFY_CLIENT_SECRET;

// Authenticate and get the access token
const authenticate = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET),
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
};

// Fetch your discography
const fetchDiscography = async (token, artistId) => {
  const endpoint = artistId ? `https://api.spotify.com/v1/artists/${artistId}/albums` : 'https://api.spotify.com/v1/me/albums';

  const response = await fetch(endpoint, {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  });

  const data = await response.json();
  return data.items || [];
};

document.addEventListener('DOMContentLoaded', async () => {

  
  try {
    const token = await authenticate();
    const ARTIST_URI = 'spotify:artist:1tEFFbxotubUSWVUqCowki';
    const artistId = ARTIST_URI.split(':artist:')[1];
    const discography = await fetchDiscography(token, artistId);
    
    console.log('Discography:', discography); // Log the discography data
    renderResults(discography);

    // Check if there is a releaseId parameter in the URL
    const releaseId = getParameterByName('releaseId');
    console.log('Release ID:', releaseId);

    if (releaseId && discography.length > 0) {
      // Find the corresponding item in the discography
      const item = discography.find((item) => item.id === releaseId);
      console.log('Found Item:', item);

      if (item) {
        // Open the modal with the found item
        openModal(item);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Function to parse URL parameters
const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

// Function to update URL parameters
function updateUrlParameter(url, key, value) {
  const urlObject = new URL(url);
  const searchParams = new URLSearchParams(urlObject.search);

  if (value === null) {
    searchParams.delete(key);
  } else {
    searchParams.set(key, value);
  }

  urlObject.search = searchParams.toString();
  return urlObject.toString();
}

let discography = []; // Declare discography globally


// Run the main function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');

  // Check if there is a releaseId parameter in the URL
  const releaseId = getParameterByName('releaseId');
  if (releaseId && discography.length > 0) {
    // Find the corresponding item in the discography
    const item = discography.find((item) => item.id === releaseId);
    if (item) {
      // Open the modal with the found item
      openModal(item);
    }
  }
});

// Assume you have a div with id="songlist" in Songlist.astro for rendering
const songlistDiv = document.getElementById('songlist');

const renderResults = (discography) => {
  songlistDiv.innerHTML = ''; // Clear existing content

  if (discography && discography.length > 0) {
    const releasesWrapper = document.createElement('div');
    releasesWrapper.classList.add('mx-auto');
    
    const releasesContainer = document.createElement('div');
    releasesContainer.classList.add('flex', 'flex-wrap', 'gap-8', 'items-center', 'justify-center');
    releasesContainer.style.margin = 'auto';

    releasesWrapper.appendChild(releasesContainer);
    songlistDiv.appendChild(releasesContainer);

    discography.forEach(item => {
      if (item) {
        // Generate shareable link with release ID

        const albumName = item.name;
        const artists = item.artists.map(artist => artist.name).join(', '); // Concatenate multiple artists
        const imageUrl = item.images && item.images.length > 0 ? item.images[0].url : 'placeholder-image-url.jpg';

        // Create the album div
        const albumDiv = document.createElement('div');
        albumDiv.style.maxWidth = '400px';
        albumDiv.classList.add('w-full', 'sm:w-1/2', 'md:w-1/3', 'lg:w-1/3', 'mb-4', 'text-center', 'flex-shrink-0', 'shadow-xl', 'transition-all', 'hover:-translate-y-2', 'hover:shadow-3xl', 'rounded-md', 'dark:bg-slate-600');
        
        // HTML content for the album div
        albumDiv.innerHTML = `
          <img src="${imageUrl}" alt="${albumName}" class="w-full h-full object-cover mb-2 rounded-md cursor-pointer">
          <h2 class="text-lg font-semibold delay-0">${albumName}</h2>
          <p class="pb-3 delay-0">${artists}</p> <!-- Display concatenated artists -->
        `;

        // Add a click event listener to each albumDiv to open the modal
        albumDiv.addEventListener('click', () => {
          openModal(item);
        });

        // Append the album div to the releases container
        releasesContainer.appendChild(albumDiv);
      } else {
        console.error('Invalid discography item:', item);
      }
    });
  } else {
    console.error('Invalid or empty discography:', discography);
    const errDiv = document.createElement('div');
    errDiv.innerHTML = `<p class="flex self-center bold text-xl text-center">Error 404<p>`

    songlistDiv.appendChild(errDiv);
  }
};

// Function to open the modal with item details
const openModal = (item) => {
  const modal = document.getElementById('myModal');
  const modalContent = document.getElementById('modalContent');

  if (!modal || !modalContent) {
    console.error('Modal elements not found');
    return;
  }

  // Add releaseId to the URL without triggering a page refresh
  const releaseId = item.id;
  const newUrl = updateUrlParameter(window.location.href, 'releaseId', releaseId);
  history.pushState({ path: newUrl }, '', newUrl);

  // Clear previous content
  modalContent.innerHTML = '';

  // Populate modal content with item details
  const content = document.createElement('div');

  let albumType = item.album_type.charAt(0).toUpperCase() + item.album_type.slice(1);

  function formatDate(originalDate) {
    const [year, month, day] = originalDate.split('-');
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

  // Usage in your code
  let releaseDate = formatDate(item.release_date);

  if (item.name == 'Mind Palace' || item.name == 'Contrast') {
    albumType = "EP";
  };

  // HTML content for the modal
  content.innerHTML = `
    <img src="${item.images[0].url}" alt="${item.name}" class="w-full h-full object-cover mb-2 rounded-md">
    <h2 class="text-lg font-semibold">${albumType}: ${item.name}</h2>
    <p class="text-gray-600 dark:text-white">${item.artists.map(artist => artist.name).join(', ')}</p>
    <p class="text-gray-600 mb-3 dark:text-white">Release Date: ${releaseDate}</p>
    <a href=${item.external_urls.spotify} target="_blank" class="mx-auto">
      <button
        class="bg-green-500 mx-auto px-4 py-2 rounded-md text-white cursor-pointer transition duration-500 ease-in-out group hover:bg-white hover:text-black"
      >
        <span class="mr-1">Stream On Spotify</span>
        <div
          class="fa-brands fa-spotify text-lg transition group-hover:text-green-500"
        >
        </div>
      </button>
    </a>
    <div class="mt-4 text-center mb-2">
      <span class="mr-2 text-gray-600 dark:text-white">Share Link:</span>
      <button
        id="copyLinkBtn"
        class="bg-blue-500 px-3 py-1 rounded-md text-white cursor-pointer transition duration-500 ease-in-out hover:bg-white hover:text-blue-500"
      >
        <span class="mr-1">Copy to Clipboard</span>
        <div
          class="fa-regular fa-clipboard text-lg transition hover:text-blue-500"
        >
        </div>
      </button>
    </div>
    <!-- Add more details if needed -->
  `;

  // Append content to modal
  modalContent.appendChild(content);

  // Display the modal
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // Function to close the modal
  const closeModal = () => {
  const modal = document.getElementById('myModal');

  if (!modal) {
    console.error('Modal element not found');
    return;
  }

  // Remove releaseId from the URL without triggering a page refresh
  const newUrl = updateUrlParameter(window.location.href, 'releaseId', null);
  history.replaceState({ path: newUrl }, '', newUrl);

  // Hide the modal
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

  // Close the modal when the close button is clicked
  modal.querySelector('.close').addEventListener('click', () => {
    closeModal();
  });

  // Close the modal when clicking outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Copy to clipboard button event listener
  const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:4321' : 'https://mrsupercraft-landingpage.netlify.app';

  modal.querySelector('#copyLinkBtn').addEventListener('click', () => {
    const shareableLink = `${baseURL}/discography?releaseId=${item.id}`;
    copyToClipboardWithTooltip(shareableLink);
  });
};

async function copyToClipboardWithTooltip(text) {
  try {
    await navigator.clipboard.writeText(text);
    const snackbar = document.getElementById("snackbar");

    // Add dynamic text to the snackbar
    const successMessage = "Link copied successfully!";
    snackbar.textContent = successMessage;

    // Add the "show" class to DIV
    snackbar.classList.add("show");

    // After 3 seconds, remove the show class from DIV
    setTimeout(() => {
      snackbar.classList.remove("show");
    }, 3000);
  } catch (err) {
    const errorMessage = "Failed to copy link. Copy it manually.";
    snackbar.textContent = errorMessage;

    // Add the "show" class to DIV with error styling
    snackbar.classList.add("show", "error");

    // After 3 seconds, remove the show class from DIV
    setTimeout(() => {
      snackbar.classList.remove("show", "error");
    }, 3000);
  }
}