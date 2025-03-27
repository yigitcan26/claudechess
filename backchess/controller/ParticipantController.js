const Participant = require('../model/Participant');

// Create a new participant
exports.create = async (req, res) => {
  try {
    const { userId, challengeId, score, status, isWinner, puzzleNumber } = req.body;
    const participant = await Participant.create({
      userId,
      challengeId,
      score,
      status,
      isWinner,
      puzzleNumber,
    });
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all participants
exports.fetchAll = async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.status(200).json(participants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a participant by ID
exports.fetchById = async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (participant) {
      res.status(200).json(participant);
    } else {
      res.status(404).json({ error: 'Participant not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a participant
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, challengeId, score, status, isWinner, puzzleNumber } = req.body;

    const [updated] = await Participant.update(
      { userId, challengeId, score, status, isWinner, puzzleNumber },
      { where: { id } }
    );

    if (updated) {
      const updatedParticipant = await Participant.findByPk(id);
      res.status(200).json(updatedParticipant);
    } else {
      res.status(404).json({ error: 'Participant not found or no changes made' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a participant
exports.delete = async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (participant) {
      await participant.destroy();
      res.status(200).json({ message: 'Participant deleted successfully' });
    } else {
      res.status(404).json({ error: 'Participant not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};