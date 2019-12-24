const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Tags = require('../../models/Tags')

// User Model
const Question = require('../../models/Question');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { ques, asked_user,title,tags } = req.body;

  // Simple validation
  if(!ques || !asked_user) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
      
      const newQues = new Question({
        title,
        tags,
        ques,
        asked_user
      });

      // Create salt & hash
        
        newQues.save()
        .then((resp)=>{
            tags.map(a => {
              console.log(a)
            })
            res.json({
                msg:"sucess",
                resp: resp._id
            })
        })
        
    })
    
module.exports = router;