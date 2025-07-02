// omdb-to-extended.cjs
const fs = require('fs');
const path = require('path');

console.log('Current working directory:', process.cwd());

// Try multiple approaches to find the file
const possiblePaths = [
  './omdb-fetcher/movies.json',
  'omdb-fetcher/movies.json',
  path.join(process.cwd(), 'omdb-fetcher', 'movies.json'),
  path.resolve('omdb-fetcher/movies.json')
];

let INPUT = null;
let OUTPUT = null;

// Test each possible path
for (const testPath of possiblePaths) {
  console.log('Testing path:', testPath);
  try {
    if (fs.existsSync(testPath)) {
      INPUT = testPath;
      console.log('✅ Found input file at:', INPUT);
      
      // Determine output path based on input path
      if (testPath.startsWith('./') || testPath.startsWith('omdb-fetcher/')) {
        OUTPUT = path.join(process.cwd(), 'src', 'data', 'extendedProjects.ts');
      } else {
        OUTPUT = path.join(path.dirname(testPath), '..', 'src', 'data', 'extendedProjects.ts');
      }
      break;
    }
  } catch (err) {
    console.log('Path test failed:', err.message);
  }
}

if (!INPUT) {
  console.error('❌ Could not find movies.json. Tried these paths:');
  possiblePaths.forEach(p => console.log('  -', p));
  
  // List files in current directory to help debug
  console.log('\nFiles in current directory:');
  try {
    const files = fs.readdirSync('.');
    files.forEach(file => console.log('  -', file));
  } catch (err) {
    console.log('Could not read current directory:', err.message);
  }
  
  // List files in omdb-fetcher if it exists
  console.log('\nFiles in omdb-fetcher directory:');
  try {
    const omdbFiles = fs.readdirSync('./omdb-fetcher');
    omdbFiles.forEach(file => console.log('  -', file));
  } catch (err) {
    console.log('Could not read omdb-fetcher directory:', err.message);
  }
  
  process.exit(1);
}

console.log('Output will be written to:', OUTPUT);

const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Malayalam'];
const timeLefts = ['2 days', '3 days', '5 days', '7 days', '10 days', '14 days'];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomFunding() {
  const targetAmount = Math.floor(Math.random() * 50000000) + 50000000;
  const fundedPercentage = Math.floor(Math.random() * 100);
  const raisedAmount = Math.floor((targetAmount * fundedPercentage) / 100);
  return { targetAmount, raisedAmount, fundedPercentage };
}

try {
  console.log('Reading file:', INPUT);
  const fileContent = fs.readFileSync(INPUT, 'utf8');
  console.log('File size:', fileContent.length, 'characters');
  
  const movies = JSON.parse(fileContent);
  console.log(`✅ Found ${movies.length} movies in the JSON file`);
  
  const ts = `import { Project } from '../components/admin/AdminContext';

export const extendedProjects: Project[] = [
${movies.map((movie, index) => {
  const { targetAmount, raisedAmount, fundedPercentage } = generateRandomFunding();
  
  return `  {
    id: "${index + 1}",
    title: ${JSON.stringify(movie.Title)},
    type: "film",
    category: "Hollywood",
    status: "active",
    fundedPercentage: ${fundedPercentage},
    targetAmount: ${targetAmount},
    raisedAmount: ${raisedAmount},
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
    poster: ${JSON.stringify(movie.Poster)},
    description: ${JSON.stringify(movie.Plot)},
    director: ${JSON.stringify(movie.Director)},
    genre: ${JSON.stringify(movie.Genre)},
    tags: [${movie.Genre ? movie.Genre.split(', ').map(g => JSON.stringify(g.trim())).join(', ') : '""'}],
    perks: ["Behind-the-scenes", "Signed Poster", "Premiere Invite"],
    rating: ${(Math.random() * 2 + 3).toFixed(1)},
    trailer: ${JSON.stringify(movie.Trailer)},
    language: ${JSON.stringify(randomFrom(languages))},
    timeLeft: ${JSON.stringify(randomFrom(timeLefts))}
  }`;
}).join(',\n')}
];
`;

  fs.writeFileSync(OUTPUT, ts, 'utf8');
  console.log('✅ Successfully updated extendedProjects.ts!');
  console.log(`�� Converted ${movies.length} movies with random language, timeLeft, and funding data`);
} catch (error) {
  console.error('❌ Error processing file:', error.message);
  console.error('Full error:', error);
  process.exit(1);
}