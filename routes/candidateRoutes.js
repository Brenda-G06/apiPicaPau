const express = require('express');
const candidateController = require('../controllers/candidateController');

const router = express.Router();

router.get('/', candidateController.getAllCandidates); //ok
router.post('/', candidateController.addCandidate); //ok
router.delete('/:id', candidateController.deleteCandidate); //ok

module.exports = router;
