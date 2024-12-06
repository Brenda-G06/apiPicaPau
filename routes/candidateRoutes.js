const express = require('express');
const candidateController = require('../controllers/candidateController');

const router = express.Router();

router.get('/', candidateController.getAllCandidates);
router.post('/', candidateController.addCandidate);
router.delete('/:id', candidateController.deleteCandidate);
router.post('/hire/:id', candidateController.hireCandidate);

module.exports = router;
