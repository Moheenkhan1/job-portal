const express = require('express');
const { getJobs, addJob, deleteJob , getApplications,updateApplication } = require('../controllers/jobs.controller');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.get('/getjobs',authMiddleware, getJobs);
router.post('/addjob',authMiddleware, addJob);
router.delete('/delete/:id',authMiddleware, deleteJob);

router.get('/applications',authMiddleware, getApplications);
router.put("/applications/:id",authMiddleware,updateApplication)

module.exports = router;