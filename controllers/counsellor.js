const Counsellor = require('../models/counsellor');

// GET /counsellors: only for admin
exports.getCounsellors = (req, res, next) => {
  Counsellor.find()
    .then((counsellors) => {
      res.status(200).json({ counsellors: counsellors });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// get counsellor by id
exports.getCounsellorById = (req, res, next, id) => {
  Counsellor.findById(id).exec((err, counsellor) => {
    if (err || !counsellor) {
      return res.status(400).json({
        error: 'Counsellor not found',
      });
    }
    req.profile = counsellor;
    next();
  });
};

// get counsellor
exports.getCounsellor = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encrypted_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

// update counsellor
exports.updateCounsellor = (req, res) => {
  Counsellor.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, counsellor) => {
      if (err) {
        return res.status(400).json({
          error: 'You are not authorized to update this counsellor',
        });
      }
      counsellor.salt = undefined;
      counsellor.encrypted_password = undefined;
      res.json(counsellor);
    }
  );
};
