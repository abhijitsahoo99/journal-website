const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;
const userRouter = require('./routes/user')


const app = express();
app.use(cors());
app.use(express.json());
app.use("/user" , userRouter);

app.get('/' , (req, res) => {
    res.status(200).json({
        msg: 'Welcome to the journal app'
    })
})

mongoose.connect("mongodb+srv://abhijitsahoo:XuangybwBCFnDEuq@cluster0.gwrr0b9.mongodb.net/Journal")

app.listen(port, () => {
    console.log(`server listening on port ${port}` );
})