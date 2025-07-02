const fs = require('fs');
const axios = require('axios');
const path = require('path');

const omdbKey = '452457ab'; // OMDb API Key
const youtubeKey = 'AIzaSyClVDNcfZGt0Wb7Y26DDRYMGBjZzXPE1Yo'; // YouTube API Key

// Input array: add your projects here
const inputProjects = [
  // 20 Famous Bollywood Movies
  { title: 'Sholay', type: 'film' },
  { title: 'Dilwale Dulhania Le Jayenge', type: 'film' },
  { title: '3 Idiots', type: 'film' },
  { title: 'Lagaan', type: 'film' },
  { title: 'Dangal', type: 'film' },
  { title: 'Zindagi Na Milegi Dobara', type: 'film' },
  { title: 'Gully Boy', type: 'film' },
  { title: 'Andhadhun', type: 'film' },
  { title: 'Queen', type: 'film' },
  { title: 'Barfi!', type: 'film' },
  { title: 'Rockstar', type: 'film' },
  { title: 'Article 15', type: 'film' },
  { title: 'Tumbbad', type: 'film' },
  { title: 'Masaan', type: 'film' },
  { title: 'Drishyam', type: 'film' },
  { title: 'Swades', type: 'film' },
  { title: 'Chak De! India', type: 'film' },
  { title: 'PK', type: 'film' },
  { title: 'Kahaani', type: 'film' },
  { title: 'Taare Zameen Par', type: 'film' },

  // 20 Famous Hindi Movies (some overlap, but including more)
  { title: 'Mughal-e-Azam', type: 'film' },
  { title: 'Mother India', type: 'film' },
  { title: 'Pyaasa', type: 'film' },
  { title: 'Deewaar', type: 'film' },
  { title: 'Kabhi Khushi Kabhie Gham', type: 'film' },
  { title: 'Dil Chahta Hai', type: 'film' },
  { title: 'Black', type: 'film' },
  { title: 'Munna Bhai M.B.B.S.', type: 'film' },
  { title: 'Rang De Basanti', type: 'film' },
  { title: 'Piku', type: 'film' },
  { title: 'Badhaai Ho', type: 'film' },
  { title: 'Stree', type: 'film' },
  { title: 'Haider', type: 'film' },
  { title: 'A Wednesday!', type: 'film' },
  { title: 'Bhool Bhulaiyaa', type: 'film' },
  { title: 'Don', type: 'film' },
  { title: 'Satyam Shivam Sundaram', type: 'film' },
  { title: 'Gol Maal', type: 'film' },
  { title: 'Chhichhore', type: 'film' },
  { title: 'Bajrangi Bhaijaan', type: 'film' },

  // 20 Famous Hollywood Movies
  { title: 'The Shawshank Redemption', type: 'film' },
  { title: 'The Godfather', type: 'film' },
  { title: 'The Dark Knight', type: 'film' },
  { title: 'Pulp Fiction', type: 'film' },
  { title: 'Forrest Gump', type: 'film' },
  { title: 'Inception', type: 'film' },
  { title: 'Fight Club', type: 'film' },
  { title: 'The Matrix', type: 'film' },
  { title: 'The Social Network', type: 'film' },
  { title: 'The Wolf of Wall Street', type: 'film' },
  { title: 'Titanic', type: 'film' },
  { title: 'Gladiator', type: 'film' },
  { title: 'Interstellar', type: 'film' },
  { title: 'Joker', type: 'film' },
  { title: 'Black Panther', type: 'film' },
  { title: 'Doctor Strange', type: 'film' },
  { title: 'Iron Man', type: 'film' },
  { title: 'The Avengers', type: 'film' },
  { title: 'Avengers: Endgame', type: 'film' },
  { title: 'Avatar', type: 'film' },

  // 20 Bollywood Webseries
  { title: 'Sacred Games', type: 'webseries' },
  { title: 'Mirzapur', type: 'webseries' },
  { title: 'Paatal Lok', type: 'webseries' },
  { title: 'The Family Man', type: 'webseries' },
  { title: 'Delhi Crime', type: 'webseries' },
  { title: 'Made in Heaven', type: 'webseries' },
  { title: 'Breathe', type: 'webseries' },
  { title: 'Kota Factory', type: 'webseries' },
  { title: 'Aarya', type: 'webseries' },
  { title: 'Asur', type: 'webseries' },
  { title: 'Criminal Justice', type: 'webseries' },
  { title: 'Hostages', type: 'webseries' },
  { title: 'Inside Edge', type: 'webseries' },
  { title: 'TVF Pitchers', type: 'webseries' },
  { title: 'TVF Tripling', type: 'webseries' },
  { title: 'Little Things', type: 'webseries' },
  { title: 'Jamtara', type: 'webseries' },
  { title: 'Rangbaaz', type: 'webseries' },
  { title: 'Ghoul', type: 'webseries' },
  { title: 'Special OPS', type: 'webseries' },

  // 20 Hollywood Webseries
  { title: 'Stranger Things', type: 'webseries' },
  { title: 'Breaking Bad', type: 'webseries' },
  { title: 'Game of Thrones', type: 'webseries' },
  { title: 'The Witcher', type: 'webseries' },
  { title: 'The Crown', type: 'webseries' },
  { title: 'The Mandalorian', type: 'webseries' },
  { title: 'Money Heist', type: 'webseries' },
  { title: 'The Boys', type: 'webseries' },
  { title: "The Queen's Gambit", type: 'webseries' },
  { title: 'House of Cards', type: 'webseries' },
  { title: 'Westworld', type: 'webseries' },
  { title: 'Narcos', type: 'webseries' },
  { title: 'Dark', type: 'webseries' },
  { title: 'Ozark', type: 'webseries' },
  { title: 'The Umbrella Academy', type: 'webseries' },
  { title: 'Peaky Blinders', type: 'webseries' },
  { title: 'Black Mirror', type: 'webseries' },
  { title: 'Lost', type: 'webseries' },
  { title: 'Sherlock', type: 'webseries' },
  { title: 'Better Call Saul', type: 'webseries' },

  // 20 Mixed Movies and Webseries (International)
  { title: 'Parasite', type: 'film' },
  { title: 'Spirited Away', type: 'film' },
  { title: 'Crouching Tiger, Hidden Dragon', type: 'film' },
  { title: 'Amélie', type: 'film' },
  { title: "Pan's Labyrinth", type: 'film' },
  { title: 'City of God', type: 'film' },
  { title: 'Oldboy', type: 'film' },
  { title: 'Roma', type: 'film' },
  { title: 'Life Is Beautiful', type: 'film' },
  { title: 'Cinema Paradiso', type: 'film' },
  { title: 'Narcos: Mexico', type: 'webseries' },
  { title: 'Money Heist: Korea', type: 'webseries' },
  { title: 'Fauda', type: 'webseries' },
  { title: 'Lupin', type: 'webseries' },
  { title: 'Dark (Germany)', type: 'webseries' },
  { title: 'Sacred Games 2', type: 'webseries' },
  { title: 'The Bridge', type: 'webseries' },
  { title: 'Gomorrah', type: 'webseries' },
  { title: 'Call My Agent!', type: 'webseries' },
  { title: 'Kingdom', type: 'webseries' },
];

// Lists to determine category and language
const bollywoodTitles = [
  'Sholay', 'Dilwale Dulhania Le Jayenge', '3 Idiots', 'Lagaan', 'Dangal', 
  'Zindagi Na Milegi Dobara', 'Gully Boy', 'Andhadhun', 'Queen', 'Barfi!',
  'Rockstar', 'Article 15', 'Tumbbad', 'Masaan', 'Drishyam', 'Swades',
  'Chak De! India', 'PK', 'Kahaani', 'Taare Zameen Par', 'Mughal-e-Azam',
  'Mother India', 'Pyaasa', 'Deewaar', 'Kabhi Khushi Kabhie Gham', 'Dil Chahta Hai',
  'Black', 'Munna Bhai M.B.B.S.', 'Rang De Basanti', 'Piku', 'Badhaai Ho',
  'Stree', 'Haider', 'A Wednesday!', 'Bhool Bhulaiyaa', 'Don',
  'Satyam Shivam Sundaram', 'Gol Maal', 'Chhichhore', 'Bajrangi Bhaijaan'
];

const regionalTitles = [
  'Pushpa', 'RRR', 'KGF', 'Vikram', 'Master', 'Jailer', 'Leo', 'Animal',
  'Kabir Singh', 'Arjun Reddy', 'Baahubali', 'Magadheera', 'Eega'
];

const indianWebseries = [
  'Sacred Games', 'Mirzapur', 'Paatal Lok', 'The Family Man', 'Delhi Crime',
  'Made in Heaven', 'Breathe', 'Kota Factory', 'Aarya', 'Asur',
  'Criminal Justice', 'Hostages', 'Inside Edge', 'TVF Pitchers', 'TVF Tripling',
  'Little Things', 'Jamtara', 'Rangbaaz', 'Ghoul', 'Special OPS'
];

const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali'];
const timeLefts = ['2 days', '3 days', '5 days', '7 days', '10 days', '14 days', '21 days', '30 days'];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function determineCategoryAndLanguage(title, type, omdbData) {
  const lowerTitle = title.toLowerCase();
  
  // Check for Bollywood films
  if (bollywoodTitles.some(t => lowerTitle.includes(t.toLowerCase()))) {
    return { category: 'Bollywood', language: 'Hindi' };
  }
  
  // Check for Regional films
  if (regionalTitles.some(t => lowerTitle.includes(t.toLowerCase()))) {
    return { category: 'Regional', language: randomFrom(['Tamil', 'Telugu', 'Malayalam']) };
  }
  
  // Check for Indian webseries
  if (type === 'webseries' && indianWebseries.some(t => lowerTitle.includes(t.toLowerCase()))) {
    return { category: 'Indian', language: 'Hindi' };
  }
  
  // Check OMDB data for country/language hints
  if (omdbData?.Country) {
    const country = omdbData.Country.toLowerCase();
    if (country.includes('india')) {
      return { category: 'Bollywood', language: 'Hindi' };
    }
    if (country.includes('korea')) {
      return { category: 'International', language: 'Korean' };
    }
    if (country.includes('japan')) {
      return { category: 'International', language: 'Japanese' };
    }
    if (country.includes('france')) {
      return { category: 'International', language: 'French' };
    }
    if (country.includes('spain')) {
      return { category: 'International', language: 'Spanish' };
    }
  }
  
  // Default to Hollywood for English titles or unknown
  return { category: 'Hollywood', language: 'English' };
}

function generateRandomFunding(type) {
  const targetAmount = type === 'film' ? 
    Math.floor(Math.random() * 50000000) + 10000000 : // 10M to 60M for films
    Math.floor(Math.random() * 20000000) + 5000000;   // 5M to 25M for webseries
  
  const fundedPercentage = Math.floor(Math.random() * 100) + 1; // 1% to 100%
  const raisedAmount = Math.floor((targetAmount * fundedPercentage) / 100);
  
  return { targetAmount, raisedAmount, fundedPercentage };
}

function mockData(field, type) {
  const mocks = {
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: 'No description available.',
    director: 'Unknown',
    genre: 'Drama',
    tags: ['Drama'],
    perks: ['Behind-the-scenes', 'Signed Poster', 'Premiere Invite'],
    rating: 4 + Math.random(),
  };
  return mocks[field];
}

async function fetchOMDb(title) {
  const url = `http://www.omdbapi.com/?apikey=${omdbKey}&t=${encodeURIComponent(title)}`;
  try {
    const res = await axios.get(url);
    return res.data && res.data.Response === 'True' ? res.data : null;
  } catch {
    return null;
  }
}

async function fetchYouTubeTrailer(title) {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(title + ' official trailer')}&key=${youtubeKey}&type=video&maxResults=1`;
  try {
    const res = await axios.get(searchUrl);
    const videoId = res.data.items[0]?.id?.videoId;
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';
  } catch {
    return '';
  }
}

function toProjectSchema({ input, omdb, trailer, idx }) {
  const type = input.type;
  const { category, language } = determineCategoryAndLanguage(input.title, type, omdb);
  const { targetAmount, raisedAmount, fundedPercentage } = generateRandomFunding(type);
  
  return {
    id: (idx + 1).toString(),
    title: omdb?.Title || input.title,
    type,
    category,
    language,
    status: mockData('status', type),
    fundedPercentage,
    targetAmount,
    raisedAmount,
    createdAt: mockData('createdAt', type),
    updatedAt: mockData('updatedAt', type),
    poster: omdb?.Poster && omdb.Poster !== 'N/A' ? omdb.Poster : undefined,
    description: omdb?.Plot || mockData('description', type),
    director: omdb?.Director || mockData('director', type),
    genre: omdb?.Genre || mockData('genre', type),
    tags: omdb?.Genre ? omdb.Genre.split(',').map(g => g.trim()) : mockData('tags', type),
    perks: mockData('perks', type),
    rating: omdb?.imdbRating ? parseFloat(omdb.imdbRating) / 2 : mockData('rating', type),
    trailer: trailer || '',
    timeLeft: randomFrom(timeLefts)
  };
}

async function main() {
  const projects = [];
  for (let i = 0; i < inputProjects.length; i++) {
    const input = inputProjects[i];
    console.log(`Fetching: ${input.title}`);
    const [omdb, trailer] = await Promise.all([
      fetchOMDb(input.title),
      fetchYouTubeTrailer(input.title)
    ]);
    console.log('OMDb data:', omdb);
    console.log('YouTube trailer:', trailer);
    projects.push(toProjectSchema({ input, omdb, trailer, idx: i }));
  }

  // Write directly to TypeScript file in the required format
  const outputPath = path.join(__dirname, '../src/data/extendedProjects.ts');
  const fileContent = `import { Project } from '../types';\n\nexport const extendedProjects: Project[] = ${JSON.stringify(projects, null, 2)};\n`;
  fs.writeFileSync(outputPath, fileContent, 'utf8');
  console.log(`✅ extendedProjects.ts generated at ${outputPath}`);
  console.log(`📊 Generated ${projects.length} projects with accurate categories and languages`);
}

main(); 