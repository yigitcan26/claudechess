const ChallengeController = require('../controller/ChallengeController');

const express = require('express');
const router = express.Router();

router.get('/', ChallengeController.fetchAll);
router.get('/:id', ChallengeController.fetchById);
router.post('/', ChallengeController.create);
router.put('/:id', ChallengeController.update);
router.delete('/:id', ChallengeController.delete);

module.exports = router;