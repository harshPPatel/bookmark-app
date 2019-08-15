const express = require('express');
const validateUser = require('./validatation');

const router = express.Router();

// const joiSchema = Joi.object().keys({
//   username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
//   password: Joi.string().trim().min(6).required(),
// });

router.get('/', (req, res) => (
  res.json({
    message: 'Inside Auth!',
  })
));

router.post('/signup', (req, res) => {
  const result = validateUser(req.body);
  if (result.error.length === 0) {
    res.json({
      user: req.body,
    });
  } else {
    res.status(422);
    res.json({
      message: result.error,
    });
  }
});

module.exports = router;
