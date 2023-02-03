const Student = require('../models/student');
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

  const student = new Student(req.body);
  student.save((err, student) => {
    if (err) {
      return res.status(400).json({
        err: 'Not able to save student in DB',
      });
    }
    res.json({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      id: student._id,
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

  Student.findOne({ email }, (err, student) => {
    if (err || !student) {
      return res.status(400).json({
        error: 'Student email does not exist',
      });
    }

    if (!student.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password do not match',
      });
    }

    // create token
    const token = jwt.sign({ _id: student._id }, process.env.SECRET);

    // put token in cookie
    res.cookie('token', token, { expire: new Date() + 9999 });

    // send response to front end
    const { _id, firstName, lastName, email, role } = student;
    return res.json({
      token,
      student: { _id, firstName, lastName, email, role },
    });
  });
};

// signout
exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Student signed out successfully',
  });
};

// protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
});
