const axios = require('axios');
const fs = require('fs');

// Lichess API endpoint for puzzles
const PUZZLE_API_URL = 'https://lichess.org/api/puzzle/daily';

// Optional: Lichess API endpoint for random puzzles (uncomment if you prefer random puzzles)
// const PUZZLE_API_URL = 'https://lichess.org/api/puzzle/random';

async function fetchPuzzle() {
    try {
        console.log('Fetching chess puzzle from Lichess...');
        
        // Make GET request to Lichess API
        const response = await axios.get(PUZZLE_API_URL);
        const puzzle = await response.data;
        
        console.log('Successfully fetched puzzle:');
        console.log('----------------------------------------');
        console.log(`Puzzle ID: ${puzzle.puzzle.id}`);
        console.log(`Rating: ${puzzle.puzzle.rating}`);
        console.log(`Themes: ${puzzle.puzzle.themes.join(', ')}`);
        console.log(`Solution: ${puzzle.puzzle.solution.join(' ')}`);
        console.log(`Themes: ${puzzle.puzzle.themes}`);
        console.log(`URL: https://lichess.org/training/${puzzle.puzzle.id}`);
        console.log('----------------------------------------');
        
        // Save puzzle to a JSON file
        fs.writeFileSync('chess_puzzle.json', JSON.stringify(puzzle.puzzle, null, 2));
        console.log('Puzzle saved to chess_puzzle.json');
        
        return puzzle;
    } catch (error) {
        console.error('Error fetching puzzle:', error.message);
        process.exit(1);
    }
}

// Execute the function
fetchPuzzle();