const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const {
  signout,
  signup,
  signin,
  isSignedIn,
} = require('../controllers/studentAuth');

router.post(
  '/student/signup',
  [
    check('firstName')
      .isLength({ min: 3 })
      .withMessage('First name must be atleast 3 characters.'),

    check('lastName')
      .isLength({ min: 3 })
      .withMessage('Last name must be atleast 3 characters.'),

    check('email').isEmail().withMessage('Valid email is required'),

    check('password')
      .isLength({ min: 8 })
      .withMessage('Password should be atleast 8 characters long.'),
  ],
  signup
);

router.post(
  '/student/signin',
  [
    check('email').isEmail().withMessage('Valid email is required'),

    check('password')
      .isLength({ min: 1 })
      .withMessage('Valid password is required'),
  ],
  signin
);

router.get('/student/signout', signout);

module.exports = router;
