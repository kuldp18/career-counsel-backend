const express = require('express');
const router = express.Router();

const {
  getStudentById,
  getStudent,
  updateStudent,
} = require('../controllers/student');

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

router.param('studentId', getStudentById);
router.get('/student/:studentId', isSignedIn, isAuthenticated, getStudent);
router.put('/student/:studentId', isSignedIn, isAuthenticated, updateStudent);

module.exports = router;
