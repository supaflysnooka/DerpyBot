'use strict';
const request = require('request');
const _ = require('lodash');
const util = require('util');

/**
 * Allows you to run a callback function on each item in an array at whatever
 * pace you want.  It wraps it in a object where you can just call .next() to
 * run the callback on the next item in the array. 
 * @param {[type]}   arr [description]
 * @param {Function} cb  [description]
 */
function SlowIterator(arr, cb){
  var pos = 0;
  var doneCB = function(){};

  var next = function(){
    if (pos < arr.length) {
      cb(arr[pos], pos);
      pos++;
    } else {
      doneCB();
    }
  };

  var done = function(cb){
    doneCB = cb;
  };

  next();

  return {
    next: next,
    done: done
  };
}

function makeRequestArray(roomID, pages) {
  var url = `https://api.dubtrack.fm/room/${roomID}/playlist/history?page=`;
  var result = [];
  for (var i=1; i <= pages; i++){
    result.push(url + i);
  }
  return result;
}


var historyStore = {
  songStore : [],

  ready : false,

  convertTime : function (timestamp){
    var diff = Date.now() - timestamp;
    var mins = Math.floor( (diff / 1000) / 60 );
    var hrs;
    if (mins > 60) {
      hrs = Math.floor(mins / 60);
      var plural = hrs > 1 ? 's' : '';
      return `about ${hrs} hour${plural}`;
    } else {
      return `${mins} minutes`;
    }

  },

  fromHistory : function(song) {
    return {
      songid : song.songid,
      lastplayed : song.played,
      user : song._user.username,
      name : song._song.name
    };
  },

  fromUpdate : function(song){
    return {
      songid : song.media.id,
      lastplayed : song.raw.song.played,
      user : _.get(song, 'user.username', '404usernamenotfound'),
      name : _.get(song, 'media.name', '404songnamenotfound')
    };
  },

  getSong : function(bot, songid){
    if (!songid) { return; }
    if (!this.ready) {return;}
    var result = [];

    this.songStore.forEach(function(song){
      if (song.songid === songid) {
        result.push(song);
      }
    });
    return result;
  },

  save : function(bot, song){
    if (!song) { return; }
    if (!this.ready) {return;}

    var songId = _.get(song, 'media.id');
    var lastplayed = _.get(song, 'raw.song.played');
    if (!lastplayed || !songId) {return;}

    var convert = this.fromUpdate(song);
    // add song to the beginning of the array
    this.songStore.unshift(convert);

    // keep array at a max length of 140
    if (this.songStore.length > 140) {
      this.songStore.pop();
    }
  },

  clear : function(){
    this.songStore = [];
    this.ready = false;
  },

  init: function(bot, cb){
    var roomid = _.get(bot, '_.room.id');
    if (typeof cb !== 'function') { cb = function(){}; }

    if (roomid) {
      this.clear();

      var self = this;
      var reqs = makeRequestArray(roomid, 7);

      var updateHistory = new SlowIterator(reqs, function(current, pos){
        request.get(current, function(err, resp, body){
          if (err) {
            bot.log('error', 'BOT', err);
          } else {
            var info = JSON.parse(body);
            var songs = info.data.map(function(song){
              return self.fromHistory(song);
            });
            self.songStore = self.songStore.concat(songs);
          }

          updateHistory.next();
          
        });
      });

      updateHistory.done(function(){
        self.ready = true;
        cb(self.songStore);
      });
      
    }
    
  }

};


module.exports = historyStore;