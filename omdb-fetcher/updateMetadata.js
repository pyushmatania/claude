
const fs = require('fs');
const axios = require('axios');

const omdbKey = '452457ab'; // OMDb API Key
const youtubeKey = 'AIzaSyClVDNcfZGt0Wb7Y26DDRYMGBjZzXPE1Yo'; // YouTube API Key
const filePath = './movies.json';

async function fetchMovieData(title) {
  const url = `http://www.omdbapi.com/?apikey=${omdbKey}&t=${encodeURIComponent(title)}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(`OMDb failed for: ${title}`, err.message);
    return null;
  }
}

async function fetchYouTubeTrailer(title) {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(title + " official trailer")}&key=${youtubeKey}&type=video&maxResults=1`;
  try {
    const res = await axios.get(searchUrl);
    const videoId = res.data.items[0]?.id?.videoId;
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : "";
  } catch (err) {
    console.error(`YouTube failed for: ${title}`, err.message);
    return "";
  }
}

async function updateMetadata() {
  const rawData = fs.readFileSync(filePath);
  const movies = JSON.parse(rawData);

  for (let movie of movies) {
    console.log(`🔍 Updating: ${movie.Title}`);

    const [omdb, trailer] = await Promise.all([
      fetchMovieData(movie.Title),
      fetchYouTubeTrailer(movie.Title)
    ]);

    if (omdb && omdb.Response === "True") {
      movie.Year = omdb.Year || movie.Year;
      movie.Genre = omdb.Genre || movie.Genre;
      movie.Language = omdb.Language || movie.Language;
      movie.Director = omdb.Director || movie.Director;
      movie.Actors = omdb.Actors || movie.Actors;
      movie.Plot = omdb.Plot || movie.Plot;
      movie.Poster = omdb.Poster !== "N/A" ? omdb.Poster : movie.Poster;
      movie.IMDB_ID = omdb.imdbID || movie.IMDB_ID;
    }

    if (trailer) {
      movie.Trailer = trailer;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(movies, null, 4));
  console.log(`✅ Metadata updated with YouTube trailers!`);
}

updateMetadata();
