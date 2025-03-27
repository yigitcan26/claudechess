const User = require('../model/User');

// Create a new user
exports.create = async (req, res) => {
  try {
    const { name, address, phone, role } = req.body;
    console.log(req.body);
    const user = await User.create({ name, phone, address, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
exports.fetchAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a user by ID
exports.fetchById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.fetchByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.findAll({ where: { role } });  // Find all users with the given role

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).send('No users found with the specified role');
    }
  } catch (error) {
    console.error('Error finding users by role:', error.message);
    res.status(500).send('An error occurred while retrieving the users');
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
    const { name, address, phone, role } = req.body;

    try {
        const user = await User.update(
            {
                name,
                address,
                phone,
                role
            },
            {
                where: { id: id }
            }
        );

        if (user[0] > 0) {
            const updatedUser = await User.findOne({ where: { id: id } });
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}