const RoleController = require('../controller/RoleController');

const express = require('express');
const router = express.Router();

router.get('/', RoleController.fetchAll);
router.get('/:id', RoleController.fetchById);
router.get('/name/:name', RoleController.fetchByName);
router.post('/', RoleController.create);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.delete);

module.exports = router;