const Role = require('../model/Role');

// Create a new role
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all roles
exports.fetchAll = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a role by ID
exports.fetchById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.fetchByName = async (req, res) => {
    try {
        const { name } = req.params;
    
        // Find the role by name
        const role = await Role.findOne({ where: { name } });
    
        if (role) {
        res.status(200).json(role);
        } else {
        res.status(404).send('Role not found');
        }
    } catch (error) {
        console.error('Error finding role:', error.message);
        res.status(500).send('An error occurred while retrieving the role');
    }
};

exports.update = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await Role.findByPk(req.params.id);
        if (role) {
        role.name = name;
        await role.save();
        res.status(200).json(role);
        } else {
        res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
        await role.destroy();
        res.status(204).send();
        } else {
        res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
