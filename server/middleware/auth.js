const jwt = require('jsonwebtoken');
require("dotenv").config();
const SecretKey = process.env.MY_SECRET_KEY;
const {User} = require('../db/index')

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SecretKey, async(err , user) => {
            if(err){
                return res.sendStatus(403);
            }
            // const specificUser = await User.findOne({email : user.email});
            req.user = user;
            next();
        });
    }else{
        res.sendStatus(401);
    }
};

module.exports = {
    authenticateJwt,
    SecretKey
}