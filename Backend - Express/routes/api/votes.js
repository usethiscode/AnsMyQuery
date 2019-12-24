const express = require('express');
const router = express.Router();
const Answer = require('../../models/Answer');
const mongoose = require('mongoose')
// @route   POST api/users
// @desc    Register new user
// @access  Public
var counterInc = null;
var voterType = null;
router.post('/', (req, res) => {
  const { id,type,user } = req.body;


if(type==='up'){
    voterType = "upvoters";
    // counterInc = 1
    Answer.updateOne({_id: mongoose.Types.ObjectId(id)},{
        $pull: { "upvoters":user }
    },(err,resp) => {
        if(resp.nModified === 1) counterInc = 0
        else counterInc = 1
    })
}


if(type==='down'){
    voterType = "downvoters";
    // counterInc = -1
    Answer.updateOne({_id: mongoose.Types.ObjectId(id)},{
        $pull: { "downvoters":user }
    },(err,resp) => {
        if(resp.nModified === 1) counterInc = 0
        else counterInc = -1
    })
}

Answer.updateOne({_id: mongoose.Types.ObjectId(id)},{
        $addToSet: {
            [voterType]: user
        }
    }, (error,result) => {
            Answer.updateOne({_id: mongoose.Types.ObjectId(id)},{
                $inc: {
                    "voteCount": counterInc
                }
            }, 
            (error,result5) => res.json({
                reslt: result5,
                re:result,
                counterInc,
                body: req.body
            })
            );
        
});


// res.json({
//     votertype : voterType,
//     userid : user,
//     votecount: counterInc
// })
// (type==='up') ? score=1 : score=-1

// Answer.updateOne({"_id": mongoose.Types.ObjectId(id)},{
//         $inc: {
//             "score": score
//         }
//     },(error,result) =>
//     { 
//         res.json({
//             msg:result,
//             id:mongoose.Types.ObjectId(id)
//         })
// })

})
module.exports = router;