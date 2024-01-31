const express = require('express');
const router = express.Router();
const {User,Journal} = require('../db/index')
const {authenticateJwt , SecretKey } = require('../middleware/auth')

const app = express();
app.use(express.json());

router.post('/journal', authenticateJwt, async (req, res) => {
    try{
        const {title, content} = req.body;
        const newJournal = new Journal({
        user : {
            email : req.user.email,
            _id : req.user.userId,
        },
        journal : {
            title : title,
            content : content,
        }
        });
        await newJournal.save();
        res.status(200).json({
            msg : 'Your journal has been succefully saved',
        })
    }
    catch(err){
        res.status(500).json({
            msg: 'Something went wrong !'
        });   
    }
    
});


module.exports = router;