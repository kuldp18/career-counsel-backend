const express = require('express');
const router = express.Router();

const {
  getCounsellorById,
  getCounsellors,
  getCounsellor,
  updateCounsellor,
} = require('../controllers/counsellor');

const { isSignedIn } = require('../controllers/counsellorAuth');
const { isAuthenticated, isAdmin } = require('../controllers/commonAuth');

router.param('counsellorId', getCounsellorById);
router.get('/counsellors', getCounsellors);
router.get(
  '/counsellor/:counsellorId',
  isSignedIn,
  isAuthenticated,
  getCounsellor
);
router.put(
  '/counsellor/:counsellorId',
  isSignedIn,
  isAuthenticated,
  updateCounsellor
);

module.exports = router;
