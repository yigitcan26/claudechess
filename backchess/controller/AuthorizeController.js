const Authorize = require('../model/Authorize');

// Create a new authorization
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const authorize = await Authorize.create({ name });
    res.status(201).json(authorize);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all authorizations
exports.fetchAll = async (req, res) => {
  try {
    const authorizes = await Authorize.findAll();
    res.status(200).json(authorizes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get an authorization by ID
exports.fetchById = async (req, res) => {
  try {
    const authorize = await Authorize.findByPk(req.params.id);
    if (authorize) {
      res.status(200).json(authorize);
    } else {
      res.status(404).json({ error: 'Authorize not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.fetchByName = async (req, res) => {
    try {
        const { name } = req.params;
    
        // Find the authorization by name
        const authorize = await Authorize.findOne({ where: { name } });
    
        if (authorize) {
        res.status(200).json(authorize);
        } else {
        res.status(404).send('Authorize not found');
        }
    } catch (error) {
        console.error('Error finding authorize:', error.message);
        res.status(500).send('An error occurred while retrieving the authorize');
    }
};

exports.update = async (req, res) => {
    try {
        const { name } = req.body;
        const authorize = await Authorize.findByPk(req.params.id);
        if (authorize) {
            authorize.name = name;
            await authorize.save();
            res.status(200).json(authorize);
        } else {
            res.status(404).json({ error: 'Authorize not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const authorize = await Authorize.findByPk(req.params.id);
        if (authorize) {
            await authorize.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Authorize not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};