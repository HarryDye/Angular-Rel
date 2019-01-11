var mongoose = require('mongoose');
const config = require('../config/database');

const QuotesSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {type: Date, default: Date.now}
});

//test schema for embedded quote item
// const QuotesSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     trim: true,
//     index: true
//   },
//   quoteList: {
//     item: [{
//       quote: {
//         type: String,
//         required: true
//       },
//       author: {
//         type: String,
//         required: true
//       }
//     }]
//   }
// });

var Quote = module.exports = mongoose.model('Quote', QuotesSchema);

//functions that interact with the database
module.exports.storeQuote = (newQuote, callback) => {
  newQuote.save(callback);
}

// module.exports.getQuote = (callback) => {
//   Quote.find(callback);
// }

module.exports.getQuote = (callback) => {
  var quotes = [];
    for (i = 0; i < quotes.length; i++) {
      var item = {
        author: quote[i]["_doc"]["author"],
        quote: quote[i]["_doc"]["quote"]
      };
      quotes.push( item );
    }
    Quote.find(quotes, callback);
}

// module.exports.updateList = (newQuote, username, callback) => {
//   const query = {username: username}
//   newQuote.update(callback);
// }
// module.exports.deleteQuote = (id, callback) => {
//   Quote.findById(id, callback);
// }

// module.exports.getQuoteById = (id, callback) => {
//   Quote.find(id, callback);
// }
// module.exports.getQuoteById = (id, callback) => {
//    Quote.findById(id, callback);
// }
// //-------
// module.exports.findQuoteByUsername = (username, callback) => {
//   const query = {username: username}
//    Quote.findOne(query, callback);
//    //----- needs query
// }
// module.exports.compareUsername = (username, callback) => {
//   if(username === username){
//     return true;
//   } else {
//     return false;
//   }
//    Quote.compare(callback);
// }

// module.exports.getQuoteByUsername = (username, callback) => {
//   const query = {username: username}
//   Quote.findOne(query, callback);
// }
