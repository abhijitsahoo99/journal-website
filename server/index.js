const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;
const userRouter = require('./routes/user')
const journalRouter = require('./routes/journal')
require("dotenv").config();
const MongoDBURL = process.env.MONGODB_URL;


const app = express();
app.use(cors());
app.use(express.json());
app.use("/user" , userRouter);
app.use("/user" , journalRouter);

app.get('/' , (req, res) => {
    res.status(200).json({
        msg: 'Welcome to the journal app'
    })
})

// app.use((err, req, res, next) => {
//     if (! err) {
//         return next();
//     }

//     res.status(500);
//     res.send('500: Internal server error');
// });

mongoose.connect(MongoDBURL)

app.listen(port, () => {
    console.log(`server listening on port ${port}` );
})
