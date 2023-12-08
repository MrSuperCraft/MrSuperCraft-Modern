// Assuming you have your Spotify API credentials
const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;

// Authenticate and get the access token
const authenticate = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
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

// Main function to orchestrate everything
const main = async () => {
  try {
    const token = await authenticate();
    const artistURI = 'spotify:artist:1tEFFbxotubUSWVUqCowki';
    const artistId = artistURI.split(':artist:')[1];
    const discography = await fetchDiscography(token, artistId);
    console.log('Discography:', discography); // Log the discography data
    renderResults(discography);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Run the main function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');
  main();
});

// Assume you have a div with id="songlist" in Songlist.astro for rendering
const songlistDiv = document.getElementById('songlist');

const renderResults = (discography) => {
  console.log('Rendering discography:', discography);
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
      console.log('Processing item:', item);
      if (item) {
        const albumName = item.name;
        const artists = item.artists.map(artist => artist.name).join(', '); // Concatenate multiple artists
        const imageUrl = item.images && item.images.length > 0 ? item.images[0].url : 'placeholder-image-url.jpg';

        const albumDiv = document.createElement('div');
        albumDiv.style.maxWidth = '400px';
        albumDiv.classList.add('w-full', 'sm:w-1/2', 'md:w-1/3', 'lg:w-1/3', 'mb-4', 'text-center', 'flex-shrink-0');
        albumDiv.innerHTML = `
          <img src="${imageUrl}" alt="${albumName}" class="w-full h-full object-cover mb-2 rounded-md">
          <h2 class="text-lg font-semibold">${albumName}</h2>
          <p>${artists}</p> <!-- Display concatenated artists --> <br> <p>Hello World</p>
        `;
        
        releasesContainer.appendChild(albumDiv);
      } else {
        console.error('Invalid discography item:', item);
      }
    });
  } else {
    console.error('Invalid or empty discography:', discography);
  }
};