# OMDb/YouTube Project Metadata Fetcher

This tool generates a `projects.json` file with real metadata for movies and web series, matching your custom Project schema.

## Usage

1. **Edit the input array** in `fetchProjects.js`:
   ```js
   const inputProjects = [
     { title: 'Oppenheimer', type: 'film' },
     { title: 'Sacred Games 3', type: 'webseries' },
     // Add more as needed
   ];
   ```
2. **Run the script:**
   ```sh
   node fetchProjects.js
   ```
3. **Output:**
   - `projects.json` will be created/overwritten with all metadata fields filled (mock data for missing fields).

## Project Schema

Each entry in `projects.json` matches:

```json
{
  "id": "1",
  "title": "Oppenheimer",
  "type": "film",
  "category": "Hollywood",
  "status": "active",
  "fundedPercentage": 90,
  "targetAmount": 100000000,
  "raisedAmount": 90000000,
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-10T10:00:00Z",
  "poster": "https://...",
  "description": "...",
  "director": "...",
  "genre": "...",
  "tags": ["..."],
  "perks": ["..."],
  "rating": 4.5,
  "trailer": "https://..."
}
```

- All fields are always filled (mock data if not available from OMDb/YouTube).
- `type` is either `film` or `webseries`.

## API Keys
- OMDb and YouTube API keys are set in the script. Update them if needed.

## Extending
- Add more fields to the schema in `fetchProjects.js` as needed.
- Add more projects to the input array. 