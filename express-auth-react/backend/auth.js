const jwt = require('jsonwebtoken');

function createToken(username, id){
    const payload = {username, id};
    const secret = 'secret';
    const signOptions = {expiresIn:  "1h"};
    const token = jwt.sign(payload, secret, signOptions);
    return token;
}

const authenticator = () => {
    return (req, res, next) => {
      if ('token' in req.cookies) {
        let token = req.cookies['token'];
        try{
            const {username, id} = jwt.verify(token, 'secret');
            res.locals.user = {username, id};
            next();
        } catch(e){
            console.log('error on authentication');
            res.status(401).send({msg: 'No Authenticated', auth: false});
        }
      } else {
        res.status(401).send({msg: 'No Authenticated', auth: false});
      }
    }
}

module.exports = {createToken, authenticator};