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

router.get('/journals', authenticateJwt, async (req, res) => {
    try {
        // Retrieve user information from the decoded token
        const userId = req.user.userId;

        // Query the Journal collection for entries associated with the user
        const userJournals = await Journal.find({ 'user._id': userId }).select('-_id -__v -user');

        res.json({
            msg: 'User journals retrieved successfully',
            journals: userJournals,
        });
    } catch (error) {
        console.error('Error retrieving user journals:', error);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
});

router.get('/journal/:journalId', authenticateJwt, async (req, res) => {
    const journalId = req.params.journalId;
    const journal = await Journal.findById(journalId).select('-_id -__v -user');
    res.json({ journal });
});


router.put('/journal/:journalId', authenticateJwt, async (req, res) => {
    const journal = await Journal.findByIdAndUpdate(req.params.journalId, req.body, { new: true });
    if (journal) {
      res.json({ message: 'Journal updated successfully' });
    } else {
      res.status(404).json({ message: 'Journal not found' });
    }
  });

  router.delete('/journal/:journalId', authenticateJwt, async (req, res) => {
    const journal = await Journal.findByIdAndDelete(req.params.journalId, { new: true });
    if (journal) {
      res.json({ message: 'Journal deleted successfully' });
    } else {
      res.status(404).json({ message: 'Journal not found' });
    }
  });



module.exports = router;



// Learning Purpose; Please Ignore 
// const userJournals = await Journal.find({ 'user._id': userId },{ journal: 1, _id: 0 })