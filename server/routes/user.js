const express = require('express');
const router = express.Router();
const {z, ZodError} = require('zod');
const bcrypt = require('bcrypt');
const User = require('../db/index')

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number',
        }),
});

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const user = await User.findOne({ username });
    if (user) {
        return res.status(403).json({ message: 'User already exists' });
    } 
    try{
        const userData = signupSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const newUser = new User({
            email: userData.email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({
            success: true , msg : "Signup Successful : New User Created", data : userData  
        });
    }
    catch(error){
        if (error instanceof ZodError){
            res.status(400).json({success: false , msg : 'validation failed'});
        } else{
            console.error(error);
            res.status(500).json({success: false , msg : 'Internal Server Error'});
        }
    }
    

})



module.exports = router;