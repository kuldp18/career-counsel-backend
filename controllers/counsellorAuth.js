const Counsellor = require('../models/counsellor');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

// signup
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const counsellor = new Counsellor(req.body);
  counsellor.save((err, counsellor) => {
    if (err) {
      return res.status(400).json({
        err: 'Not able to save counsellor in DB',
      });
    }
    res.json({
      firstName: counsellor.firstName,
      lastName: counsellor.lastName,
      email: counsellor.email,
      id: counsellor._id,
    });
  });
};

// signin
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  Counsellor.findOne({ email }, (err, counsellor) => {
    if (err || !counsellor) {
      return res.status(400).json({
        error: 'Counsellor email does not exist',
      });
    }

    if (!counsellor.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password do not match',
      });
    }

    // create token
    const token = jwt.sign({ _id: counsellor._id }, process.env.SECRET);

    // put token in cookie
    res.cookie('token', token, { expire: new Date() + 9999 });

    // send response to front end
    const { _id, firstName, lastName, email, role } = counsellor;
    return res.json({
      token,
      counsellor: { _id, firstName, lastName, email, role },
    });
  });
};

// signout
exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Counsellor signed out successfully',
  });
};

// protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
  algorithms: ['HS256'],
});
