const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
// const config = require('config');
const jwt = require('jsonwebtoken');


// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, password } = req.body;

  // Simple validation
  if(!name || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ name })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        name,
        password
      });

      // Create salt & hash
      
        newUser.save()
        .then(user => {
            jwt.sign(
            { id: user.id },
            'secretkey',
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name
                }
                });
            }
            )
        });
    })
    })
   

module.exports = router;