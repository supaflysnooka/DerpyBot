'use strict';
var repo = require(process.cwd()+'/repo');

function findTrigger(bot, db, data, callback) {
  
  repo.getTrigger(bot, db, data.trigger, function(val){
    if (val !== null){
      var keys = Object.keys(val);

      var theReturn = val[keys[0]].Returns;
      
      if (theReturn.indexOf('%dj%') >= 0){
        // replace with current DJ name
        theReturn = theReturn.replace('%dj%', '@' + bot.getDJ().username);
      }
      if (theReturn.indexOf('%me%') >= 0) {
        // replace with user who entered chat name
        theReturn = theReturn.replace('%me%', data.user.username);
      }
      if (typeof callback === 'function') {
        return callback(theReturn);
      }
    }

    if (typeof callback === 'function') {
      return callback(null);
    }
  });
}

module.exports = findTrigger;