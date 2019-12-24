const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

router.post('/',(req,res) => {
    // res.send('register');
    const { name, password } = req.body;

    if(!name || !password){
        res.json({ msg: 'Please enter all fields '});
    }
    User.findOne({ name })
        .then(user => {
            if(user) return res.json({msg : " user already exists "});

            const newUser = new User({
                name,
                password
            });

            newUser.save()
            .then(user=>{
               
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
                            name: user.name,
                            password: user.password 
                        }
                    })
                   }
               )
                
            })
        })
})

module.exports = router;