const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');

//register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirm: req.body.confirm
  });

//back end registering
  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else{
      res.json({success: true, msg:'User registered'});
    }
  });
});

//auth
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) =>{
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          const token = jwt.sign({data :user}, config.secret, {
            expiresIn: 604800
          });

          res.json({
            success: true,
            token: `Bearer ${token}`,
            user:{
              username: user.username
            }
          });
        } else {
          return res.json({success: false, msg: 'Wrong password or username'});
        }
    });
  });
});

//quoter (protected by auth) holds the user ids
// router.get('/quoter', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//   res.json({user: req.user});
// });

//quotes list (protected by auth)
// router.get('/list', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//   res.json({user: req.user});
// });


// POST /register checks all fields are there and checks the two passwords match
// router.post('/register', function(req, res, next){
//   if (req.body.email &&
//     req.body.name &&
//     req.body.password &&
//     req.body.confirmPassword) {
//
//       // confirm that user types same passwords
//       if(req.body.password !== req.body.confirmPassword){
//         var err = new Error('Password are not the same.');
//         err.status = 400;
//         return next(err);
//       }
//
//       //creates object with form input
//       var userData = {
//         email: req.body.email,
//         name: req.body.name,
//         password:req.body.password
//       };
//
//       //use chema's 'create' methood to insert doc into mongodb
//       //quotes page does not exist yet
//       User.create(userData, function (error, user) {
//         if (error) {
//           return next(error);
//         } else {
//           return res.redirect('/quotes');
//         }
//       });
//
//     } else{
//       var err = new Error('All fields required.');
//       console.log('All fields required.');
//       err.status = 400;
//       return next(err);
//     }
// })

module.exports = router;
