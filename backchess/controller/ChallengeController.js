const Challenge = require('../model/Challenge');

// Create a new challenge
exports.create = async (req, res) => {
  try {
    const { participants, puzzles, numberOfPuzzles, status, winner } = req.body;
    const challenge = await Challenge.create({
      participants,
      puzzles,
      numberOfPuzzles,
      status,
      winner,
    });
    res.status(201).json(challenge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all challenges
exports.fetchAll = async (req, res) => {
  try {
    const challenges = await Challenge.findAll();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a challenge by ID
exports.fetchById = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (challenge) {
      res.status(200).json(challenge);
    } else {
      res.status(404).json({ error: 'Challenge not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a challenge
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { participants, puzzles, numberOfPuzzles, status, winner } = req.body;

    const [updated] = await Challenge.update(
      { participants, puzzles, numberOfPuzzles, status, winner },
      { where: { id } }
    );

    if (updated) {
      const updatedChallenge = await Challenge.findByPk(id);
      res.status(200).json(updatedChallenge);
    } else {
      res.status(404).json({ error: 'Challenge not found or no changes made' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a challenge
exports.delete = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (challenge) {
      await challenge.destroy();
      res.status(200).json({ message: 'Challenge deleted successfully' });
    } else {
      res.status(404).json({ error: 'Challenge not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};