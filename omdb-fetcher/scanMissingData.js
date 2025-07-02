const fs = require('fs');

const data = JSON.parse(fs.readFileSync('projects.json', 'utf-8'));

function isMockDirector(director) {
  return !director || director === 'Unknown';
}
function isMockDescription(desc) {
  return !desc || desc === 'No description available.';
}
function isMockPoster(poster) {
  return !poster || poster === '';
}
function isMockGenre(genre) {
  return !genre || genre === 'Drama';
}
function isMockTags(tags) {
  return !tags || (tags.length === 1 && tags[0] === 'Drama');
}
function isMockTrailer(trailer) {
  return !trailer || trailer === '';
}

const alwaysMock = ['fundedPercentage', 'targetAmount', 'raisedAmount', 'perks', 'createdAt', 'updatedAt'];

const missingSummary = [];
data.forEach(entry => {
  const missing = [];
  if (isMockDirector(entry.director)) missing.push('director');
  if (isMockDescription(entry.description)) missing.push('description');
  if (isMockPoster(entry.poster)) missing.push('poster');
  if (isMockGenre(entry.genre)) missing.push('genre');
  if (isMockTags(entry.tags)) missing.push('tags');
  if (isMockTrailer(entry.trailer)) missing.push('trailer');
  if (missing.length > 0) {
    missingSummary.push({ title: entry.title, missing });
  }
});

if (missingSummary.length === 0) {
  console.log('All entries have real data for director, description, poster, genre, tags, and trailer!');
} else {
  console.log('Entries with missing (mock) data:');
  missingSummary.forEach(e => {
    console.log(`- ${e.title}: ${e.missing.join(', ')}`);
  });
} 