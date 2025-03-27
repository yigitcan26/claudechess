const AuthorizeController = require('../controller/AuthorizeController');

const express = require('express');
const router = express.Router();

router.get('/', AuthorizeController.fetchAll);
router.get('/:id', AuthorizeController.fetchById);
router.post('/', AuthorizeController.create);
router.put('/:id', AuthorizeController.update);
router.delete('/:id', AuthorizeController.delete);

module.exports = router;