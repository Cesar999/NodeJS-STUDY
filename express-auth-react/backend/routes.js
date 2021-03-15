const { v4: uuidv4 } = require('uuid');
const { createToken } = require('./auth.js');
const {findUser, saveUser, findAllUsers} = require('./database.js');
const { getSecret } = require('./secrets.js');

function loginPost (req, res){
    const username = req.body.username;
    const pass = req.body.password;
    try{
      const userExists = findUser(username);
      if(!userExists){
          res.status(200).send({msg: 'User does not exists'});
          return;
      }

      if(userExists.password === pass){
            const token = createToken(username, userExists.id);
            res.cookie('token', token, { maxAge: 60000, httpOnly: true });
            res.status(200).send({msg: 'Login Succesfully'});
          return;
      } else {
            res.status(200).send({msg: 'Password Incorrect'});
            return;
      }
    } catch(e){
        console.log(e,'login');
    }
}

function registerPost (req, res){
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    try{
      const userExists = findUser(username);
      if(userExists){
            res.status(200).send({msg: 'User Already Register'});
          return;
      }
  
      if(password !== passwordConfirm){
            res.status(200).send({msg: 'Passwords Do Not Match'});
          return;
      }

      const userSaved = saveUser(username, password, uuidv4(), getSecret());
      if(userSaved){
            res.status(200).send({msg: 'Registration Succesfully'});
          return;
      } else {
            res.status(200).send({msg: 'Something Went Wrong'});
          return;
      }

  } catch(e){
        console.log(e, 'register');
  }

}

function authenticateGet(req, res){
    res.send({msg: 'Authenticated', auth: true, username: res.locals.user.username});
}

async function logoutGet (req, res){
    try{
        res.cookie('token', '', {maxAge: Date.now(), httpOnly: true });
        res.status(200).send({msg: 'Log Out Succesfully'});
    } catch(e){
        console.log(e, 'error on logout');
    }
}

async function getAllUsers (req, res){
    const users = findAllUsers();
    res.send({msg: 'Authenticated', users});
}



module.exports = {loginPost, registerPost, authenticateGet, logoutGet, getAllUsers}