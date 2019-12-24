const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

// User Model
const Answer = require('../../models/Answer');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { ans,ques_id, answered_user } = req.body;

  // Simple validation
  if(!ans || !answered_user) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
      
      const newAns = new Answer({
        ans,
        ques_id, 
        answered_user,
        voteCount:0
      });
      
      // Create salt & hash
      
        newAns.save()
        .then(()=>{
            res.json({
                msg:"sucess"
            })
        })
        
    })
    
module.exports = router;