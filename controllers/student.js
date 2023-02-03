const Student = require('../models/student');

// get student by id
exports.getStudentById = (req, res, next, id) => {
  Student.findById(id).exec((err, student) => {
    if (err || !student) {
      return res.status(400).json({
        error: 'Student not found',
      });
    }
    req.profile = student;
    next();
  });
};

// get student
exports.getStudent = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encrypted_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

// update student
exports.updateStudent = (req, res) => {
  Student.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, student) => {
      if (err) {
        return res.status(400).json({
          error: 'You are not authorized to update this student',
        });
      }
      student.salt = undefined;
      student.encrypted_password = undefined;
      res.json(student);
    }
  );
};
