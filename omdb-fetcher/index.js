
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Your movie titles
const movies = [
  // Hindi Movies
  "3 Idiots",
  "Bahubali: The Beginning",
  "Bahubali 2: The Conclusion",
  "Dangal",
  "Lagaan",
  "PK",
  "Sholay",
  "Zindagi Na Milegi Dobara",
  "Gully Boy",
  "Andhadhun",
  "Queen",
  "Rockstar",
  "Article 15",
  "Tumbbad",
  "Barfi",
  "Masaan",
  "Drishyam",
  "Kahaani",
  "Swades",
  "Chak De! India",

  // English Movies
  "The Avengers",
  "Avengers: Endgame",
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Titanic",
  "Avatar",
  "Forrest Gump",
  "Gladiator",
  "Joker",
  "Iron Man",
  "The Matrix",
  "The Godfather",
  "Pulp Fiction",
  "The Shawshank Redemption",
  "Fight Club",
  "The Social Network",
  "The Wolf of Wall Street",
  "Doctor Strange",
  "Black Panther"
];


const apiKey = '452457ab'; // Your OMDb API Key

// Helper to download image
async function downloadImage(url, filename) {
  const response = await axios({ url, responseType: 'stream' });
  const writer = fs.createWriteStream(path.join(__dirname, 'posters', filename));

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

// Main runner
async function fetchMovies() {
  if (!fs.existsSync('./posters')) fs.mkdirSync('./posters');

  for (let title of movies) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
    try {
      const res = await axios.get(url);
      const data = res.data;

      if (data.Response === 'True' && data.Poster && data.Poster !== "N/A") {
        console.log(`🎬 Found: ${data.Title}`);
        const fileName = `${data.Title.replace(/[^a-z0-9]/gi, '_')}.jpg`;
        await downloadImage(data.Poster, fileName);
        console.log(`✅ Downloaded poster: ${fileName}`);
      } else {
        console.log(`❌ Not Found: ${title}`);
      }
    } catch (err) {
      console.error(`🚨 Error fetching ${title}`, err.message);
    }
  }
}

fetchMovies();
