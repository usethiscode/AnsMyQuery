const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')
const User = require('../../models/User');

router.post('/',(req,res) => {
    // res.send('register');
    const { name, password } = req.body;

    if(!name || !password){
        res.status(400).json({ msg: 'Please enter all fields '});
    }
    User.findOne({ name })
        .then(user => {
            if(!user) return res.status(400).json({msg : "User does not exist"});

            if(user.password !== password){
                return res.status(400).json({ msg: "Invalid Password"})
            }else{
                jwt.sign(
                    { id:user.id },
                    'secretkey',
                    {expiresIn: 3600},
                    (err,token) => {
                        if(err) throw err;
                        res.json({
                         token,
                         user:{
                             id: user.id,
                             name: user.name
                         }
                     })
                    }
                )
            }
        })
})

router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;