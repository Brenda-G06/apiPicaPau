const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.post('/', teamController.createTeam); /*ok */
router.post('/addMember', teamController.addMemberToTeam); /*ok */
//router.delete('/:id', teamController.deleteTeam);
router.put('/:id', teamController.updateTeam); /*ok */
router.get('/', teamController.getAllTeams);/*ok */

module.exports = router;
