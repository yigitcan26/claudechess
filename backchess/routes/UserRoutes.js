const UserController = require('../controller/UserController');

const express = require('express');
const router = express.Router();

router.get('/', UserController.fetchAll);
router.get('/:id', UserController.fetchById);
router.get('/role/:role', UserController.fetchByRole);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;