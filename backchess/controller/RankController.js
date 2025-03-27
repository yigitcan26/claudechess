const Rank = require('../model/Rank');

// Create a new rank
exports.create = async (req, res) => {
  try {
    const { name, requirement } = req.body;
    const rank = await Rank.create({ name, requirement });
    res.status(201).json(rank);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ranks
exports.fetchAll = async (req, res) => {
  try {
    const ranks = await Rank.findAll();
    res.status(200).json(ranks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a rank by ID
exports.fetchById = async (req, res) => {
  try {
    const rank = await Rank.findByPk(req.params.id);
    if (rank) {
      res.status(200).json(rank);
    } else {
      res.status(404).json({ error: 'Rank not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a rank
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, requirement } = req.body;

    const [updated] = await Rank.update(
      { name, requirement },
      { where: { id } }
    );

    if (updated) {
      const updatedRank = await Rank.findByPk(id);
      res.status(200).json(updatedRank);
    } else {
      res.status(404).json({ error: 'Rank not found or no changes made' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a rank
exports.delete = async (req, res) => {
  try {
    const rank = await Rank.findByPk(req.params.id);
    if (rank) {
      await rank.destroy();
      res.status(200).json({ message: 'Rank deleted successfully' });
    } else {
      res.status(404).json({ error: 'Rank not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};