const axios = require('axios');
const { spawn } = require('child_process');
const fs = require('fs');

// Lichess API endpoint for puzzles
const PUZZLE_API_URL = 'https://lichess.org/api/puzzle/daily';

// Stockfish configuration
const STOCKFISH_PATH = 'stockfish'; // Make sure Stockfish is in your PATH or provide full path
const STOCKFISH_DEPTH = 18; // Higher depth = more accurate analysis (but slower)

async function fetchAndAnalyzePuzzle() {
    try {
        console.log('Fetching chess puzzle from Lichess...');
        const response = await axios.get(PUZZLE_API_URL);
        const puzzle = response.data;
        
        console.log('\nPuzzle Details:');
        console.log('----------------------------------------');
        console.log(`Puzzle ID: ${puzzle.id}`);
        console.log(`FEN: ${puzzle.fen}`);
        console.log(`Rating: ${puzzle.rating}`);
        console.log(`Themes: ${puzzle.themes.join(', ')}`);
        console.log(`Lichess Solution: ${puzzle.solution.join(' ')}`);
        console.log('----------------------------------------\n');

        console.log('Analyzing with Stockfish...');
        const stockfishAnalysis = await analyzePosition(puzzle.fen, puzzle.solution);
        
        console.log('\nStockfish Analysis:');
        console.log('----------------------------------------');
        console.log(`Best Moves: ${stockfishAnalysis.bestMoves.join(' ')}`);
        console.log(`Evaluation: ${stockfishAnalysis.evaluation}`);
        console.log(`Depth: ${stockfishAnalysis.depth}`);
        console.log('----------------------------------------\n');

        // Save results to file
        const result = {
            puzzle: puzzle,
            stockfishAnalysis: stockfishAnalysis
        };
        fs.writeFileSync('puzzle_analysis.json', JSON.stringify(result, null, 2));
        console.log('Analysis saved to puzzle_analysis.json');

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

function analyzePosition(fen, solutionMoves) {
    return new Promise((resolve, reject) => {
        const stockfish = spawn(STOCKFISH_PATH);
        let bestMoves = [];
        let evaluation = '';
        let depthReached = 0;

        stockfish.stdin.write(`setoption name Threads value 4\n`);
        stockfish.stdin.write(`position fen ${fen}\n`);
        stockfish.stdin.write(`go depth ${STOCKFISH_DEPTH}\n`);

        stockfish.stdout.on('data', (data) => {
            const lines = data.toString().split('\n');
            
            lines.forEach(line => {
                if (line.startsWith('info depth')) {
                    const depthMatch = line.match(/depth (\d+)/);
                    if (depthMatch) depthReached = Math.max(depthReached, parseInt(depthMatch[1]));
                    
                    const evalMatch = line.match(/score cp (-?\d+)/) || line.match(/score mate (-?\d+)/);
                    if (evalMatch) {
                        evaluation = evalMatch[0].includes('mate') ? 
                            `Mate in ${Math.abs(parseInt(evalMatch[1]))} (${evalMatch[1] > 0 ? 'White' : 'Black'} mates)` :
                            `Centipawns: ${evalMatch[1]} (${evalMatch[1] > 0 ? 'White' : 'Black'} advantage)`;
                    }
                }

                if (line.startsWith('bestmove')) {
                    const move = line.split(' ')[1];
                    if (move && move !== '(none)') {
                        bestMoves.push(move);
                        // If we have solution moves, continue analyzing the line
                        if (bestMoves.length < solutionMoves.length) {
                            stockfish.stdin.write(`position fen ${fen} moves ${bestMoves.join(' ')}\n`);
                            stockfish.stdin.write(`go depth ${STOCKFISH_DEPTH}\n`);
                        } else {
                            stockfish.stdin.write('quit\n');
                            resolve({
                                bestMoves,
                                evaluation,
                                depth: depthReached
                            });
                        }
                    }
                }
            });
        });

        stockfish.on('error', (err) => {
            reject(new Error(`Stockfish error: ${err.message}`));
        });

        stockfish.on('close', (code) => {
            if (code !== 0 && bestMoves.length === 0) {
                reject(new Error(`Stockfish process exited with code ${code}`));
            }
        });
    });
}

// Execute the function
fetchAndAnalyzePuzzle();