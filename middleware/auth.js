const jwt = require('jsonwebtoken');
const keys = require("../config/keys");

module.exports=function(req, res, next){
const token=req.header('x-auth-token');

if(!token){
    return res.status(401).json({msg: 'No token, authorization denied'});
}

try{
    const decoded=jwt.verify(token, keys.secretOrKey);
    req.user=decoded;
    next();
}catch(err){
    res.status(401).json({msg: 'Token is not valid'});
}

}