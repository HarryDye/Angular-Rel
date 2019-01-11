var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const Quote = require('../models/quotes');
// const User = require('../models/user');

//posting quotes, to the quotes db
router.post('/', (req, res, next) => {
  let newQuote = new Quote({
    username: req.body.username,
    author: req.body.author,
    quote: req.body.quote
  });
  //back end posting quotes
    Quote.storeQuote(newQuote, (err) => {
      if(err){
        res.json({success: false, msg:'Failed to save quote'});
      } else{
        res.json({success: true, msg:'Quote saved'});
      }
    });
  });

  router.get('/search', (req, res, next) => {
    // let quote =
    // let quote = ({
    //   username: req.body.username,
    //   author: req.body.author,
    //   quote: req.body.quote
    // });
    // console.dir(quote);
    Quote.getQuote( (err) => {
      // var quotes = [];
        // console.dir(quote);
        // for (i = 0; i < quote.length; i++) {
        //   var author = {
        //     author: quote[i]["_doc"]["author"]
        // //     quote: quote[i]["_doc"]["quote"]
        //   };
        // //   quotes.push( item );
        // }
      if(err){
        res.json({success: false, msg:'No quotes found'});
      } else{
        res.json();
      }
    });
  });

// -----------------------------------------

//interpilate localstore in to the params

//post the quotes by username from the frontend
// router.post('/:t', (req, res, next) => {
//   let localUser = req.body.username;
//   console.log(localUser);
//   // req.params.localUser;
//   req.param.localUser;
//   // Quote.findQuoteByUsername(localUser, (err, quote) => {
//   //   req.send.localUser;
//   //   if(err) throw err;
//   //   if(!quote){
//   //     return res.json({success: false, msg: 'No username found'});
//   //   }
//   // });
//   //req object, so /t/:search can use this
//   // req.localUser = doc;
//   res.send(localUser[req.params.t]);
//   // req.params {localUser}
//   // res.json(localUser);
//   });

//---------------------------------------------------

// //gets the quotes from the DB
// router.get('/:name', (req, res, next)=>{
//   var username = "asdf";
//   Quote.findQuoteByUsername(username, (err, quote) =>{
//     if(err) throw err;
//     if(!quote){
//       return res.json({success: false, msg: 'No quotes found'});
//     }
//     Quote.compareUsername(username, (err, quote) =>{
//       if(err) throw err;
//       if(quote){
//         var quotes = [];
//             // console.dir(quote);
//             for (i = 0; i < quote.length; i++) {
//               var item = {
//                 author: quote[i]["_doc"]["author"],
//                 quote: quote[i]["_doc"]["quote"]
//               };
//               quotes.push( item );
//             }
//         return res.json({ success: true, quotes });
//       } else{
//         return res.json({success: false, msg: 'Username does not match'});
//       }
//       });
//   });
  // res.json({quote: req.username});
  // console.log(req.params);
  // let username = Quote ({
  //   username: req.body.username
  // });
  // let getUsername = new Quote({
  //   username: req.body.username});
  // console.log(window.localStorage);

    // console.log(username);
  // Quote.findQuoteByUsername(username, (err, quote) => {
  //     console.log(req.body);
  //     console.log(username);
  //   if(err) throw err;
  //   if(!quote){
  //     return res.json({success: false, msg: 'No quotes found'});
  //   }
  //   //------compare the username from the frontend to the usernames in the database
  //   Quote.compareUsername(username, quote._doc.username, (err, callback) => {
  //       console.log(quote._doc.username);
  //       console.log(quote._doc.quote);
  //     if(err) throw err;
  //     if(callback){
  //       var quotes = [];
  //           // console.dir(quote);
  //           for (i = 0; i < quote.length; i++) {
  //             var item = {
  //               author: quote[i]["_doc"]["author"],
  //               quote: quote[i]["_doc"]["quote"]
  //             };
  //             quotes.push( item );
  //           }
  //       return res.json({ success: true, quotes });
  //     } else{
  //       return res.json({success: false, msg: 'Username does not match'});
  //     }
  //   //
  //   //
  //   //     //this gets and formats the quote from the database
  //   //     var quotes = [];
  //   //     // console.dir(quote);
  //   //     for (i = 0; i < quote.length; i++) {
  //   //       var item = {
  //   //         author: quote[i]["_doc"]["author"],
  //   //         quote: quote[i]["_doc"]["quote"]
  //   //       };
  //   //       quotes.push( item );
  //   //     }
  //   //     return res.json({success: true, quotes});
  //   //     // console.dir(quotes);
  //   //   }
  //   });
  //   // if(err) throw err;
  //   // if(!quote){
  //   //   return res.json({success: false, msg: 'No quotes saved'});
  //   // }
  //   // res.json({
  //   //   success: true,
  //   //   quote:{
  //   //     username: quote.username,
  //   //     quote: quote.quote,
  //   //     author: quote.author
  //   //   }
  //   // });
  // });
// });

//-------------------------------------------------------

// //Delete tasks
// router.delete('/list/:id', (req, res, next) => {
//   db.quotes.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
//     if(err){
//       res.send(err);
//     }
//     res.json(quote);
//   });
//
//   // Quote.deleteQuote(delete, (err, quote) => {
//   //
//   // });
// });

module.exports = router;



// router.post('/list', (req, res, next) => {
//   const username = req.body.username;
//
//
//   Quote.getQuoteByUsername(username, (err, quote) =>{
//     if(err) throw err;
//     if(!quote){
//       return res.json({success: false, msg: 'Quotes not found'});
//     }
//   Quote.compareQuoteId(id, quote._id, (err, isMatch) => {
//     if(err) throw err;
//     if(isMatch){
//       id = _id
//       });
//     res.json({
//       success:true,
//       quote:{
//         id: quote._id,
//         username: quote.username,
//         author: quote.author,
//         quote: quote.quote
//       }
//     });
//   } else {
//     return res.json({success: false, msg: 'Something went wrong'});
//   }
//   });
// });
